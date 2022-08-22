import {
  GET_DELIVERY_FAIL,
  GET_DELIVERY_REQUEST,
  GET_DELIVERY_SUCCESS,
} from "../constants/deliveryConstants";

export const getDeliveryReducer = (state = { countries: [] }, action) => {
  switch (action.type) {
    case GET_DELIVERY_REQUEST:
      return {
        loading: true,
      };
    case GET_DELIVERY_SUCCESS:
      return {
        loading: false,
        success: true,
        countries: action.payload.delivery,
      };
    case GET_DELIVERY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
