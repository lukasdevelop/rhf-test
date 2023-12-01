import { files, file, createFile, updateFile, deleteFile } from './files'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('files', () => {
  scenario('returns all files', async (scenario) => {
    const result = await files()

    expect(result.length).toEqual(Object.keys(scenario.file).length)
  })

  scenario('returns a single file', async (scenario) => {
    const result = await file({ id: scenario.file.one.id })

    expect(result).toEqual(scenario.file.one)
  })

  scenario('creates a file', async () => {
    const result = await createFile({
      input: { name: 'String', url: 'String' },
    })

    expect(result.name).toEqual('String')
    expect(result.url).toEqual('String')
  })

  scenario('updates a file', async (scenario) => {
    const original = await file({ id: scenario.file.one.id })
    const result = await updateFile({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a file', async (scenario) => {
    const original = await deleteFile({ id: scenario.file.one.id })
    const result = await file({ id: original.id })

    expect(result).toEqual(null)
  })
})
