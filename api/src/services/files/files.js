import { db } from 'src/lib/db'
import fs from 'fs/promises'

export const files = () => {
  return db.file.findMany()
}

export const file = ({ id }) => {
  return db.file.findUnique({
    where: { id },
  })
}

export const createFile = ({ input }) => {
  const {name, url} = input

  //const path = `./public/uploads/${originalname}`

  const data = {
    name,
    url
  }

  console.log('---->', input)

  return db.file.create({
    data
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
