import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  return (
    <>
      <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
        <div className="container">
          <div className="logo">
            <img src="NAKA_logo.png" alt="logo" />
          </div>
          <ul className={!show ? "menu" : "show-menu menu"}>
            <li>
              <Link to={"/"} onClick={() => setShow(false)}>
                {t("home")}
              </Link>
            </li>
            <li>
              <Link to={"/job/getall"} onClick={() => setShow(false)}>
                {t("all_jobs")}
              </Link>
            </li>
            <li>
              <Link to={"/application/me"} onClick={() => setShow(false)}>
                {user && user.role === "Employer"
                  ? t("applicant_applications")
                  : t("my_applications")}
              </Link>
            </li>
            {user && user.role === "Employer" && (
              <>
                <li>
                  <Link to={"/job/post"} onClick={() => setShow(false)}>
                    {t("post_new_job")}
                  </Link>
                </li>
                <li>
                  <Link to={"/job/getmyjobs"} onClick={() => setShow(false)}>
                    {t("view_your_jobs")}
                  </Link>
                </li>
              </>
            )}

            {/* Language Dropdown */}
            <li>
              <select
                onChange={(e) => changeLanguage(e.target.value)}
                value={i18n.language}
                className="language-select"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="mr">मराठी</option>
                <option value="gu">ગુજરાતી</option>
              </select>
            </li>

            {/* Logout Button */}
            <li>
              <button onClick={handleLogout} className="logout-btn">
                {t("logout")}
              </button>
            </li>
          </ul>

          <div className="hamburger">
            <GiHamburgerMenu onClick={() => setShow(!show)} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
