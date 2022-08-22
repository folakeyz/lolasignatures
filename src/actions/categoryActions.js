import axios from "axios";
import {
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_FAIL,
  GET_CAT_PRODUCT_SUCCESS,
  GET_CAT_PRODUCT_REQUEST,
  GET_CAT_PRODUCT_FAIL,
} from "../constants/categoryConstants";

export const getCat = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_CATEGORY_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`/api/category`, config);

    dispatch({
      type: GET_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: GET_CATEGORY_FAIL,
      payload: message,
    });
  }
};

export const getCatProduct =
  (keyword = "", pageNumber = "", pageSize = "", id) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_CAT_PRODUCT_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        `/api/category/product/${id}?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
        config
      );

      dispatch({
        type: GET_CAT_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: GET_CAT_PRODUCT_FAIL,
        payload: message,
      });
    }
  };
