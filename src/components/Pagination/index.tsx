import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

type PaginationProps = {
  value: number;
  setCurrent: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ value, setCurrent }) => {
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
      />
    </div>
  );
};

export default Pagination;
