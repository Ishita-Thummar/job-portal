import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { useTranslation } from "react-i18next";

const PostJob = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [wagesFrom, setWagesFrom] = useState("");
  const [wagesTo, setWagesTo] = useState("");
  const [fixedWages, setFixedWages] = useState("");
  const [wagesType, setWagesType] = useState("default");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Employer")) {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  const handleWagesTypeChange = (e) => {
    const selectedType = e.target.value;
    setWagesType(selectedType);

    // Reset salary fields based on the selected wages type
    if (selectedType === "Fixed Wages") {
      setWagesFrom("");
      setWagesTo("");
    } else if (selectedType === "Ranged Wages") {
      setFixedWages("");
    } else {
      setWagesFrom("");
      setWagesTo("");
      setFixedWages("");
    }
  };

  const handleJobPost = async (e) => {
    e.preventDefault();

    if (!category) {
      return toast.error("Please select a category.");
    }

    // Construct job data correctly
    const jobData =
      wagesType === "Fixed Wages"
        ? { title, description, category, country, city, location, fixedWages }
        : {
            title,
            description,
            category,
            country,
            city,
            location,
            wagesFrom,
            wagesTo,
          };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/job/post",
        jobData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(response.data.message);
      navigateTo("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  // return (
  //   <div className="job_post page">
  //     <div className="container">
  //       <h3>POST NEW WORK</h3>
  //       <form onSubmit={handleJobPost}>
  //         <div className="wrapper">
  //           <input
  //             type="text"
  //             value={title}
  //             onChange={(e) => setTitle(e.target.value)}
  //             placeholder="Work Title"
  //             required
  //           />
  //           <select
  //             value={category}
  //             onChange={(e) => setCategory(e.target.value)}
  //             required
  //           >
  //             <option value="">Select Category</option>
  //             <option value="Construction Labor">Construction Labor</option>
  //             <option value="Masonry & Bricklaying">
  //               Masonry & Bricklaying
  //             </option>
  //             <option value="Heavy Equipment Operation">
  //               Heavy Equipment Operation
  //             </option>
  //             <option value="Electrical & Plumbing">
  //               Electrical & Plumbing
  //             </option>
  //             <option value="Welding & Fabrication">
  //               Welding & Fabrication
  //             </option>
  //             <option value="Painting & Finishing">Painting & Finishing</option>
  //             <option value="Mechanical Repairs">Mechanical Repairs</option>
  //             <option value="Road & Bridge Work">Road & Bridge Work</option>
  //           </select>
  //         </div>
  //         <div className="wrapper">
  //           <input
  //             type="text"
  //             value={country}
  //             onChange={(e) => setCountry(e.target.value)}
  //             placeholder="Country"
  //             required
  //           />
  //           <input
  //             type="text"
  //             value={city}
  //             onChange={(e) => setCity(e.target.value)}
  //             placeholder="City"
  //             required
  //           />
  //         </div>
  //         <input
  //           type="text"
  //           value={location}
  //           onChange={(e) => setLocation(e.target.value)}
  //           placeholder="Location"
  //           required
  //         />
  //         <div className="salary_wrapper">
  //           <select value={wagesType} onChange={handleWagesTypeChange} required>
  //             <option value="default">Select Wages Type</option>
  //             <option value="Fixed Wages">Fixed Wages</option>
  //             <option value="Ranged Wages">Ranged Wages</option>
  //           </select>
  //           <div>
  //             {wagesType === "default" ? (
  //               <p>Please provide Wages Type *</p>
  //             ) : wagesType === "Fixed Wages" ? (
  //               <input
  //                 type="number"
  //                 placeholder="Enter Fixed Wages"
  //                 value={fixedWages}
  //                 onChange={(e) => setFixedWages(e.target.value)}
  //                 required
  //               />
  //             ) : wagesType === "Ranged Wages" ? (
  //               <div className="ranged_salary">
  //                 <input
  //                   type="number"
  //                   placeholder="Wages From"
  //                   value={wagesFrom}
  //                   onChange={(e) => setWagesFrom(e.target.value)}
  //                   required
  //                 />
  //                 <input
  //                   type="number"
  //                   placeholder="Wages To"
  //                   value={wagesTo}
  //                   onChange={(e) => setWagesTo(e.target.value)}
  //                   required
  //                 />
  //               </div>
  //             ) : null}
  //           </div>
  //         </div>
  //         <textarea
  //           rows="10"
  //           value={description}
  //           onChange={(e) => setDescription(e.target.value)}
  //           placeholder="Work Description"
  //           required
  //         />
  //         <button type="submit">Create Work</button>
  //       </form>
  //     </div>
  //   </div>
  // );
  return (
    <div className="job_post page">
      <div className="container">
        <h3>{t("POST NEW WORK")}</h3>
        <form onSubmit={handleJobPost}>
          <div className="wrapper">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("Work Title")}
              required
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">{t("Select Category")}</option>
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
              <option value="Mechanical Repairs">
                {t("Mechanical Repairs")}
              </option>
              <option value="Road & Bridge Work">
                {t("Road & Bridge Work")}
              </option>
            </select>
          </div>
          <div className="wrapper">
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder={t("Country")}
              required
            />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={t("City")}
              required
            />
          </div>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={t("Location")}
            required
          />
          <div className="salary_wrapper">
            <select value={wagesType} onChange={handleWagesTypeChange} required>
              <option value="default">{t("Select Wages Type")}</option>
              <option value="Fixed Wages">{t("Fixed Wages")}</option>
              <option value="Ranged Wages">{t("Ranged Wages")}</option>
            </select>
            <div>
              {wagesType === "default" ? (
                <p>{t("Please provide Wages Type *")}</p>
              ) : wagesType === "Fixed Wages" ? (
                <input
                  type="number"
                  placeholder={t("Enter Fixed Wages")}
                  value={fixedWages}
                  onChange={(e) => setFixedWages(e.target.value)}
                  required
                />
              ) : wagesType === "Ranged Wages" ? (
                <div className="ranged_salary">
                  <input
                    type="number"
                    placeholder={t("Wages From")}
                    value={wagesFrom}
                    onChange={(e) => setWagesFrom(e.target.value)}
                    required
                  />
                  <input
                    type="number"
                    placeholder={t("Wages To")}
                    value={wagesTo}
                    onChange={(e) => setWagesTo(e.target.value)}
                    required
                  />
                </div>
              ) : null}
            </div>
          </div>
          <textarea
            rows="10"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t("Work Description")}
            required
          />
          <button type="submit">{t("Create Work")}</button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
