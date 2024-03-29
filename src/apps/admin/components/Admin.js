import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { getAllUsers, deleteUser } from "../apis";
import ReactPaginate from "react-paginate";
import CustomModal from "../../admin/components/Modal/CustomModal";
import React, { useState, useEffect } from "react";
import { TrashIcon, DocumentCheckIcon } from "@heroicons/react/24/solid";
import { Typography, Button, Tooltip } from "@material-tailwind/react";
import "../style.css";
import { ToastContainer, toast } from "react-toastify";
import { EMAIL_EXIST_MSG } from "../../auth/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

const TABLE_HEAD = ["Name", "Email", "Phone Number", "Role", "URL", "Action"];

const Admin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [open, setOpen] = useState(false);
  // const [tabState, setTabState] = useState(true);

  const [currentPage, setCurrentPage] = useState(0);
  const [PER_PAGE, setPER_PAGE] = useState(5);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(userData.length / PER_PAGE);

  const showToast = (value) => {
    if (value === 0) {
      toast.error(EMAIL_EXIST_MSG, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (value === 1) {
      toast.success("A new user was registerd succesfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (value === 2) {
      toast.success("The user was updated succesfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (value === 3) {
      toast.success("The text is copied in clipboard succesfully", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const getUsers = async () => {
    setIsLoading(true);
    await getAllUsers()
      .then((res) => {
        setUserData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error ", err);
        setIsLoading(false);
      });
  };

  // const handleChange = () => {
  //   setTabState(!tabState);
  // };

  const handleEdit = (e) => {
    const filterUser = userData.filter((user) => user._id === e);
    setOpen(filterUser);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (id) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (userConfirmed) {
      setIsLoading(true);
      await deleteUser(id)
        .then((res) => {
          setUserData((userData) =>
            userData.filter((user) => user._id !== res.data._id)
          );
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("error ", err);
          setIsLoading(false);
        });
    } else {
      console.log("User deletion cancelled");
      return false;
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <CustomModal
        isOpen={open}
        onClose={handleClose}
        getUsers={getUsers}
        showToast={showToast}
      />
      {isLoading && <div className="coverSpinner"></div>}
      {/* <select
        id="roles"
        name="roles"
        className="input-box m-4 p-3 rounded-xl"
        onChange={handleChange}
        defaultValue={0}
      >
        <option value={0}>user</option>
        <option value={1}>setting</option>
      </select> */}
      {
        <div className="w-full p-4 ">
          <div className="w-full bg-white p-3 rounded-xl">
            <div className="rounded-none">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <Button
                  className="btn danger bg-neutral-950 hover:bg-neutral-800"
                  onClick={handleOpen}
                >
                  Add user
                </Button>
              </div>
            </div>
            <div className="px-0">
              <table className="mt-4 w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head, index) => (
                      <th
                        key={head}
                        className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                        >
                          {head}
                          {/* {index !== TABLE_HEAD.length - 1 && (
                            <ChevronUpDownIcon
                              strokeWidth={2}
                              className="h-4 w-4"
                            />
                          )} */}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {userData
                    .slice(offset, offset + PER_PAGE)
                    .map(
                      (
                        {
                          firstName,
                          lastName,
                          email,
                          mobile_no,
                          roles,
                          _id,
                          direct_URL,
                        },
                        index
                      ) => {
                        let Croles = parseInt(roles);
                        const getRoleName = (Croles) => {
                          switch (Croles) {
                            case 0:
                              return "Admin";
                            case 1:
                              return "Employee";
                            case 2:
                              return "User";
                            default:
                              return "";
                          }
                        };
                        let name =
                          firstName +
                          " " +
                          (lastName === undefined ? "" : lastName);
                        const isLast = index === userData.length - 1;
                        const classes = isLast
                          ? "p-4"
                          : "p-4 border-b border-blue-gray-50";

                        return (
                          <tr key={index} id={_id}>
                            <td className={classes}>
                              <div className="flex items-center gap-3">
                                <div className="flex flex-col">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                  >
                                    {name}
                                  </Typography>
                                </div>
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {email}
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="w-max">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {mobile_no}
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {getRoleName(Croles)}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {direct_URL ? (
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(direct_URL);
                                      showToast(3);
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faCopy} />
                                  </button>
                                ) : (
                                  ""
                                )}
                              </Typography>
                            </td>
                            <td className={classes}>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                <Tooltip content="Delete">
                                  <Button
                                    onClick={() => handleDelete(_id)}
                                    variant="text"
                                  >
                                    <TrashIcon className="h-4 w-4" />
                                  </Button>
                                </Tooltip>
                                <Tooltip content="Edit">
                                  <Button
                                    onClick={() => handleEdit(_id)}
                                    variant="text"
                                  >
                                    <DocumentCheckIcon className="h-4 w-4" />
                                  </Button>
                                </Tooltip>
                              </Typography>
                            </td>
                          </tr>
                        );
                      }
                    )}
                </tbody>
              </table>
              <div className="tableFooter">
                {/* <div>
              Show -{" "}
              <select
                className="show-number"
                onChange={(e) => setPER_PAGE(e.target.value)}
              >
                <option defaultValue>3</option>
                <option>20</option>
                <option>30</option>
                <option>40</option>
              </select>
            </div> */}
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
            </div>
          </div>
        </div>
      }
      <ToastContainer />
    </>
  );
};

export default Admin;
