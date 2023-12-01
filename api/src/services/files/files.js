import { db } from 'src/lib/db';
import fs from 'fs/promises';
import path from 'path';

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

  const uploadDirectory = path.join(__dirname, '../../../../web/public/uploads')
  const filePath = path.join(uploadDirectory, name)

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

      return db.file.create({
        data,
      })

    }else {
      console.log('O arquivo já existe. Upload ignorado.')

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
