const FileList = ({ files }) => {

  if (!files) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {console.log(files)}
      <h2>Lista de Arquivos</h2>
      <ul>
      {files.map((file) => (
          <li key={file.id}>
            <a href={`/files/${file.id}`}>
              {file.name}
            </a>
          </li>
        ))}

      </ul>
    </div>
  );
};

export default FileList;
