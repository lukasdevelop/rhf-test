import { MetaTags } from '@redwoodjs/web'
import FilesListCell from 'src/components/FilesListCell/FilesListCell';

const HomePage = () => {

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1>HomePage</h1>
      <FilesListCell />
    </>
  )
}

export default HomePage
