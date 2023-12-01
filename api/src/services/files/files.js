import { db } from 'src/lib/db';
import fs from 'fs/promises';
import path from 'path';
import { S3Client, HeadObjectCommand, PutObjectCommand, ListBucketsCommand } from '@aws-sdk/client-s3'
import {V4 as uuid} from 'uuid'

const s3Client = new S3Client({
  credentials:{
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
  region: 'us-east-1'
})

const bucketName = 'rhf-test-bucket';

export const files = () => {
  return db.file.findMany();
};

export const file = ({ id }) => {
  return db.file.findUnique({
    where: { id },
  });
};

export const createFile = async ({ input }) => {
  const { name, file } = input

  const fileExistsInS3 = async (key) => {

    try {
      await s3Client.send(
        new HeadObjectCommand({
          Bucket: bucketName,
          Key: name
      })
    )
    return true
    } catch (error){
      return false
    }
  }

  const uploadFileToS3 = async (key, buffer) => {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: buffer
      })
    )
  }

  const uploadDirectory = path.join(__dirname, '../../../../web/public/uploads')
  const filePath = path.join(uploadDirectory, name)

  const key = name
  const fileExists = await fileExistsInS3(key)

  if (fileExists) {
    console.log('O arquivo já existe no S3. Upload ignorado.');
    return null
  }

  try {
    const fileExists = await fs.access(filePath).then(() => true).catch(() => false)

    if(!fileExists){

      await fs.mkdir(uploadDirectory, { recursive: true });

      console.log('Tentando escrever no sistema de arquivos:', filePath);

      await fs.writeFile(filePath, file.buffer)

      const data = {
        name,
        url: `/uploads/${name}`,
      }

      const createdFile = db.file.create({data})

      await uploadFileToS3(key, file.buffer);

      console.log('Upload para o S3 concluído com sucesso.');

      return createdFile

    }
  } catch (error) {
    console.error('Erro ao escrever no sistema de arquivos:', error)
    throw error
  }
};

export const updateFile = ({ id, input }) => {
  return db.file.update({
    data: input,
    where: { id },
  });
};

export const deleteFile = ({ id }) => {
  return db.file.delete({
    where: { id },
  });
};
