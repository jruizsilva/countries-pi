import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getActivityById,
  getCountriesByActivity,
  modeAddCountriesToActivity,
} from "../../redux/ducks/tourist_activity";
import Activity from "../Activity/Activity";
import Main from "../Main/Main";
const style = require("./ActivityPage.module.css");

const ActivityPage = () => {
  const { id } = useParams();
  const { activity, activityCountries } = useSelector(
    (state) => state.activities
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;
    dispatch(getActivityById(id));
    dispatch(getCountriesByActivity(id));
    dispatch(modeAddCountriesToActivity(id));
  }, [id, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className={style.contenedor}>
        <Activity {...activity} activityCountries={activityCountries} />
      </div>
      {id && <Main />}
    </>
  );
};

export default ActivityPage;
