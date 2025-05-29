import React from "react";
import {
  MdAccountBalance,
  MdOutlineAnimation,
  MdEngineering,
  MdBuild,
} from "react-icons/md";
import { FaHardHat } from "react-icons/fa";
import { GiBrickWall, GiMineTruck } from "react-icons/gi";
import { useTranslation } from "react-i18next";

const PopularCategories = () => {
  const { t } = useTranslation();
  const categories = [
    {
      id: 1,
      title: "Construction Labor",
      icon: <FaHardHat />,
    },
    {
      id: 2,
      title: "Masonry & Bricklaying",
      icon: <GiBrickWall />,
    },
    {
      id: 3,
      title: "Heavy Equipment Operation",
      icon: <GiMineTruck />,
    },
    {
      id: 4,
      title: "Electrical & Plumbing",
      icon: <MdBuild />,
    },
    {
      id: 5,
      title: "Welding & Fabrication",
      icon: <MdEngineering />,
    },
    {
      id: 6,
      title: "Painting & Finishing",
      icon: <MdOutlineAnimation />,
    },
  ];

  return (
    <div className="categories">
      <h3 className="text-2xl font-bold text-center mb-6">
        {t("POPULAR CATEGORIES")}
      </h3>
      <div className="banner flex flex-wrap justify-center gap-6">
        {categories.map((element) => {
          return (
            <div
              className="card bg-white shadow-lg p-6 rounded-lg text-center w-64"
              key={element.id}
            >
              <div className="icon text-4xl text-blue-600 mx-auto mb-3">
                {element.icon}
                <h6 className="font-semibold text-lg">{t(element.title)}</h6>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCategories;
