export const QUERY = gql`
  query FindFileListQuery($id: Int!) {
    fileList: file(id: $id) {
      id,
      name,
      url
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ fileList }) => {
  return <div>{JSON.stringify(fileList)}</div>
}
