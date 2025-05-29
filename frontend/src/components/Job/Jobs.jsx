import React, { useContext, useEffect, useState, useTransition } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { useTranslation } from "react-i18next";

const Jobs = () => {
  const { t } = useTranslation();
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="jobs page">
      <div className="container">
        <h1>{t("ALL AVAILABLE WORK") || "ALL AVAILABLE WORK"}</h1>
        <div className="banner">
          {jobs.jobs &&
            jobs.jobs.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{t(element.title) || element.title}</p>
                  <p>{t(element.category) || element.category}</p>
                  <p>{t(element.country) || element.country}</p>
                  <Link to={`/job/${element._id}`}>
                    {" "}
                    {t("Work Details") || "Work Details"}
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
