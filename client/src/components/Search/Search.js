import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountryByName, resetForm } from "../../redux/ducks/countries";
import Message from "../Message/Message";
import style from "./Search.module.css";

const initialInputValue = "";

const Search = () => {
  const dispatch = useDispatch();
  const { initialForm } = useSelector((state) => state.countries);
  const [input, setInput] = useState(initialInputValue);
  const [error, setError] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.length < 3) {
      console.log("Ingrese minimo 3 caracteres");
      setError("Ingrese minimo 3 caracteres");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      dispatch(fetchCountryByName(input));
      setInput(initialInputValue);
    }
  };

  return (
    <>
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          className={style.input}
          type="search"
          placeholder="Buscar país"
          value={input}
          onChange={handleInput}
        />
        <input className={style.button} type="submit" value="Buscar" />
        <input
          className={style.button}
          type="button"
          value="Reset"
          onClick={() => dispatch(resetForm(initialForm))}
        />
      </form>
      {error && <Message success={false} msg={error} />}
    </>
  );
};

export default Search;
