import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import FileUploader from 'src/components/FileUploader/FileUploader'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1>HomePage</h1>
      <FileUploader />
    </>
  )
}

export default HomePage
