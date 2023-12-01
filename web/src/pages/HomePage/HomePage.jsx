import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import FileList from 'src/components/FileList/FileList'
import FileUploader from 'src/components/FileUploader/FileUploader'
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
