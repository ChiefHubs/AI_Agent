import React, { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import { ToastContainer, toast } from "react-toastify";
import {
  getAllFiles,
  retrainModel,
  uploadFile,
  deleteModel,
  setActiveModelApi,
  retrainAllModels,
  getActiveModelApi,
  uploadURL,
} from "../apis";
import { setActiveModel } from "../../auth/actions";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faTimesCircle,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import UploadModal from "./UploadModal";
import { useFormik } from "formik";
import { ScrapURL, ScrapFile } from "../validations";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["PDF", "TXT", "DOCX"];

const FileUpload = () => {
  const fileRef = useRef();
  const dispatch = useDispatch();
  const activeModel = useSelector((store) => store.auth.activeModel);
  const theme = useSelector((store) => store.setting.isDark);
  const [uploaddata, setUploadData] = useState([]);
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRetrained, setIsRetrained] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [PER_PAGE, setPER_PAGE] = useState(6);
  const [isFile, setIsFile] = useState(true);
  const [url, setURL] = useState("");

  const [file, setFile] = useState(null);
  const handleFileChange = (file) => {
    setFile(file);
  };

  const formik = useFormik({
    initialValues: {
      url: "",
    },
    validationSchema: !isFile ? ScrapURL : null,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    if (isFile) {
      try {
        const res = await uploadFile({ file });
        handleClose();
        handleGetAllFiles();
        // storeVectorDB(res.data.result._id, res.data.result.path);
        toast.success("Upload successful", {
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
        setIsLoading(false);
        toast.error("Something Went wrong!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log(e.message);
      }
    } else {
      try {
        const res = await uploadURL({ url: values.url });
        handleClose();
        handleGetAllFiles();
        // // storeVectorDB(res.data.result._id, res.data.result.path);
        toast.success("Upload successful", {
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
        setIsLoading(false);
        // toast.error("Something Went wrong!", {
        //   position: "bottom-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "dark",
        // });
        console.log(e.message);
      }
    }
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(uploaddata.length / PER_PAGE);

  useEffect(() => {
    handleGetAllFiles();
    // handleGetActiveModel();
  }, []);

  const handleGetActiveModel = () => {
    try {
      const res = getActiveModelApi();

      dispatch(setActiveModel(res.activeModel));
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleGetAllFiles = async () => {
    try {
      const res = await getAllFiles();
      setUploadData(res.data.result);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (e) {
      setIsLoading(false);
      console.log(e.message);
    }
  };

  const handleUploadFile = async ({ currentTarget: input }) => {
    setIsLoading(true);
    setIsRetrained(false);
    try {
      const res = await uploadFile(input.files[0]);
      handleGetAllFiles();
      fileRef.current.value = null;
      toast.success("Upload successful", {
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
      setIsLoading(false);
      toast.error("Something Went wrong!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log(e.message);
    }
  };

  const handleRetrainModel = async () => {
    setIsLoading(true);
    // const filesToRetrained = [];
    // console.log("retrain ", isRetrained);
    // setIsRetrained(true);
    setIsDelete(false);
    // files.forEach((file) => !file.retrained && filesToRetrained.push(file));
    try {
      const res = await retrainModel(uploaddata);
      // console.log("res retrain  ", res.data);
      handleGetAllFiles();
      toast.success("Model retrained successfully", {
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
      setIsLoading(false);
      toast.error("Something Went wrong!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log(e.message);
    }
  };

  const handleRetrainAllModels = async () => {
    setIsLoading(true);
    try {
      const res = await retrainAllModels(uploaddata);
      // console.log("res all models", res.data.files);
      // setFiles(res.data.files);
      handleGetAllFiles();
      setIsRetrained(true);

      toast.success("All models retrained successfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      toast.error("Something Went wrong!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log(e.message);
    }
  };

  const handleDeleteFile = async (id, path) => {
    setIsLoading(true);
    setIsDelete(true);
    try {
      const res = await deleteModel({ id, path });
      handleGetAllFiles();
      // await retrainModel(files);
      toast.success("File deleted successfully!", {
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
      setIsLoading(false);
      toast.error("Something Went wrong!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.log(e.message);
    }
  };

  const handlesetActiveModel = async (id) => {
    try {
      const res = await setActiveModelApi(id);
      // console.log("res all active model ", res.data);
      dispatch(setActiveModel(id));
    } catch (e) {
      console.log(e.message);
    }
  };

  const TABLE_HEAD = ["Type", "Name", "Action"];

  const [opentable, setOpenTable] = useState(1);

  const handleOpenTable = (value) =>
    setOpenTable(opentable === value ? 0 : value);

  return (
    <div className="w-full bg-white p-3 rounded-xl border border-gray-500">
      {isLoading && <div className="coverSpinner"></div>}
      <div className="firstSection">
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",

            alignItems: "baseline",
            // justifyContent: "flex-end",
            // width: "12%",
          }}
        >
          <>
            <button
              className={` ${
                theme === true
                  ? "bg-white text-black hover:bg-gray-300"
                  : "bg-black text-white"
              }  p-2 text-base font-bold rounded cursor-pointer`}
              onClick={() => {
                handleRetrainModel();
              }}
            >
              <FontAwesomeIcon icon={faStore} className="mr-2" />
              Retrain
            </button>
            <button
              className={` ${
                theme === true
                  ? "bg-white text-black hover:bg-gray-300"
                  : "bg-black text-white"
              }  p-2 text-base font-bold rounded cursor-pointer`}
              onClick={handleOpen}
            >
              <FontAwesomeIcon icon={faCirclePlus} className="mr-2" />
              Upload
            </button>
          </>
        </div>
      </div>
      {uploaddata.length ? (
        <>
          <table
            id="filesTable"
            className="mt-4 w-full min-w-max table-auto text-left"
          >
            <thead>
              <tr key={-1}>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={index}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <p
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {uploaddata.slice(offset, offset + PER_PAGE).map((item, i) => {
                const isLast = i === uploaddata.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                return (
                  <>
                    <tr key={i}>
                      <td className={classes}>{item.type}</td>
                      <td className={classes}>{item.name}</td>
                      {/* <td className={classes}>{item.status}</td>
                      <td className={classes}>{item.size}</td>
                      <td className={classes}>{item.last_modified}</td> */}
                      <td className="p-4 btn-container">
                        {/* <button
                          onClick={() => handleDeleteFile(item.id, item.path)}
                        >
                          <FontAwesomeIcon icon={faSync} />
                        </button> */}
                        <button
                          onClick={() => handleDeleteFile(item._id, item.path)}
                        >
                          <FontAwesomeIcon icon={faTimesCircle} />
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>

          <div className="tableFooter">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              disabledClassName={"page-item"}
              activeClassName={"page-item active"}
              activeLinkClassName="page-link"
            />
          </div>
        </>
      ) : (
        <div className="noRecordFound">
          <h2 className={`${theme === true ? "text-black" : "text-black"}`}>
            No record found
          </h2>
        </div>
      )}
      <UploadModal isOpen={open} onClose={handleClose}>
        <div className="p-2">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-content-area">
              <p className="text-xl my-2">Add new data source</p>
              <div className="flex justify-center items-center my-2">
                <button
                  type="button"
                  className={
                    isFile ? `btn bg-black text-white` : `btn bg-white border`
                  }
                  onClick={() => {
                    setIsFile(true);
                  }}
                >
                  File
                </button>
                <button
                  type="button"
                  className={
                    !isFile ? `btn bg-black text-white` : `btn bg-white border`
                  }
                  onClick={() => {
                    setIsFile(false);
                  }}
                >
                  URL
                </button>
              </div>
              <div className="my-2">
                {isFile ? (
                  <>
                    <FileUploader
                      handleChange={handleFileChange}
                      name="file"
                      types={fileTypes}
                    />

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <button type="submit" className="btn forgot-btn !w-full">
                        Submit
                      </button>
                    </div>
                    {/* <label
                      className="btn bg-black text-white !w-full"
                      htmlFor="customFile"
                    >
                      Upload File
                    </label>
                    <input
                      ref={fileRef}
                      type="file"
                      onChange={handleUploadFile}
                      id="customFile"
                      style={{ display: "none", height: "0px", width: "0px" }}
                    /> */}
                  </>
                ) : (
                  <div>
                    <div className="form-control">
                      <span className="input-error">
                        <label>URL </label>
                        {formik.touched.url && formik.errors.url ? (
                          <div className="error">{formik.errors.url}</div>
                        ) : null}
                      </span>

                      <input
                        type="url"
                        id="url"
                        name="url"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.url}
                        className="input-box"
                        placeholder="Enter URL"
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <button type="submit" className="btn forgot-btn !w-full">
                        Submit
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <button className="btn cancel-btn !w-full" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </UploadModal>
      <ToastContainer />
    </div>
  );
};

export default FileUpload;
