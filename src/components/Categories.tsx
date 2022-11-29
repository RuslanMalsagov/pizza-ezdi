import React from "react";
import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate'

type CategoriesProps = {
  categoryId: number;
  onClickCategory: (index: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({
  categoryId,
  onClickCategory,
}) => {
  useWhyDidYouUpdate()
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => {
          return (
            <li
              key={index}
              onClick={() => onClickCategory(index)}
              className={categoryId === index ? "active" : ""}
            >
              {value}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
