import { useDropzone } from 'react-dropzone';
import { useCallback } from 'react'
import FilesListCell from 'src/components/FilesListCell'

const FileUploader = () => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log('Upload feito com sucesso.', acceptedFiles)
    }
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
