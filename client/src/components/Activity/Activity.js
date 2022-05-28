import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchAllCountries } from "../../redux/ducks/countries";
import { deleteActivityById } from "../../redux/ducks/tourist_activity";
const style = require("./Activity.module.css");

const Activity = (props) => {
  const { id: idParams } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { name, difficulty, duration, season, id, activityCountries } = props;

  const handleDelete = () => {
    const yes = window.confirm(
      `¿Estas seguro que desea eliminar la actividad ${name}?`
    );
    if (yes) dispatch(deleteActivityById(id));
  };

  return (
    <div className={style.card}>
      <h3 className={style.title}>{name}</h3>
      <p className={style.p}>
        Dificultad: <span className={style.span}>{difficulty}</span>
      </p>
      <p className={style.p}>
        Duración: <span className={style.span}>{duration}</span>
      </p>
      <p className={style.p}>
        Temporada: <span className={style.span}>{season}</span>
      </p>
      {location.pathname.includes("paises") ? null : idParams ? (
        <>
          <p className={style.p}>
            La actividad se realiza en{" "}
            <span className={style.span}>
              {activityCountries && activityCountries.length}{" "}
            </span>
            paises
          </p>
          {activityCountries && activityCountries.length > 0 && (
            <ul className={style.ul}>
              {activityCountries.map((country) => (
                <li className={style.li} key={country.id}>
                  {country.name}
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <>
          <NavLink
            to={`/actividades/${id}`}
            onClick={() => dispatch(fetchAllCountries())}
            className={style.button}
          >
            Agregar paises
          </NavLink>
          <div className={style.delete} onClick={handleDelete}>
            <span className="material-symbols-outlined">delete</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Activity;
