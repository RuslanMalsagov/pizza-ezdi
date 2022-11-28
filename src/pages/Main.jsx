import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../App";
import Sort, { list } from "../components/Sort";
import { useContext } from "react";
import axios from "axios";
import qs from "qs";
import { useRef } from "react";
import {
  getPizza,
  selectPizzaData,
  setItems,
} from "../redux/slices/pizzaSlice";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(true);
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, isLoading } = useSelector(selectPizzaData);

  const { categoryId, sort, currentPage, search } =
    useSelector(selectFilter);

  const setCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const category = categoryId > 0 ? `category=${categoryId}` : "";
  const sortBy = sort.sortProperty.replace("-", "");
  const order = sort.sortProperty.includes("-") ? "asc" : "desc";
  const searchValue = search ? `&search=${search}` : "";

  console.log(items);
  const pizza =
    items &&
    items.filter((el) => {
      if (el.name.toLowerCase().includes(search.toLowerCase())) return true;
      return false;
    });

  const setCurrent = (number) => {
    dispatch(setCurrentPage(number));
  };

  // const fetchPizzas = async () => {
  //   try {
  //     setIsLoading(true);
  //     const { data } = await axios.get(
  //       `https://63734e9a348e947299088973.mockapi.io/items?&page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${searchValue}`
  //     );
  //     dispatch(setItems(data));
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      dispatch(getPizza({ category, sortBy, order, searchValue, currentPage }));
    }
    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, search, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify(
        {
          sortProperty: sort.sortProperty,
          categoryId,
          currentPage,
        },
        { addQueryPrefix: true }
      );
      navigate(queryString);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

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
      <Pagination
        value={currentPage}
        setCurrent={(number) => setCurrent(number)}
      />
    </div>
  );
};

export default Main;
