import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import Sort, { list } from "../components/Sort";
import qs from "qs";
import { useRef } from "react";
import {
  getPizza,
  selectPizzaData,
  TSearchPizzaParams,
} from "../redux/slices/pizzaSlice";
import { useAppDispatch } from "../redux/store";

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(true);
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, isLoading } = useSelector(selectPizzaData);

  const { categoryId, sort, currentPage, search } = useSelector(selectFilter);

  const setCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const category = categoryId > 0 ? `category=${categoryId}` : "";
  const sortBy = sort.sortProperty.replace("-", "");
  const order = sort.sortProperty.includes("-") ? "asc" : "desc";
  const searchValue = search ? `&search=${search}` : "";

  const pizza =
    items &&
    items.filter((el: any) => {
      if (el.name.toLowerCase().includes(search.toLowerCase())) return true;
      return false;
    });

  const setCurrent = (number: number) => {
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
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as TSearchPizzaParams;
      console.log(params);
      const sortBy = list.find((obj) => obj.sortProperty === params.sortBy);
      console.log("sort", sortBy);
      dispatch(
        setFilters({
          categoryId: Number(params.category),
          search: params.searchValue,
          currentPage: Number(params.currentPage),
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      dispatch(
        getPizza({
          category,
          sortBy,
          order,
          searchValue,
          currentPage: String(currentPage),
        })
      );
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
          onClickCategory={(index: number) => setCategory(index)}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : pizza.map((el: any) => {
              return <PizzaBlock key={el.id} {...el} />;
            })}
      </div>
      <Pagination
        value={currentPage}
        setCurrent={(number: number) => setCurrent(number)}
      />
    </div>
  );
};

export default Main;
