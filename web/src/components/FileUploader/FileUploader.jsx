import { useDropzone } from 'react-dropzone';
import { useMutation } from '@redwoodjs/web';
import { useCallback } from 'react'
import styles from 'src/components/FileUploader/FileUploader.module.css'

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
      <div {...getRootProps()} className={styles.fileuploader}>
        <input {...getInputProps()} />
        {
        isDragActive ?
          <p>Solte seus arquivos aqui ...</p> :
          <p>Arraste e solte seus arquivos aqui, ou clique para seleciona-los</p>
      }
      </div>

    </div>
  )
}

export default FileUploader
