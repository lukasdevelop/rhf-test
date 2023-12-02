import styles from 'src/components/Sidebar/Sidebar.module.css'

const Sidebar = () => {
  return(
    <aside className={styles.sidebar}>
            <img
                className={styles.cover}
                src="https://images.unsplash.com/photo-1579403124614-197f69d8187b?q=50&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <div className={styles.profile}>
                <img className={styles.avatar} src="https://avatars.githubusercontent.com/u/63449524?v=" />
                <strong>Lucas Amaral</strong>
                <span>Software Engineer</span>
            </div>

            <footer>

            </footer>
        </aside>
  )
}

export default Sidebar