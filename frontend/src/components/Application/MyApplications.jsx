// import React, { useContext, useEffect, useState } from "react";
// import { Context } from "../../main";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const MyApplications = () => {
//   const [application, setApplications] = useState([]);
//   const [modelOpen, setModelOpen] = useState(false);
//   const { user, isAuthorized } = useContext(Context);
//   const navigateTo = useNavigate();

//   useEffect(() => {
//     try {
//       if (user && user.role === "Employer") {
//         axios
//           .get("http://localhost:4000/api/v1/application/employer/getall", {
//             withCredentials: true,
//           })
//           .then((res) => {
//             setApplications(res.data.applications);
//           });
//       } else {
//         axios
//           .get("http://localhost:4000/api/v1/application/worker/getall", {
//             withCredentials: true,
//           })
//           .then((res) => {
//             setApplications(res.data.applications);
//           });
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   }, [isAuthorized]);
//   return <div>MyApplications</div>;
// };

// export default MyApplications;

import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MyApplications = () => {
  const { t } = useTranslation();
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get("http://localhost:4000/api/v1/application/employer/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get("http://localhost:4000/api/v1/application/worker/getall", {
            withCredentials: true,
          })
          .then((res) => {
            console.log("Applications fetched:", res.data.applications);
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  //working
  //   return (
  //     <section className="my_applications page">
  //       {user && user.role === "Worker" ? (
  //         <div className="container">
  //           <h1>My Applications</h1>
  //           {applications.length <= 0 ? (
  //             <>
  //               {" "}
  //               <h4>No Applications Found</h4>{" "}
  //             </>
  //           ) : (
  //             applications.map((element) => {
  //               return (
  //                 <JobSeekerCard
  //                   element={element}
  //                   key={element._id}
  //                   deleteApplication={deleteApplication}
  //                 />
  //               );
  //             })
  //           )}
  //         </div>
  //       ) : (
  //         <div className="container">
  //           <h1>Applications From Job Seekers</h1>
  //           {applications.length <= 0 ? (
  //             <>
  //               <h4>No Applications Found</h4>
  //             </>
  //           ) : (
  //             applications.map((element) => {
  //               return <EmployerCard element={element} key={element._id} />;
  //             })
  //           )}
  //         </div>
  //       )}
  //     </section>
  //   );
  // };

  // export default MyApplications;

  // const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  //   return (
  //     <>
  //       <div className="job_seeker_card">
  //         <div className="detail">
  //           <p>
  //             <span>Name:</span> {element.name}
  //           </p>
  //           <p>
  //             <span>Email:</span> {element.email}
  //           </p>
  //           <p>
  //             <span>Phone:</span> {element.phone}
  //           </p>
  //           <p>
  //             <span>Address:</span> {element.address}
  //           </p>
  //         </div>

  //         <div className="btn_area">
  //           <button onClick={() => deleteApplication(element._id)}>
  //             Delete Application
  //           </button>
  //         </div>
  //       </div>
  //     </>
  //   );
  // };

  // const EmployerCard = ({ element, openModal }) => {
  //   return (
  //     <>
  //       <div className="job_seeker_card">
  //         <div className="detail">
  //           <p>
  //             <span>Name:</span> {element.name}
  //           </p>
  //           <p>
  //             <span>Email:</span> {element.email}
  //           </p>
  //           <p>
  //             <span>Phone:</span> {element.phone}
  //           </p>
  //           <p>
  //             <span>Address:</span> {element.address}
  //           </p>
  //         </div>
  //       </div>
  //     </>
  //   );
  //new
  return (
    <section className="my_applications page">
      {user && user.role === "Worker" ? (
        <div className="container">
          <h1>{t("My Applications")}</h1>
          {applications.length <= 0 ? (
            <h4>{t("No Applications Found")}</h4>
          ) : (
            applications.map((element) => (
              <JobSeekerCard
                element={element}
                key={element._id}
                deleteApplication={deleteApplication}
              />
            ))
          )}
        </div>
      ) : (
        <div className="container">
          <h1>{t("Applications From Workers")}</h1>
          {applications.length <= 0 ? (
            <h4>{t("No Applications Found")}</h4>
          ) : (
            applications.map((element) => (
              <EmployerCard element={element} key={element._id} />
            ))
          )}
        </div>
      )}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication }) => {
  const { t } = useTranslation();

  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p>
          <span>{t("Name")}:</span> {element.name}
        </p>
        <p>
          <span>{t("Email")}:</span> {element.email}
        </p>
        <p>
          <span>{t("Phone")}:</span> {element.phone}
        </p>
        <p>
          <span>{t("Address")}:</span> {element.address}
        </p>
      </div>

      <div className="btn_area">
        <button onClick={() => deleteApplication(element._id)}>
          {t("Delete Application")}
        </button>
      </div>
    </div>
  );
};

const EmployerCard = ({ element }) => {
  const { t } = useTranslation();

  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p>
          <span>{t("Name")}:</span> {element.name}
        </p>
        <p>
          <span>{t("Email")}:</span> {element.email}
        </p>
        <p>
          <span>{t("Phone")}:</span> {element.phone}
        </p>
        <p>
          <span>{t("Address")}:</span> {element.address}
        </p>
      </div>
    </div>
  );
};
