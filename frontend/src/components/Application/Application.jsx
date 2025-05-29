import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const Application = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const { id } = useParams();
  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("jobId", id);
    console.log(id);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setName("");
      setEmail("");
      setAddress("");
      setPhone("");
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("");
  }

  // return (
  //   <>
  //     <section className="application">
  //       <div className="container">
  //         <h3>Application Form</h3>
  //         <form onSubmit={handleApplication}>
  //           <input
  //             type="text"
  //             placeholder="Your Name"
  //             value={name}
  //             onChange={(e) => setName(e.target.value)}
  //           />
  //           <input
  //             type="text"
  //             placeholder="Your Email"
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //           />
  //           <input
  //             type="number"
  //             placeholder="Your Phone"
  //             value={phone}
  //             onChange={(e) => setPhone(e.target.value)}
  //           />
  //           <input
  //             type="text"
  //             placeholder="Your Address"
  //             value={address}
  //             onChange={(e) => setAddress(e.target.value)}
  //           />
  //           <button type="submit">Send Application</button>
  //         </form>
  //       </div>
  //     </section>
  //   </>
  // );
  return (
    <>
      <section className="application">
        <div className="container">
          <h3>{t("Application Form")}</h3>
          <form onSubmit={handleApplication}>
            <input
              type="text"
              placeholder={t("Your Name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder={t("Your Email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder={t("Your Phone")}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              placeholder={t("Your Address")}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button type="submit">{t("Send Application")}</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Application;
