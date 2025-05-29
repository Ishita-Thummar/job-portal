// import React, { useContext, useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Context } from "../../main";

// const JobDetails = () => {
//   const { id } = useParams();
//   const [job, setJob] = useState({});
//   // const [loading, setLoading] = useState(true);
//   const navigateTo = useNavigate();

//   const { isAuthorized, user } = useContext(Context);
//   console.log("Extracted Job ID:", id);

//   // useEffect(() => {
//   //   if (!isAuthorized) {
//   //     navigateTo("/login");
//   //   }
//   // }, [isAuthorized, navigateTo]);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:4000/api/v1/job/${id}`, {
//         withCredentials: true,
//       })
//       .then((res) => {
//         setJob(res.data.job);
//         //setLoading(false);
//       })
//       .catch((error) => {
//         navigateTo("/notfound");
//       });
//   }, []);

//   if (!isAuthorized) {
//     navigateTo("/login");
//   }

//   return (
//     <section className="jobDetail page">
//       <div className="container">
//         <h3>Job Details</h3>
//         <div className="banner">
//           <p>
//             Title: <span> {job.title}</span>
//           </p>
//           <p>
//             Category: <span>{job.category}</span>
//           </p>
//           <p>
//             Country: <span>{job.country}</span>
//           </p>
//           <p>
//             City: <span>{job.city}</span>
//           </p>
//           <p>
//             Location: <span>{job.location}</span>
//           </p>
//           <p>
//             Description: <span>{job.description}</span>
//           </p>
//           <p>
//             Work Posted On: <span>{job.jobPostedOn}</span>
//           </p>
//           <p>
//             Wages:{" "}
//             {job.fixedWages ? (
//               <span>{job.fixedWages}</span>
//             ) : (
//               <span>
//                 {job.wagesFrom} - {job.wagesTo}
//               </span>
//             )}
//           </p>
//           {user && user.role === "Employer" ? (
//             <></>
//           ) : (
//             <Link to={`/application/${job._id}`}>Apply Now</Link>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default JobDetails;

// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Context } from "../../main";
// import axios from "axios";

// const JobDetails = () => {
//   const { id } = useParams();
//   const [job, setJob] = useState({});
//   const navigateTo = useNavigate();

//   const { isAuthorized, user } = useContext(Context);
//   useEffect(() => {
//     axios
//       .get(`http://localhost:4000/api/v1/job/${id}`, {
//         withCredentials: true,
//       })
//       .then((res) => {
//         setJob(res.data.job);
//       })
//       .catch((err) => {
//         console.log(err.response.data.json);
//       });
//   }, []);

//   if (!isAuthorized) {
//     navigateTo("/login");
//   }

//   return (
//     <>
//       <div className="jobDetail page">
//         <div className="container">
//           <h3>Job Details</h3>
//           <div className="banner">
//             <p>
//               Title:<span>{job.title}</span>
//             </p>
//             <p>
//               Category:<span>{job.category}</span>
//             </p>
//             <p>
//               Country:<span>{job.country}</span>
//             </p>
//             <p>
//               City:<span>{job.city}</span>
//             </p>
//             <p>
//               Location:<span>{job.location}</span>
//             </p>
//             <p>
//               Description:<span>{job.description}</span>
//             </p>
//             <p>
//               Work Posted On::<span>{job.jobPostedOn}</span>
//             </p>
//             <p>
//               Wages:
//               {job.fixedWages ? (
//                 <span>{job.fixedWages}</span>
//               ) : (
//                 <span>
//                   {job.wagesFrom}-{job.wagesTo}
//                 </span>
//               )}
//             </p>
//             <p>
//               {user && user.role === "Employer" ? (
//                 <></>
//               ) : (
//                 <Link to={`/application/${job._id}`}>Apply</Link>
//               )}
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default JobDetails;

//1
// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { Context } from "../../main";
// import toast from "react-hot-toast";

