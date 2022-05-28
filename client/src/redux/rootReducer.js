import { combineReducers } from "redux";
import countriesReducer from "./ducks/countries";
import touristActivityReducer from "./ducks/tourist_activity";

const rootReducer = combineReducers({
  countries: countriesReducer,
  activities: touristActivityReducer,
});

export { rootReducer };
