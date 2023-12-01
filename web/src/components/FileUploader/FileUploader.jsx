import { useDropzone } from 'react-dropzone';
import { useMutation } from '@redwoodjs/web';
import { useCallback } from 'react'

const CREATE_FILE = gql`
  mutation($input: CreateFileInput!){
    createFile(input:$input){
      id,
      name
    }
  }
`

const FileUploader = ({onFileUpload}) => {
  const [createFile] = useMutation(CREATE_FILE)

  const onDrop = useCallback( (acceptedFiles) => {

    acceptedFiles.forEach((file) => {

      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = async () => {

        const binaryStr = reader.result

        const input = {
          id: file.id,
          name: file.name,
          url: file.name,
          file: {
            path: file.name,
            buffer: Buffer.from(binaryStr).toString('base64'),
          },
        }

        await createFile({variables: { input }})

        onFileUpload(input)
      }

      reader.readAsArrayBuffer(file)

    })
    },
    [createFile]
  )

  const {getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div>
      <h2>Uploader</h2>
      <div {...getRootProps()} style={{ border: '1px solid #ccc'}}>
        <input {...getInputProps()} />
        {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
      </div>

    </div>
  )
}

export default FileUploader
