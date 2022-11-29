import React from "react";
import styles from "./notFound.module.scss";

export const NotFound: React.FC = () => {
  return (
    <div className={styles.root}>
      <div>
        <span>😕</span>
        <h1>Cтраница не найдена</h1>
        <h2>К сожалению такой страницы на нашем сайте не существует</h2>
      </div>
    </div>
  );
};

// export default NotFound;
