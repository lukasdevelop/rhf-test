import { db } from 'src/lib/db'

export const files = () => {
  return db.file.findMany()
}

export const file = ({ id }) => {
  return db.file.findUnique({
    where: { id },
  })
}

export const createFile = ({ input }) => {
  return db.file.create({
    data: input,
  })
}

export const updateFile = ({ id, input }) => {
  return db.file.update({
    data: input,
    where: { id },
  })
}

export const deleteFile = ({ id }) => {
  return db.file.delete({
    where: { id },
  })
}
