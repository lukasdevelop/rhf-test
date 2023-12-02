import { Link, routes } from '@redwoodjs/router'
import Sidebar from 'src/components/Sidebar/Sidebar'
import styles from 'src/layouts/UploaderLayout/Uploader.module.css'

const UploaderLayout = ({ children }) => {
  return (
    <>
    <header className={styles.header}>
      <h1>⇡ ☁  RHF Test - Uploader Version to AWS S3 ☁⇡ </h1>
    </header>
    <div className={styles.wrapper}>
      <sidebar>
        <Sidebar />
      </sidebar>
      <main>{children}</main>
    </div>
    </>
  )
}

export default UploaderLayout
