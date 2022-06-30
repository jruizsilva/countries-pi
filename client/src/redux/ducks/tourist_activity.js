import axios from "axios";
const ADD_TOURIST_ACTIVITY = "tourist_activity/ADD_TOURIST_ACTIVITY";
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

const initialState = {
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

      await axios.post("/activity", body);
      dispatch({ type: ADD_TOURIST_ACTIVITY });
      dispatch(setSuccess("Actividad agregada correctamente"));
      setTimeout(() => dispatch(resetSuccess()), 3000);
      dispatch(getAllTouristActivities());
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllTouristActivities = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/activity");
      dispatch({ type: GET_ALL_TOURIST_ACTIVITIES, payload: res.data });
    } catch (error) {
      // console.log(error);
    }
  };
};

export const getActivityById = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/activity/${id}`);
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

export const addCountryToActivity = (countryId, activityId) => {
  return async (dispatch) => {
    try {
      await axios.put(`/activity/${activityId}/countries`, {
        countryId,
      });
      dispatch({ type: ADD_COUNTRY_TO_ACTIVITY });
      dispatch(setSuccess("Pais agregado correctamente"));
      setTimeout(() => dispatch(resetSuccess()), 3000);
      dispatch(getCountriesByActivity(activityId));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCountriesByActivity = (activityId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/activity/${activityId}/countries`);
      dispatch({ type: GET_COUNTRIES_BY_ACTIVITY, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteActivityById = (activityId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`/activity/${activityId}`);
      console.log(res);
      dispatch({ type: DELETE_ACTIVITY_BY_ID });
      dispatch(getAllTouristActivities());
      dispatch(setSuccess("Eliminado correctamente"));
      setTimeout(() => dispatch(resetSuccess()), 3000);
    } catch (error) {
      console.log(error);
    }
  };
};

export const setSuccess = (msg) => {
  return { type: SET_SUCCESS, payload: msg };
};

export const resetSuccess = () => {
  return { type: RESET_SUCCESS };
};

export default touristActivityReducer;
