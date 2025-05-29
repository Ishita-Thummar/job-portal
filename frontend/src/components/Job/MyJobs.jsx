import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useTranslation } from "react-i18next";

const MyJobs = () => {
  const { t } = useTranslation();
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myjobs);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch jobs.");
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  //Function For Disabling Editing Mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    try {
      const res = await axios.put(
        `http://localhost:4000/api/v1/job/update/${jobId}`,
        updatedJob,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setEditingMode(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed.");
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      });
      toast.success("Job deleted successfully.");
      setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed.");
    }
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <div className="myJobs page">
      <div className="container">
        <h1>{t("Your Posted Work", "Your Posted Work")}</h1>
        {myJobs.length > 0 ? (
          <div className="banner">
            {myJobs.map((element) => (
              <div className="card" key={element._id}>
                <div className="content">
                  <div className="short_fields">
                    <div>
                      <span>{t("Title:", "Title:")}</span>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.title}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "title",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div>
                      <span>{t("Country:", "Country:")}</span>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.country}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "country",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div>
                      <span>{t("City:", "City:")}</span>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.city}
                        onChange={(e) =>
                          handleInputChange(element._id, "city", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <span>{t("Category:", "Category:")}</span>
                      <select
                        value={element.category}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "category",
                            e.target.value
                          )
                        }
                        disabled={editingMode !== element._id}
                      >
                        <option value="Construction Labor">
                          {t("Construction Labor")}
                        </option>
                        <option value="Masonry & Bricklaying">
                          {t("Masonry & Bricklaying")}
                        </option>
                        <option value="Heavy Equipment Operation">
                          {t("Heavy Equipment Operation")}
                        </option>
                        <option value="Electrical & Plumbing">
                          {t("Electrical & Plumbing")}
                        </option>
                        <option value="Welding & Fabrication">
                          {t("Welding & Fabrication")}
                        </option>
                        <option value="Painting & Finishing">
                          {t("Painting & Finishing")}
                        </option>
                        <option value="Other">{t("Other")}</option>
                      </select>
                    </div>

                    <div>
                      <span>{t("Wages:", "Wages:")}</span>
                      {element.fixedWages ? (
                        <input
                          type="number"
                          disabled={editingMode !== element._id}
                          value={element.fixedWages}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "fixedWages",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        <div>
                          <input
                            type="number"
                            disabled={editingMode !== element._id}
                            value={element.wagesFrom}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "wagesFrom",
                                e.target.value
                              )
                            }
                          />
                          <input
                            type="number"
                            disabled={editingMode !== element._id}
                            value={element.wagesTo}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "wagesTo",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      <span>{t("Expired:", "Expired:")}</span>
                      <select
                        value={element.expired}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "expired",
                            e.target.value
                          )
                        }
                        disabled={editingMode !== element._id}
                      >
                        <option value="true">{t("TRUE", "TRUE")}</option>
                        <option value="false">{t("FALSE", "FALSE")}</option>
                      </select>
                    </div>
                  </div>

                  <div className="long_field">
                    <div>
                      <span>{t("Description:", "Description:")}</span>
                      <textarea
                        rows="2"
                        value={element.description}
                        disabled={editingMode !== element._id}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div>
                      <span>{t("Location:", "Location:")}</span>
                      <textarea
                        rows="2"
                        value={element.location}
                        disabled={editingMode !== element._id}
                        onChange={(e) =>
                          handleInputChange(
                            element._id,
                            "location",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="button_wrapper">
                  <div className="edit_btn_wrapper">
                    {editingMode === element._id ? (
                      <>
                        <button
                          onClick={() => handleUpdateJob(element._id)}
                          className="check_btn"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={handleDisableEdit}
                          className="cross_btn"
                        >
                          <RxCross2 />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEnableEdit(element._id)}
                        className="edit_btn"
                      >
                        {t("Edit", "Edit")}
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => handleDeleteJob(element._id)}
                    className="delete_btn"
                  >
                    {t("Delete", "Delete")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>{t("No work posted yet.", "No work posted yet.")}</p>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
