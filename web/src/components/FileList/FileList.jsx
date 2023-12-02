import React, { useState } from 'react'
import styles from 'src/components/FileList/FileList.module.css'

const FileList = ({ files }) => {
  const [loading, setLoading] = useState(!files)

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.filelist}>
      {files.length === 0 ? (
        <h2>Nenhum arquivo até o momento, faça o upload do seu primeiro arquivo</h2>
      ) : (
        <>
          <h3>Seus arquivos ↓ </h3>
          <ul>
            {files.map((file) => (

                <li key={file.id}>
                  <div className={styles.content}>
                    {file.name}
                    <a href={`/files/${file.id}`}> ➤ Visualizar</a>
                  </div>
                </li>

            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default FileList;
