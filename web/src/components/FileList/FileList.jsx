// FileList.js
import React, { useEffect, useState } from 'react';

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
          <li key={file.buffer}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              {file.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
