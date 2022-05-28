import React from "react";
import { useSelector } from "react-redux";
import Country from "../Country/Country";
import Pagination from "../Pagination/Pagination";
import Spinner from "../Spinner/Spinner";
import style from "./Countries.module.css";

const Countries = ({ modeAddCountriesToActivity }) => {
  const { countries, loading } = useSelector((state) => state.countries);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : countries && countries.length === 0 ? (
        <p className={style.not_found}>No se encontraron resultados</p>
      ) : (
        <div className={style.countries}>
          {countries &&
            countries.length > 0 &&
            countries.map((country) => (
              <Country
                key={country.id}
                {...country}
                modeAddCountriesToActivity={modeAddCountriesToActivity}
              />
            ))}

          {countries && countries.length > 8 && <Pagination />}
        </div>
      )}
    </>
  );
};

export default Countries;
