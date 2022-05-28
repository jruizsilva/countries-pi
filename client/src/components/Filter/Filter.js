import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCountries, setForm } from "../../redux/ducks/countries";
import style from "./Filter.module.css";

const initialSort = {
  default: "default",
  population: "",
  alphabet: "",
};

const Filter = ({ modeAddCountriesToActivity }) => {
  const dispatch = useDispatch();
  const { initialForm, form } = useSelector((state) => state.countries);
  const { activities } = useSelector((state) => state.activities);
  const [formValues, setFormValues] = useState(form);

  const handleFilterForm = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleSortForm = (e) => {
    const sort = JSON.parse(e.target.value);

    setFormValues({
      ...formValues,
      sort: {
        ...initialSort,
        ...sort,
      },
    });
  };

  useEffect(() => {
    const { continent, tourist_activity, sort } = form;
    if (!continent && !tourist_activity && !sort.population && !sort.alphabet) {
      setFormValues(initialForm);
    }
  }, [form, initialForm]);

  useEffect(() => {
    const { continent, tourist_activity, sort } = formValues;
    if (continent || tourist_activity || sort.population || sort.alphabet) {
      dispatch(setForm(formValues));
      dispatch(fetchAllCountries(formValues));
    }
  }, [formValues, dispatch]);

  return (
    <form className={style.form}>
      <select
        className={style.select}
        name="continent"
        onChange={handleFilterForm}
        value={formValues.continent}
      >
        {/* Africa Asia Americas Oceania Antarctic Europe */}
        <option value="" disabled>
          Seleccione un continente
        </option>
        <option value="Africa">África</option>
        <option value="Americas">América</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europa</option>
        <option value="Oceania">Oceanía</option>
        <option value="Antarctic">Antártida</option>
      </select>

      {!modeAddCountriesToActivity && (
        <select
          className={style.select}
          name="tourist_activity"
          onChange={handleFilterForm}
          value={formValues.tourist_activity}
        >
          <option value="" disabled>
            Seleccione una actividad turistica
          </option>
          {activities &&
            activities.length > 0 &&
            activities.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            ))}
        </select>
      )}

      <select
        className={style.select}
        name="sort"
        onChange={handleSortForm}
        value={formValues.sort.default}
      >
        <option value="default" disabled>
          Ordenar paises por:
        </option>

        <option value={JSON.stringify({ population: "asc" })}>
          Población ▲
        </option>
        <option value={JSON.stringify({ population: "desc" })}>
          Población ▼
        </option>

        <option value={JSON.stringify({ alphabet: "asc" })}>Alfabeto ▲</option>
        <option value={JSON.stringify({ alphabet: "desc" })}>Alfabeto ▼</option>
      </select>
    </form>
  );
};

export default Filter;
