import React, { useEffect, useState } from 'react';
import { useQuery } from '@redwoodjs/web';
import FileUploader from '../FileUploader/FileUploader';
import FileList from '../FileList/FileList';

 const QUERY = gql`
  query FindFilesListQuery {
    filesList: files {
      id
      name
      url
    }
  }
`;

const FilesListCell = () => {
  const { data, loading, error } = useQuery(QUERY);

  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    if (data && data.filesList) {
      setUploadedFiles(data.filesList);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleFileUpload = (newFile) => {
    const latestId = data.filesList[data.filesList.length - 1]?.id + 1;

    const updatedFile = { ...newFile, id: latestId}

    setUploadedFiles((prevFiles) => [...prevFiles, updatedFile]);
  };

  return (
    <div>
      <FileUploader onFileUpload={handleFileUpload} />
      <FileList files={uploadedFiles} />
    </div>
  );
};

export default FilesListCell