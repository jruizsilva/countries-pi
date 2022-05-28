import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getActivitiesByCountry,
  getCountryById,
} from "../../redux/ducks/countries";
import Activity from "../Activity/Activity";
const style = require("./CountryPage.module.css");

const CountryPage = () => {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const { country, countryActivities } = useSelector(
    (state) => state.countries
  );

  useEffect(() => {
    dispatch(getCountryById(id));
    dispatch(getActivitiesByCountry(id));
  }, [id, dispatch]);

  return (
    <div className={style.contenedor}>
      <h3 className={style.title}>{country?.name}</h3>
      <div className={style.card}>
        <img
          src={country?.flag_image}
          alt={country?.name}
          className={style.img}
        />
        <p className={style.p}>Codigo: {country?.flag}</p>
        <p className={style.p}>Continente: {country?.continent}</p>
        <p className={style.p}>Capital: {country?.capital}</p>
        <p className={style.p}>Subregion: {country?.subregion}</p>
        <p className={style.p}>Area: {country?.area} km²</p>
        <p className={style.p}>Población: {country?.population}</p>
      </div>

      <h3 className={style.title}>Actividades turisticas que realiza</h3>
      {countryActivities && countryActivities.length === 0 && (
        <p className={style.not_found}>No se encontraron actividades</p>
      )}
      {countryActivities && countryActivities.length > 0 && (
        <div className={style.actividades}>
          {countryActivities.map((activity) => (
            <Activity key={activity.id} {...activity} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryPage;
