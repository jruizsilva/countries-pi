import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  addCountryToActivity,
  resetSuccess,
} from "../../redux/ducks/tourist_activity";
import Message from "../Message/Message";
import style from "./Country.module.css";

const Country = (props) => {
  const { id: activityId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    name,
    flag_image,
    continent,
    modeAddCountriesToActivity,
    id: countryId,
  } = props;
  const { success } = useSelector((state) => state.activities);

  const handleClick = () => {
    dispatch(addCountryToActivity(countryId, activityId));
    setTimeout(() => {
      dispatch(resetSuccess());
    }, 2000);
  };
  const handleRedirect = () => {
    history.push(`/paises/${countryId}`);
  };

  return (
    <>
      <div className={style.country}>
        <div className={style.image_container}>
          <img className={style.image} src={flag_image} alt={name} />
        </div>
        <div className={style.country_description}>
          <div className={style.country_name}>
            <h3>
              <span>País: </span>
              {name}
            </h3>
          </div>
          <div className={style.country_continent}>
            <h4>
              <span>Continente: </span>
              {continent}
            </h4>
          </div>
          {modeAddCountriesToActivity ? (
            <div>
              <button onClick={handleClick}>Agregar pais</button>
            </div>
          ) : (
            <div>
              <button onClick={handleRedirect}>Ver mas</button>
            </div>
          )}
        </div>
      </div>
      {success && <Message success={true} msg={success} />}
    </>
  );
};

export default Country;
