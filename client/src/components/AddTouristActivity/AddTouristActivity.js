import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validate } from "../../helpers/validate";
import {
  addTouristActivity,
  resetForm,
  setForm,
} from "../../redux/ducks/tourist_activity";
import Message from "../Message/Message";
const style = require("./AddTouristActivity.module.css");

const AddTouristActivity = () => {
  const { initialForm } = useSelector((state) => state.activities);
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(initialForm);
  const [error, setError] = useState("");

  const handleFormValues = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { success, msg } = validate(formValues);
    if (success) {
      setError("");
      // Add activity
      dispatch(setForm(formValues));
      dispatch(addTouristActivity(formValues));
      setFormValues(initialForm);
    } else {
      setError(msg);
    }
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  useEffect(() => {
    const { name, difficulty, duration, season } = formValues;
    if (!name && !difficulty && !duration && !season) {
      dispatch(resetForm());
    }
  }, [formValues, dispatch]);

  return (
    <>
      <div className={style.contenedor}>
        <h2 className={style.title}>Agrega actividades turisticas</h2>

        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.box}>
            <label htmlFor="name" className={style.label}>
              Nombre:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleFormValues}
              value={formValues.name}
              className={style.input}
              autoComplete="off"
            />
          </div>
          <div className={style.box}>
            <label htmlFor="difficulty" className={style.label}>
              Dificultad:
            </label>
            <select
              name="difficulty"
              id="difficulty"
              onChange={handleFormValues}
              value={formValues.difficulty}
              className={style.select}
            >
              <option value="">Seleccione una dificultad</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <div className={style.box}>
            <label htmlFor="duration" className={style.label}>
              Duración:
            </label>
            <select
              name="duration"
              id="duration"
              onChange={handleFormValues}
              value={formValues.duration}
              className={style.select}
            >
              <option value="">Seleccione la duracion</option>
              <option value="1 hora">1 hora</option>
              <option value="2 hora">2 hora</option>
              <option value="3 hora">3 hora</option>
              <option value="4 hora">4 hora</option>
              <option value="5 hora">5 hora</option>
            </select>
          </div>
          <div className={style.box}>
            <label htmlFor="season" className={style.label}>
              Temporada:
            </label>
            <select
              name="season"
              id="season"
              onChange={handleFormValues}
              value={formValues.season}
              className={style.select}
            >
              <option value="">Seleccione la temporada</option>
              <option value="Verano">Verano</option>
              <option value="Otoño">Otoño</option>
              <option value="Invierno">Invierno</option>
              <option value="Primavera">Primavera</option>
            </select>
          </div>
          <input type="submit" value="Agregar" className={style.button} />
        </form>
      </div>
      {error && <Message success={false} msg={error} />}
    </>
  );
};

export default AddTouristActivity;
