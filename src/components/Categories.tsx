import React, { memo } from "react";
import useWhyDidYouUpdate from "ahooks/lib/useWhyDidYouUpdate";

type CategoriesProps = {
  categoryId: number;
  onClickCategory: (index: number) => void;
};

const Categories: React.FC<CategoriesProps> = memo(
  ({ categoryId, onClickCategory }) => {
    useWhyDidYouUpdate("Categories", { categoryId, onClickCategory });
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
  }
);

export default Categories;
