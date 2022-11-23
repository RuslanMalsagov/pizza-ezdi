import React, { useContext } from "react";
import styles from "./Search.module.scss";
import { SearchContext } from "../../App";
import { useRef } from "react";

const Search = () => {
  const { search, setSearch } = useContext(SearchContext);
  const inputRef = useRef();
  console.log(inputRef);
  const onClearInput = () => {
    setSearch("");
    inputRef.current.focus();
  };

  return (
    <div className={styles.search}>
      <svg
        className={styles.search__Icon}
        xmlns="http://www.w3.org/2000/svg"
        fill="#000000"
        viewBox="0 0 50 50"
        width="50px"
        height="50px"
      >
        <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z" />
      </svg>
      <input
        ref={inputRef}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.search__Input}
        placeholder="Поиск..."
      />
      {search && (
        <svg
          onClick={onClearInput}
          className={styles.search__ClearIcon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      )}
    </div>
  );
};
export default Search;
