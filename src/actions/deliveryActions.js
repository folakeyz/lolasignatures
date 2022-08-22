import axios from "axios";
import {
  GET_DELIVERY_SUCCESS,
  GET_DELIVERY_REQUEST,
  GET_DELIVERY_FAIL,
} from "../constants/deliveryConstants";

export const getCountries = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_DELIVERY_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`/api/delivery`, config);

    dispatch({
      type: GET_DELIVERY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: GET_DELIVERY_FAIL,
      payload: message,
    });
  }
};
