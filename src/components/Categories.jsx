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
  const handleOnClickActive = (a) => {
    setActive(a);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((el, index) => {
          return (
            <li
              onClick={() => handleOnClickActive(index)}
              className={active === index ? "active" : ""}
            >
              {el}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
