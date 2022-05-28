import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Main from "../Main/Main";
import Navbar from "../Navbar/Navbar";
import { fetchAllCountries } from "../../redux/ducks/countries";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TouristActivities from "../TouristActivities/TouristActivities";
import { getAllTouristActivities } from "../../redux/ducks/tourist_activity";
import ActivityPage from "../ActivityPage/ActivityPage";
import CountryPage from "../CountryPage/CountryPage";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCountries());
    dispatch(getAllTouristActivities());
  }, [dispatch]);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/actividades" exact component={TouristActivities} />
          <Route path="/actividades/:id" exact component={ActivityPage} />
          <Route path="/paises/:id" exact component={CountryPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
