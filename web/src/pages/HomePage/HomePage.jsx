import { MetaTags } from '@redwoodjs/web'
import FilesListCell from 'src/components/FilesListCell/FilesListCell';
import styles from 'src/pages/HomePage/HomePage.module.css'

const HomePage = () => {

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <div styles={styles.homepage}>
        <h2>Suba seus arquivos para nuvem ⤴</h2>
        <FilesListCell />
      </div>
    </>
  )
}

export default HomePage