// const JobDetails = () => {
//   const { jobId } = useParams(); // Extract job ID from URL
//   const navigateTo = useNavigate();
//   const { isAuthorized } = useContext(Context);
//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!isAuthorized) {
//       navigateTo("/login");
//       return;
//     }

//     if (!jobId) {
//       toast.error("Invalid Job ID");
//       navigateTo("/");
//       return;
//     }

//     const fetchJob = async () => {
//       try {
//         const { data } = await axios.get(
//           `http://localhost:4000/api/v1/job/${jobId}`,
//           { withCredentials: true }
//         );
//         setJob(data.job);
//       } catch (error) {
//         toast.error(error.response?.data?.message || "Failed to load job");
//         navigateTo("/");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJob();
//   }, [jobId, isAuthorized, navigateTo]);

//   if (loading) return <p>Loading job details...</p>;

//   return (
//     <div className="job-details">
//       {job ? (
//         <>
//           <h1>{job.title}</h1>
//           <p><strong>Company:</strong> {job.company}</p>
//           <p><strong>Location:</strong> {job.location}</p>
//           <p><strong>Description:</strong> {job.description}</p>
//           <p><strong>Category:</strong> {job.category}</p>
//           <p><strong>Salary:</strong> {job.fixedWages || `${job.wagesFrom} - ${job.wagesTo}`}</p>
//         </>
//       ) : (
//         <p>Job not found</p>
//       )}
//     </div>
//   );
// };

// export default JobDetails;

//5
// import React, { useContext, useEffect, useState } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Context } from "../../main";

// const JobDetails = () => {
//   const { id } = useParams();
//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigateTo = useNavigate();
//   const { isAuthorized, user } = useContext(Context);

//   // Redirect to login if not authorized
//   useEffect(() => {
//     if (!isAuthorized) {
//       navigateTo("/login");
//     }
//   }, [isAuthorized, navigateTo]);

//   // Fetch job details
//   useEffect(() => {
//     axios
//       .get(`http://localhost:4000/api/v1/job/${id}`, { withCredentials: true })
//       .then((res) => {
//         console.log("API Response:", res.data); // Debugging
//         setJob(res.data.job);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching job:", error.response?.data || error);
//         navigateTo("/notfound");
//       });
//   }, [id, navigateTo]);

//   // Show loading state until job data is available
//   if (loading) {
//     return <p>Loading job details...</p>;
//   }

//   return (
//     <section className="jobDetail page">
//       <div className="container">
//         <h3>Job Details</h3>
//         <div className="banner">
//           <p>
//             Title: <span>{job?.title}</span>
//           </p>
//           <p>
//             Category: <span>{job?.category}</span>
//           </p>
//           <p>
//             Country: <span>{job?.country}</span>
//           </p>
//           <p>
//             City: <span>{job?.city}</span>
//           </p>
//           <p>
//             Location: <span>{job?.location}</span>
//           </p>
//           <p>
//             Description: <span>{job?.description}</span>
//           </p>
//           <p>
//             Work Posted On:{" "}
//             <span>{new Date(job?.jobPostedOn).toDateString()}</span>
//           </p>
//           <p>
//             Wages:{" "}
//             {job?.fixedWages ? (
//               <span>{job?.fixedWages}</span>
//             ) : (
//               <span>
//                 {job?.wagesFrom} - {job?.wagesTo}
//               </span>
//             )}
//           </p>
//           {user && user.role === "Employer" ? (
//             <></>
//           ) : (
//             <Link to={`/application/${job?._id}`}>Apply Now</Link>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default JobDetails;

//6
// import React, { useContext, useEffect, useState } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Context } from "../../main";

// const JobDetails = () => {
//   const { id } = useParams();
//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigateTo = useNavigate();
//   const { isAuthorized, user } = useContext(Context);

//   // Redirect to login if not authorized
//   useEffect(() => {
//     if (!isAuthorized) {
//       navigateTo("/login");
//     }
//   }, [isAuthorized, navigateTo]);

