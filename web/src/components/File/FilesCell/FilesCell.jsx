import { Link, routes } from '@redwoodjs/router'

import Files from 'src/components/File/Files'

export const QUERY = gql`
  query FindFiles {
    files {
      id
      name
      url
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No files yet. '}
      <Link to={routes.newFile()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ files }) => {
  return <Files files={files} />
}
