import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

const Pagination = ({ value, setCurrent }) => {
  return (
    <div className={styles.pagination}>
      <ReactPaginate
        className={styles.pagination__Paginate}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => setCurrent(e.selected + 1)}
        pageRangeDisplayed={8}
        pageCount={3}
        forcePage={value - 1}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
