import { db } from 'src/lib/db';
import fs from 'fs/promises';
import path from 'path';
import { S3Client, HeadObjectCommand, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import {V4 as uuid} from 'uuid'
import {diffChars} from 'diff';


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

  const uploadFileToS3 = async (key, buffer, version) => {

    const versionedKey = version ? `${key}-v${version}` : key;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: versionedKey,
        Body: buffer
      })
    )
  }

  const uploadDirectory = path.join(__dirname, '../../../../web/public/uploads')
  const filePath = path.join(uploadDirectory, name)

  const key = name
  const fileExists = await fileExistsInS3(key)

  try {
    let createdFile;

   // const fileExists = await fs.access(filePath).then(() => true).catch(() => false)

    if(!fileExists){

      await fs.mkdir(uploadDirectory, { recursive: true })

      console.log('Tentando escrever no sistema de arquivos:', filePath)

      await fs.writeFile(filePath, file.buffer)

      const data = {
        name,
        url: `/uploads/${name}`,
        version: 1
      }

       createdFile = db.file.create({data})

      await uploadFileToS3(key, file.buffer, data.version)

      console.log('Upload para o S3 concluído com sucesso.')

      return createdFile

    } else {
      const previousVersionBuffer = await s3Client.send(
        new GetObjectCommand({
          Bucket: bucketName,
          Key: key,
        })
      )

      const differences = diffChars(previousVersionBuffer.toString(), file.buffer.toString())

      if (differences.length > 0) {
        await fs.writeFile(filePath, file.buffer);
        const currentVersion = parseInt(previousVersionBuffer.Metadata.version, 10);
        await uploadFileToS3(key, file.buffer, currentVersion + 1);
      } else {
        console.log('Não há diferenças no conteúdo. Upload ignorado.');
      }

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
