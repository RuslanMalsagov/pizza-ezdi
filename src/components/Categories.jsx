import React, { useState } from "react";

function Categories() {
  const [active, setActive] = useState(0);

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
              onClick={() => setActive(index)}
              className={active === index ? "active" : ""}
            >
              {value}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
