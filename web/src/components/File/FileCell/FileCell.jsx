import File from 'src/components/File/File'

export const QUERY = gql`
  query FindFileById($id: Int!) {
    file: file(id: $id) {
      id
      name
      url
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>File not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ file }) => {
  return <File file={file} />
}
