import Skeleton from "../components/PizzaBlock/Skeleton";
import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";

const Main = () => {
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://63734e9a348e947299088973.mockapi.io/items")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setItem(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : item.map((el) => {
              return <PizzaBlock key={el.id} {...el} />;
            })}
      </div>
    </div>
  );
};

export default Main;
