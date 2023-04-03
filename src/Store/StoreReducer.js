import {
  CHANGE_MODALITY_FILTER,
  CHANGE_DATE_FILTER,
  EMPTY_FILTER,
  SET_DATA
} from '../constants';

export const storeInitialState = {
  modalityFilter: EMPTY_FILTER,
  dateFilter: EMPTY_FILTER,
  data: null,
};

export const storeReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_MODALITY_FILTER: {
      return {
        ...state, modalityFilter: action.payload.value,
      };
    }
    case CHANGE_DATE_FILTER: {
      return {
        ...state, dateFilter: action.payload.value,
      };
    }
    case SET_DATA: {
      return {
        ...state, data: action.payload.data,
      };
    }
    default:
      return state;
  }
};