//   // Fetch job details
//   useEffect(() => {
//     axios
//       .get(`http://localhost:4000/api/v1/job/${id}`, { withCredentials: true })
//       .then((res) => {
//         console.log("API Response:", res.data); // Debugging
//         setJob(res.data.job || res.data.myjobs?.[0] || {}); // Handle different response structures
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching job:", error.response?.data || error);
//         navigateTo("/notfound");
//       });
//   }, [id, navigateTo]);

//   // Show loading state until job data is available
//   if (loading) {
//     return <p>Loading job details...</p>;
//   }

//   return (
//     <section className="jobDetail page">
//       <div className="container">
//         <h3>Job Details</h3>
//         <div className="banner">
//           <p>
//             Title: <span>{job?.title || "N/A"}</span>
//           </p>
//           <p>
//             Category: <span>{job?.category || "N/A"}</span>
//           </p>
//           <p>
//             Country: <span>{job?.country || "N/A"}</span>
//           </p>
//           <p>
//             City: <span>{job?.city || "N/A"}</span>
//           </p>
//           <p>
//             Location: <span>{job?.location || "N/A"}</span>
//           </p>
//           <p>
//             Description: <span>{job?.description || "N/A"}</span>
//           </p>
//           <p>
//             Work Posted On:{" "}
//             <span>
//               {job?.jobPostedOn
//                 ? new Date(job.jobPostedOn).toLocaleDateString()
//                 : "N/A"}
//             </span>
//           </p>
//           <p>
//             Wages:{" "}
//             {job?.fixedWages ? (
//               <span>{job?.fixedWages}</span>
//             ) : (
//               <span>
//                 {job?.wagesFrom ? `${job?.wagesFrom} - ${job?.wagesTo}` : "N/A"}
//               </span>
//             )}
//           </p>
//           {user && user.role === "Employer" ? (
//             <></>
//           ) : (
//             <Link to={`/application/${job?._id}`}>Apply Now</Link>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default JobDetails;

//7 final
// import React, { useContext, useEffect, useState } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Context } from "../../main";
// import { useTranslation } from "react-i18next";

// const JobDetails = () => {
//   const { t } = useTranslation();
//   const { id } = useParams();
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigateTo = useNavigate();
//   const { isAuthorized, user } = useContext(Context);

//   // Redirect to login if not authorized
//   useEffect(() => {
//     if (!isAuthorized) {
//       navigateTo("/login");
//     }
//   }, [isAuthorized, navigateTo]);

//   // Fetch job details
//   useEffect(() => {
//     axios
//       .get(`http://localhost:4000/api/v1/job/${id}`, { withCredentials: true })
//       .then((res) => {
//         console.log("API Response:", res.data); // Debugging

//         // Check if multiple jobs exist and update state accordingly
//         if (res.data.myjobs) {
//           setJobs(res.data.myjobs);
//         } else if (res.data.job) {
//           setJobs([res.data.job]); // Convert single job to array
//         }

//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching job:", error.response?.data || error);
//         navigateTo("/notfound");
//       });
//   }, [id, navigateTo]);

//   // Show loading state until jobs are available
//   if (loading) {
//     return <p>Loading work details...</p>;
//   }

//   return (
//     <section className="jobDetail page">
//       <div className="container">
//         <h3>{t("Job Details")}</h3>

