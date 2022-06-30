import axios from "axios";
// fetchAllCountries
const FETCH_ALL_COUNTRIES_REQUEST = "countries/FETCH_ALL_COUNTRIES_REQUEST";
const FETCH_ALL_COUNTRIES_SUCCESS = "countries/FETCH_ALL_COUNTRIES_SUCCESS";
const FETCH_ALL_COUNTRIES_FAILURE = "countries/FETCH_ALL_COUNTRIES_FAILURE";

// fetchCountryByName
const FETCH_COUNTRY_BY_NAME_REQUEST = "countries/FETCH_COUNTRY_BY_NAME_REQUEST";
const FETCH_COUNTRY_BY_NAME_SUCCESS = "countries/FETCH_COUNTRY_BY_NAME_SUCCESS";
const FETCH_COUNTRY_BY_NAME_FAILURE = "countries/FETCH_COUNTRY_BY_NAME_FAILURE";

const FILTER_COUNTRIES = "countries/FILTER_COUNTRIES";
const SET_FORM = "countries/SET_FORM";
const RESET_FORM = "countries/RESET_FORM";
const NEXT_PAGE = "countries/NEXT_PAGE";
const PREV_PAGE = "countries/PREV_PAGE";
const RESET_PAGE = "countries/RESET_PAGE";
const GET_COUNTRY_BY_ID = "countries/GET_COUNTRY_BY_ID";
const GET_ACTIVITIES_BY_COUNTRY = "countries/GET_ACTIVITIES_BY_COUNTRY";

const initialForm = {
  continent: "",
  tourist_activity: "",
  sort: {
    default: "default",
    population: "",
    alphabet: "",
  },
};

const initialState = {
  loading: false,
  countries: [],
  error: "",
  country: undefined,
  countryActivities: undefined,
  initialForm,
  form: initialForm,
  page: 0,
};

const countriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_COUNTRIES_REQUEST:
      return { ...state, loading: true };
    case FETCH_ALL_COUNTRIES_SUCCESS:
      return { ...state, countries: action.payload, loading: false };
    case FETCH_ALL_COUNTRIES_FAILURE:
      return { ...state, error: action.payload, loading: false };

    case FETCH_COUNTRY_BY_NAME_REQUEST:
      return { ...state, loading: true };
    case FETCH_COUNTRY_BY_NAME_SUCCESS:
      return { ...state, countries: action.payload, loading: false };
    case FETCH_COUNTRY_BY_NAME_FAILURE:
      return { ...state, error: action.payload, loading: false };

    case FILTER_COUNTRIES:
      return { ...state, countries: action.payload };
    case SET_FORM:
      return { ...state, form: action.payload };
    case RESET_FORM:
      return { ...state, form: action.payload };
    case NEXT_PAGE:
      return { ...state, page: action.payload };
    case PREV_PAGE:
      return { ...state, page: action.payload };
    case RESET_PAGE:
      return { ...state, page: 0 };
    case GET_COUNTRY_BY_ID:
      return { ...state, country: action.payload };
    case GET_ACTIVITIES_BY_COUNTRY:
      return { ...state, countryActivities: action.payload };

    default: {
      return state;
    }
  }
};

export const fetchAllCountries = (formValues = initialForm, page) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ALL_COUNTRIES_REQUEST });
    const { continent, tourist_activity, sort } = formValues;

    if (!page) dispatch(resetPage());

    let URL;
    if (!continent && !tourist_activity && !sort.alphabet && !sort.population) {
      if (page > 0) {
        URL = `/countries?page=${page}`;
      } else {
        URL = `/countries`;
      }
    }
    if (sort.population) {
      if (page > 0) {
        URL = `/countries?sort=population-${sort.population}page=${page}`;
      } else {
        URL = `/countries?sort=population-${sort.population}`;
      }
    }
    if (sort.alphabet) {
      if (page > 0) {
        URL = `/countries?sort=alfhabet-${sort.alphabet}page=${page}`;
      } else {
        URL = `/countries?sort=alfhabet-${sort.alphabet}`;
      }
    }
    if (continent) {
      URL = `/countries/continent/${continent}`;
      if (sort.population) {
        if (page > 0) {
          URL += `?sort=population-${sort.population}page=${page}`;
        } else {
          URL += `?sort=population-${sort.population}`;
        }
      }
      if (sort.alphabet) {
        if (page > 0) {
          URL += `?sort=alphabet-${sort.alphabet}page=${page}`;
        } else {
          URL += `?sort=alfhabet-${sort.alphabet}`;
        }
      }
      if (page > 0 && !sort.population && !sort.alphabet) {
        URL += `?page=${page}`;
      }
    }
    if (tourist_activity) {
      URL = `activity/${tourist_activity}/countries`;

      if (sort.population) {
        if (page > 0) {
          URL += `?sort=population-${sort.population}page=${page}`;
        } else {
          URL += `?sort=population-${sort.population}`;
        }
      }
      if (sort.alphabet) {
        if (page > 0) {
          URL += `?sort=alphabet-${sort.alphabet}page=${page}`;
        } else {
          URL += `?sort=alfhabet-${sort.alphabet}`;
        }
      }
      if (page > 0 && !sort.population && !sort.alphabet) {
        URL += `?page=${page}`;
      }
      if (continent) {
        if (sort.alphabet || sort.population || sort.page) {
          URL += `continent=${continent}`;
        } else {
          URL += `?continent=${continent}`;
        }
      }
    }

    try {
      const res = await axios.get(URL);
      dispatch({ type: FETCH_ALL_COUNTRIES_SUCCESS, payload: res.data });
    } catch (error) {
      // console.log(error);
      // console.log(error.message);
      dispatch({ type: FETCH_ALL_COUNTRIES_FAILURE, payload: error.message });
    }
  };
};

export const fetchCountryByName = (countryName) => {
  const URL = `/countries?name=${countryName}`;
  return async (dispatch) => {
    dispatch({ type: FETCH_COUNTRY_BY_NAME_REQUEST });
    dispatch(resetForm(initialForm, true));
    try {
      const res = await axios.get(URL);
      dispatch({ type: FETCH_COUNTRY_BY_NAME_SUCCESS, payload: res.data });
    } catch (error) {
      // console.log(error);
      dispatch({ type: FETCH_COUNTRY_BY_NAME_FAILURE, payload: error.message });
    }
  };
};

export const getCountryById = (id) => {
  return async (dispatch) => {
    const res = await axios.get(`/countries/${id}`);
    dispatch({ type: GET_COUNTRY_BY_ID, payload: res.data });
  };
};

export const getActivitiesByCountry = (countryId) => {
  return async (dispatch) => {
    const res = await axios.get(`/countries/${countryId}/activities`);
    dispatch({ type: GET_ACTIVITIES_BY_COUNTRY, payload: res.data });
  };
};

export const setForm = (form) => {
  return { type: SET_FORM, payload: form };
};

export const resetForm = (initialForm, fetching) => {
  return (dispatch) => {
    dispatch({ type: RESET_FORM, payload: initialForm });
    if (!fetching) {
      dispatch(fetchAllCountries());
    }
  };
};

export const resetPage = () => {
  return { type: RESET_PAGE };
};

export const nextPage = (form, page) => {
  return async (dispatch) => {
    dispatch({ type: NEXT_PAGE, payload: page + 1 });
    dispatch(fetchAllCountries(form, page + 1));
  };
};
export const prevPage = (form, page) => {
  return async (dispatch) => {
    dispatch({ type: PREV_PAGE, payload: page - 1 });
    dispatch(fetchAllCountries(form, page - 1));
  };
};

export default countriesReducer;
