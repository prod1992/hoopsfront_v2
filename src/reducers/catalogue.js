import {
  BULK_EDIT,
  COLLECT_SELECTED_IDS,
  SET_PRODUCTS,
  SELECT_ALL_PRODUCTS,
  FILTER_SHOW,
  SET_FILTERED_ARRAY,
  RESET_SELECTED_IDS,
  SET_SUB_CATEGORY_LIST,
  SET_CATEGORY_LIST,
  SET_BRAND_LIST,
  SET_VENDOR_LIST
} from "../actions/action-types";

const initialState = {
  products: {},
  vendors: {},
  categories: {},
  subcategories: {},
  brands: {},
  bulkEdit: false,
  selectedIds: [],
  filterIsOpened: false,
  selectedAll: false
};

const catalogueReducer = (state = initialState, action) => {
  switch (action.type) {
    case BULK_EDIT:
      return {
        ...state,
        bulkEdit: action.payload
      };
    case COLLECT_SELECTED_IDS:
      if (state.selectedIds.includes(action.payload)) {
        const filteredIds = state.selectedIds.filter(
          value => value !== action.payload
        );
        return {
          ...state,
          selectedIds: [...filteredIds],
          selectedAll: false
        };
      }
      return {
        ...state,
        selectedIds: [...state.selectedIds, action.payload]
      };
    case SET_FILTERED_ARRAY:
      return {
        ...state,
        products: { data: action.payload }
      };
    case SELECT_ALL_PRODUCTS:
      let selectedIdsUpdated = state.products.data.map(item => item.id);
      return {
        ...state,
        selectedAll: action.payload,
        selectedIds: action.payload ? selectedIdsUpdated : []
      };
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    case SET_VENDOR_LIST:
      return {
        ...state,
        vendors: action.payload
      };
    case SET_BRAND_LIST:
      return {
        ...state,
        brands: action.payload
      };
    case SET_CATEGORY_LIST:
      return {
        ...state,
        categories: action.payload
      };
    case SET_SUB_CATEGORY_LIST:
      return {
        ...state,
        subcategories: action.payload
      };
    case FILTER_SHOW:
      return {
        ...state,
        filterIsOpened: action.payload
      };
    case RESET_SELECTED_IDS:
      return {
        ...state,
        selectedIds: action.payload
      };
    default:
      return state;
  }
};

export default catalogueReducer;
