import { useDropzone } from 'react-dropzone';
import { useMutation } from '@redwoodjs/web';
import { useCallback } from 'react'
import FilesListCell from 'src/components/FilesListCell'

const CREATE_FILE = gql`
  mutation($input: CreateFileInput!){
    createFile(input:$input){
      id,
      name
    }
  }
`

const FileUploader = () => {
  const [createFile] = useMutation(CREATE_FILE)

  const onDrop = useCallback( async (acceptedFiles) => {
    const file = acceptedFiles[0]

    try{
      const input = {
        name: file.name,
        url: file.name,
        file: {
          filename: file.name,
          mimetype: file.type,
          encoding: 'base64', // ou o encoding apropriado para o seu caso
        },
      };
      await createFile({variables: { input }})
      console.log('Upload feito com sucesso.', acceptedFiles)

    }catch(error){
      console.log('Error', error)

    }
    },
    [createFile]
  )

  const {getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div>
      <h2>Uploader</h2>
      <div {...getRootProps()} style={{ border: '1px solid #ccc'}}>
        <input {...getInputProps()} />
        <p>Arraste e solte arquivos aqui ou clique para selecionar</p>
      </div>
      <FilesListCell />
    </div>
  )
}

export default FileUploader
