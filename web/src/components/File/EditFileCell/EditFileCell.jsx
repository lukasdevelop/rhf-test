import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FileForm from 'src/components/File/FileForm'

export const QUERY = gql`
  query EditFileById($id: Int!) {
    file: file(id: $id) {
      id
      name
      url
    }
  }
`
const UPDATE_FILE_MUTATION = gql`
  mutation UpdateFileMutation($id: Int!, $input: UpdateFileInput!) {
    updateFile(id: $id, input: $input) {
      id
      name
      url
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ file }) => {
  const [updateFile, { loading, error }] = useMutation(UPDATE_FILE_MUTATION, {
    onCompleted: () => {
      toast.success('File updated')
      navigate(routes.files())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateFile({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit File {file?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <FileForm file={file} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
