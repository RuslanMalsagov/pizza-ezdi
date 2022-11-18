import Skeleton from "../components/PizzaBlock/Skeleton";
import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";

const Main = () => {
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortValue, setSortValue] = useState({
    name: "популярности",
    sortProperty: "rating",
  });

  const category = categoryId > 0 ? `category=${categoryId}` : "";
  const sortBy = sortValue.sortProperty.replace("-", "");
  const order = sortValue.sortProperty.includes("-") ? "asc" : "desc";

  console.log("categoryId", categoryId, "sortValue", sortValue);
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://63734e9a348e947299088973.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setItem(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortValue]);

  return (
    <div>
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onClickCategory={(index) => setCategoryId(index)}
        />
        <Sort value={sortValue} onClickSort={(obj) => setSortValue(obj)} />
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
