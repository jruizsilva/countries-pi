import axios from "axios";
const ADD_TOURIST_ACTIVITY = "tourist_activity/ADD_TOURIST_ACTIVITY";
const RESET_FORM = "tourist_activity/RESET_FORM";
const SET_FORM = "tourist_activity/SET_FORM";
const GET_ALL_TOURIST_ACTIVITIES =
  "tourist_activity/GET_ALL_TOURIST_ACTIVITIES";
const GET_ACTIVITY_BY_ID = "tourist_activity/GET_ACTIVITY_BY_ID";
const MODE_ADD_COUNTRIES_TO_ACTIVITY =
  "tourist_activity/MODE_ADD_COUNTRIES_TO_ACTIVITY";
const ADD_COUNTRY_TO_ACTIVITY = "tourist_activity/ADD_COUNTRY_TO_ACTIVITY";
const SET_SUCCESS = "tourist_activity/SET_SUCCESS";
const RESET_SUCCESS = "tourist_activity/RESET_SUCCESS";
const GET_COUNTRIES_BY_ACTIVITY = "tourist_activity/GET_COUNTRIES_BY_ACTIVITY";
const DELETE_ACTIVITY_BY_ID = "tourist_activity/DELETE_ACTIVITY_BY_ID";

const initialForm = {
  name: "",
  difficulty: "",
  duration: "",
  season: "",
};

const initialState = {
  initialForm,
  form: initialForm,
  activities: [],
  activity: {},
  activityCountries: [],
  modeAddCountriesToActivity: false,
  success: "",
};

const touristActivityReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TOURIST_ACTIVITY:
      return state;
    case GET_ALL_TOURIST_ACTIVITIES:
      return { ...state, activities: action.payload };
    case GET_ACTIVITY_BY_ID:
      return { ...state, activity: action.payload };
    case MODE_ADD_COUNTRIES_TO_ACTIVITY:
      return { ...state, modeAddCountriesToActivity: action.payload };
    case ADD_COUNTRY_TO_ACTIVITY:
      return state;
    case SET_SUCCESS:
      return { ...state, success: action.payload };
    case RESET_SUCCESS:
      return { ...state, success: "" };
    case GET_COUNTRIES_BY_ACTIVITY:
      return { ...state, activityCountries: action.payload };
    case DELETE_ACTIVITY_BY_ID:
      return state;
    default:
      return state;
  }
};

export const addTouristActivity = (body) => {
  return async (dispatch) => {
    try {
      // body.difficulty = parseInt(body.difficulty);
      console.log(body);
      const instance = axios.create({
        baseURL: "https://api-restcountries.herokuapp.com",
      });
      await instance.post("/activity", body);
      dispatch({ type: ADD_TOURIST_ACTIVITY });
      dispatch(getAllTouristActivities());
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllTouristActivities = () => {
  return async (dispatch) => {
    try {
      const instance = axios.create({
        baseURL: "https://api-restcountries.herokuapp.com",
      });
      const res = await instance.get("/activity");
      dispatch({ type: GET_ALL_TOURIST_ACTIVITIES, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getActivityById = (id) => {
  return async (dispatch) => {
    try {
      const instance = axios.create({
        baseURL: "https://api-restcountries.herokuapp.com",
      });
      const res = await instance.get(`/activity/${id}`);
      dispatch({ type: GET_ACTIVITY_BY_ID, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const modeAddCountriesToActivity = (id) => {
  return {
    type: MODE_ADD_COUNTRIES_TO_ACTIVITY,
    payload: id ? true : false,
  };
};

export const resetForm = () => {
  return { type: RESET_FORM };
};
export const setForm = (formValues) => {
  return { type: SET_FORM, payload: formValues };
};

export const addCountryToActivity = (countryId, activityId) => {
  return async (dispatch) => {
    try {
      const instance = axios.create({
        baseURL: "https://api-restcountries.herokuapp.com",
      });
      await instance.put(`/activity/${activityId}/countries`, { countryId });
      dispatch({ type: ADD_COUNTRY_TO_ACTIVITY });
      dispatch({ type: SET_SUCCESS, payload: "Agregado correctamente" });
      dispatch(getCountriesByActivity(activityId));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCountriesByActivity = (activityId) => {
  return async (dispatch) => {
    try {
      const instance = axios.create({
        baseURL: "https://api-restcountries.herokuapp.com",
      });
      const res = await instance.get(`/activity/${activityId}/countries`);
      dispatch({ type: GET_COUNTRIES_BY_ACTIVITY, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteActivityById = (activityId) => {
  return async (dispatch) => {
    try {
      const instance = axios.create({
        baseURL: "https://api-restcountries.herokuapp.com",
      });
      const res = await instance.delete(`/activity/${activityId}`);
      console.log(res);
      dispatch({ type: DELETE_ACTIVITY_BY_ID });
      dispatch(getAllTouristActivities());
    } catch (error) {
      console.log(error);
    }
  };
};

export const resetSuccess = () => {
  return { type: RESET_SUCCESS };
};

export default touristActivityReducer;
