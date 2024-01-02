import React, { useEffect, useRef, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import { getAllFiles, retrainModel, uploadFile } from "../apis";

const FileUpload = () => {
const fileRef = useRef();
  const [files, setFiles] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleGetAllFiles();
  }, [])

  const handleGetAllFiles = async () => {
    
    try {
      const res = await getAllFiles();
      res.data.length&&setFiles(res.data)
      setTimeout(() => {
        setIsLoading(false)
      }, 5000);
      
    } catch (e) {
      setIsLoading(false);
      console.log(e.message)
    }
  }

  const handleUploadFile=async({currentTarget:input})=>{
    setIsLoading(true);
    try {
      const res = await uploadFile(input.files[0]);
      handleGetAllFiles();
      fileRef.current.value=null;
      toast.success('Upload successful', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

    } catch (e) {
      setIsLoading(false)
      toast.error('Something Went wrong!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      console.log(e.message)
    }
  }
  const handleRetrainModel=async(file)=>{
    setIsLoading(true);
    
    try {
      const res = await retrainModel(file);
      handleGetAllFiles();
      toast.success('Model retrained successfully', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } catch (e) {
      setIsLoading(false)
      toast.error('Something Went wrong!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      console.log(e.message)
    }
  }



  return (
    <div className="aroundFileUploadTable">
      {isLoading && <div className="coverSpinner"></div>}
      <div className="firstSection">
        <div className="font-bold text-xl text-black p-2">All files</div>

        <div className="file-upload-input">
          <label className="file-upload-btn" for="customFile">
            Upload new file
          </label>
          <input
            ref={fileRef}
            type="file"
            onChange={handleUploadFile}
            id="customFile"
            style={{ visibility: "hidden" }}
          />
        </div>
      </div>
      {files ? (
        <table id="filesTable">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Title</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr>
                <th scope="row">{file.id}</th>
                <td>{file.title}</td>
                <td>
                  {file.retrained ? (
                    "Retrained"
                  ) : (
                    <button
                      onClick={() => handleRetrainModel(file)}
                      align="center"
                      className="retrainButton"
                    >
                      Retrain model
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="noRecordFound">
          <h2>No record found</h2>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default FileUpload;
