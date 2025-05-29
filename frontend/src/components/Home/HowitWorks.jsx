import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { useTranslation } from "react-i18next";

const HowItWorks = () => {
  const { t } = useTranslation();
  return (
    <div className="howitworks">
      <div className="container text-center">
        <h3 className="text-2xl font-bold mb-6">{t("How NAKA Works")}</h3>
        <div className="banner flex flex-wrap justify-center gap-6">
          <div className="card bg-white shadow-lg p-6 rounded-lg text-center w-64">
            <FaUserPlus className="text-4xl text-blue-600 mx-auto mb-3" />
            <h4 className="font-semibold text-lg">{t("Create an Account")}</h4>
            <p className="text-gray-600 text-sm mt-2">
              {t(
                "Sign up easily using your email or social login. Verify your profile and get access to job opportunities."
              )}
            </p>
          </div>
          <div className="card bg-white shadow-lg p-6 rounded-lg text-center w-64">
            <MdFindInPage className="text-4xl text-green-600 mx-auto mb-3" />
            <h4 className="font-semibold text-lg">
              {t("Find Work / Post Work")}
            </h4>
            <p className="text-gray-600 text-sm mt-2">
              {t(
                "Browse thousands of job listings, apply filters, and find the perfect job. Employers can post jobs and attract the best talent."
              )}
            </p>
          </div>
          <div className="card bg-white shadow-lg p-6 rounded-lg text-center w-64">
            <IoMdSend className="text-4xl text-red-600 mx-auto mb-3" />
            <h4 className="font-semibold text-lg">
              {t("Apply or Hire Candidates")}
            </h4>
            <p className="text-gray-600 text-sm mt-2">
              {t(
                "Workers can apply directly, and employers can review applications to hire the most suitable candidates quickly"
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
