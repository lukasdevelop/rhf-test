import { db } from 'src/lib/db';
import fs from 'fs/promises';
import path from 'path';
import { S3Client, HeadObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: 'us-east-1',
});

const bucketName = 'rhf-test-bucket';

const uploadFileToS3 = async (key, buffer) => {
  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
    })
  );
};

export const files = () => {
  return db.file.findMany();
};

export const file = ({ id }) => {
  return db.file.findUnique({
    where: { id },
  });
};

export const createFile = async ({ input }) => {
  const { name, file } = input;

  const uploadDirectory = path.join(__dirname, '../../../../web/public/uploads');
  const filePath = path.join(uploadDirectory, name);

  try {
    await fs.mkdir(uploadDirectory, { recursive: true });
    await fs.writeFile(filePath, file.buffer);

    const latestVersionInDB = await db.file.findFirst({
      where: { name: { startsWith: name } },
      orderBy: { version: 'desc' },
      select: { version: true },
    });

    const currentVersion = latestVersionInDB ? latestVersionInDB.version : 1;

    const key = `${name}-v${currentVersion}`

    const fileExistsInS3 = await s3Client.send(
      new HeadObjectCommand({
        Bucket: bucketName,
        Key: key,
      })
    ).then(() => true).catch(() => false)

    if (!fileExistsInS3) {
      const data = {
        name: key,
        url: `/uploads/${key}`,
        version: currentVersion,
      };

      const createdFile = await db.file.create({ data });
      await uploadFileToS3(key, file.buffer);

      console.log('Upload para o S3 concluído com sucesso.');

      return createdFile;
    } else {
      console.log('O arquivo já existe no S3. Upload ignorado.');
      return null;
    }
  } catch (error) {
    console.error('Erro ao escrever no sistema de arquivos:', error);
    throw error;
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


