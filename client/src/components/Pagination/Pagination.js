import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, prevPage } from "../../redux/ducks/countries";
const style = require("./Pagination.module.css");

const Pagination = () => {
  const dispatch = useDispatch();
  const { form, countries, page } = useSelector((state) => state.countries);

  const handlePrevClick = () => {
    dispatch(prevPage(form, page));
  };
  const handleNextClick = () => {
    dispatch(nextPage(form, page));
  };

  return (
    <div className={style.pagination}>
      {page > 0 && (
        <button className={style.button} onClick={handlePrevClick}>
          Anterior
        </button>
      )}
      {countries && countries.length > 8 && (
        <button className={style.button} onClick={handleNextClick}>
          Siguiente
        </button>
      )}
    </div>
  );
};

export default Pagination;
