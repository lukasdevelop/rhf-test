import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import 'src/lib/formatters'

const DELETE_FILE_MUTATION = gql`
  mutation DeleteFileMutation($id: Int!) {
    deleteFile(id: $id) {
      id
    }
  }
`

const File = ({ file }) => {
  const [deleteFile] = useMutation(DELETE_FILE_MUTATION, {
    onCompleted: () => {
      toast.success('Arquivo deletado')
      navigate(routes.files())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Tem certeza que deseja deletar esse arquivo ' + id + '?')) {
      deleteFile({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Arquivo {file.id} Detalhes
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{file.id}</td>
            </tr>
            <tr>
              <th>Nome</th>
              <td>{file.name}</td>
            </tr>
            <tr>
              <th>Url</th>
              <td>{file.url}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editFile({ id: file.id })}
          className="rw-button rw-button-blue"
        >
          Editar
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(file.id)}
        >
          Deletar
        </button>
      </nav>
    </>
  )
}

export default File
