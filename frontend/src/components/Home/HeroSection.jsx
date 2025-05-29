import React from "react";
import { useTranslation } from "react-i18next";
import { FaSuitcase, FaBuilding, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const { t } = useTranslation();
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: t("Live Work"),
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: t("Sites"),
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: t("Workers"),
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: t("Employers"),
      icon: <FaUserPlus />,
    },
  ];

  return (
    <div className="heroSection">
      <div className="container">
        <div className="title">
          <h1>{t("Find Work Without the Wait")}</h1>
          <h2>{t("Connect With Employers Instantly")}</h2>
          <p>
            {t(
              "Tired of standing at Naka all day and returning home without work? Platform Naka is here to change that. No more waiting, no more uncertainty. Get connected with the right jobs quickly and start earning without wasting time. Your skills deserve better opportunities, and we bring them to you."
            )}
          </p>
        </div>
        <div className="image">
          <img src="worker1.png" alt="hero" />
        </div>
      </div>
      <div className="details">
        {details.map((element) => {
          return (
            <div className="card" key={element.id}>
              <div className="icon">{element.icon}</div>
              <div className="content">
                <p>{element.title}</p>
                <p>{element.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroSection;
