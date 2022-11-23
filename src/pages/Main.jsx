import axios from "axios";
import Skeleton from "../components/PizzaBlock/Skeleton";
import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";
import { useContext } from "react";
import { SearchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

const Main = () => {
  const dispatch = useDispatch();
  const { search } = useContext(SearchContext);
  const { categoryId, sort } = useSelector((state) => state.filter);

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState([]);

  const setCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const category = categoryId > 0 ? `category=${categoryId}` : "";
  const sortBy = sort.sortProperty.replace("-", "");
  const order = sort.sortProperty.includes("-") ? "asc" : "desc";
  const searchValue = search ? `&search=${search}` : "";

  const pizza = item.filter((el) => {
    if (el.name.toLowerCase().includes(search.toLowerCase())) return true;
    return false;
  });

  useEffect(() => {
    setIsLoading(true);
    // fetch(
    //   `https://63734e9a348e947299088973.mockapi.io/items?&page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${searchValue}`
    // )
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     setItem(data);
    //     setIsLoading(false);
    //   });
    axios
      .get(
        `https://63734e9a348e947299088973.mockapi.io/items?&page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${searchValue}`
      )
      .then((res) => {
        setItem(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort, search, currentPage]);

  return (
    <div>
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onClickCategory={(index) => setCategory(index)}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : pizza.map((el) => {
              return <PizzaBlock key={el.id} {...el} />;
            })}
      </div>
      <Pagination setCurrentPage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Main;
