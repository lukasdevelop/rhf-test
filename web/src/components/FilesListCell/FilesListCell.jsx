export const QUERY = gql`
  query FindFilesListQuery {
    filesList: files {
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

export const Success = ({ filesList }) => {
  return <div>{JSON.stringify(filesList)}</div>
}