//         {jobs.length === 0 ? (
//           <p>{t("No work details available.")}</p>
//         ) : (
//           jobs.map((job) => (
//             <div className="banner" key={job._id}>
//               <p>
//                 <strong>{t("Title:")}</strong>{" "}
//                 <span>{job?.title || t("N/A")}</span>
//               </p>
//               <p>
//                 <strong>{t("Category:")}</strong>
//                 <span>{job?.category || t("N/A")}</span>
//               </p>
//               <p>
//                 <strong>{t("Country:")}</strong>
//                 <span>{job?.country || t("N/A")}</span>
//               </p>
//               <p>
//                 <strong>{t("City:")}</strong>{" "}
//                 <span>{job?.city || t("N/A")}</span>
//               </p>
//               <p>
//                 <strong>{t("Location:")}</strong>{" "}
//                 <span>{job?.location || t("N/A")}</span>
//               </p>
//               <p>
//                 <strong>{t("Description:")}</strong>{" "}
//                 <span>{job?.description || t("N/A")}</span>
//               </p>
//               <p>
//                 <strong>{t("Work Posted On:")}</strong>{" "}
//                 <span>
//                   {job?.jobPostedOn
//                     ? new Date(job.jobPostedOn).toLocaleDateString()
//                     : t("N/A")}
//                 </span>
//               </p>
//               <p>
//                 <strong>{t("Wages:")}</strong>{" "}
//                 {job?.fixedWages ? (
//                   <span>{job?.fixedWages}</span>
//                 ) : (
//                   <span>
//                     {job?.wagesFrom
//                       ? `${job?.wagesFrom} - ${job?.wagesTo}`
//                       : t("N/A")}
//                   </span>
//                 )}
//               </p>

//               {user && user.role === "Employer" ? (
//                 <></>
//               ) : (
//                 <Link to={`/application/${job?._id}`}>{t("Apply Now")}</Link>
//               )}
//             </div>
//           ))
//         )}
//       </div>
//     </section>
//   );
// };

// export default JobDetails;
//doubt
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../main";
import { useTranslation } from "react-i18next";

const JobDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  // Redirect to login if not authorized
  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
    }
  }, [isAuthorized, navigateTo]);

  // Fetch job details
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, { withCredentials: true })
      .then((res) => {
        console.log("API Response:", res.data);

        if (res.data.myjobs) {
          setJobs(res.data.myjobs);
        } else if (res.data.job) {
          setJobs([res.data.job]);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching job:", error.response?.data || error);
        navigateTo("/notfound");
      });
  }, [id, navigateTo]);

  // Show loading state
  if (loading) {
    return <p>{t("Loading work details...") || "Loading work details..."}</p>;
  }

  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>{t("Work Details") || "Work Details"}</h3>

        {jobs.length === 0 ? (
          <p>
            {t("No work details available.") || "No work details available."}
          </p>
        ) : (
          jobs.map((job) => (
            <div className="banner" key={job._id}>
              <p>
                {t("Title:") || "Title:"}
                <span>{job?.title || t("N/A") || "N/A"}</span>
              </p>
              <p>
                <strong>{t("Category:") || "Category:"}</strong>{" "}
                <span>{job?.category || t("N/A") || "N/A"}</span>
              </p>
              <p>
                <strong>{t("Country:") || "Country:"}</strong>{" "}
                <span>{job?.country || t("N/A") || "N/A"}</span>
              </p>
              <p>
                <strong>{t("City:") || "City:"}</strong>{" "}
                <span>{job?.city || t("N/A") || "N/A"}</span>
              </p>
              <p>
                <strong>{t("Location:") || "Location:"}</strong>{" "}
                <span>{job?.location || t("N/A") || "N/A"}</span>
              </p>
              <p>
                <strong>{t("Description:") || "Description:"}</strong>{" "}
                <span>{job?.description || t("N/A") || "N/A"}</span>
              </p>
              <p>
                <strong>{t("Work Posted On:") || "Work Posted On:"}</strong>{" "}
                <span>
                  {job?.jobPostedOn
                    ? new Date(job.jobPostedOn).toLocaleDateString()
                    : t("N/A") || "N/A"}
                </span>
              </p>
              <p>
                <strong>{t("Wages:") || "Wages:"}</strong>{" "}
                {job?.fixedWages ? (
                  <span>{job?.fixedWages}</span>
                ) : (
                  <span>
                    {job?.wagesFrom
                      ? `${job?.wagesFrom} - ${job?.wagesTo}`
                      : t("N/A") || "N/A"}
                  </span>
                )}
              </p>

              {user && user.role === "Employer" ? (
                <></>
              ) : (
                <Link to={`/application/${job?._id}`}>
                  {t("Apply Now") || "Apply Now"}
                </Link>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

//new

export default JobDetails;
