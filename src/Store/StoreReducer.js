import {
  CHANGE_MODALITY_FILTER,
  CHANGE_DATE_FILTER,
  SET_DATA,
} from '../constants';

export const storeInitialState = {
  modalityFilter: null,
  dateFilter: null,
  data: null,
  filteredData: null,
};

// Filter by dates first, then within the matched dates filter the images within
const filterData = (data, date, modality) => {
  if (!data) {
    return null;
  }

  // Skip any checks where the filter is not set
  const dateMatchedExams = !date
    ? data
    : data.filter((exam) => exam.date === date);

  console.log(dateMatchedExams, date, modality);

  const modalityMatchedImages = !modality
    ? dateMatchedExams
    : dateMatchedExams.map((exam) => ({
        ...exam,
        images: exam.images.filter(
          (imageData) => imageData.modality === modality
        ),
      }));

  return modalityMatchedImages;
};

export const storeReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_MODALITY_FILTER: {
      return {
        ...state,
        modalityFilter: action.payload.value,
        filteredData: filterData(
          state.data,
          state.dateFilter,
          action.payload.value
        ),
      };
    }
    case CHANGE_DATE_FILTER: {
      return {
        ...state,
        dateFilter: action.payload.value,
        filteredData: filterData(
          state.data,
          action.payload.value,
          state.modalityFilter
        ),
      };
    }
    case SET_DATA: {
      // Only save the examinations array for easier filtering
      const {
        data: { examinations },
      } = action.payload;

      return {
        ...state,
        data: examinations,
        filteredData: filterData(
          examinations,
          state.dateFilter,
          state.modalityFilter
        ),
      };
    }
    default:
      return state;
  }
};
