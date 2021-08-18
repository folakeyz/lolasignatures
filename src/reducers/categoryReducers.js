import {
  GET_CATEGORY_FAIL,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CAT_PRODUCT_FAIL,
  GET_CAT_PRODUCT_REQUEST,
  GET_CAT_PRODUCT_SUCCESS,
} from "../constants/categoryConstants";

export const getCategoryReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case GET_CATEGORY_REQUEST:
      return {
        loading: true,
      };
    case GET_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: true,
        categories: action.payload.category,
      };
    case GET_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getCatProductReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_CAT_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case GET_CAT_PRODUCT_SUCCESS:
      return {
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case GET_CAT_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
