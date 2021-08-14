export const initialState = {
  countries: [],
  selected_view: "cases",
  view_info: null,
  map_info: null,
  selected_country: "worldwide",
  map_options: {
    center: [51.505, -0.09],
    zoom: 2,
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_COUNTRIES":
      return {
        ...state,
        countries: action.countries,
      };
    case "SET_VIEW":
      return {
        ...state,
        selected_view: action.selected_view,
      };
    case "SET_COUNTRY_VIEW":
      return {
        ...state,
        selected_country: action.selected_country,
      };

    case "SET_VIEW_INFO":
      return {
        ...state,
        view_info: action.view_info,
      };
    case "SET_TABLE_INFO":
      return {
        ...state,
        table_info: action.table_info,
      };
    case "SET_MAP_INFO":
      return {
        ...state,
        map_info: action.map_info,
      };
    case "SET_MAP_OPTIONS":
      return {
        ...state,
        map_options: action.map_options,
      };
    default:
      return state;
  }
};
