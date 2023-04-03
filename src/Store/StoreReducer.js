import {
  CHANGE_MODALITY_FILTER,
  CHANGE_DATE_FILTER,
  SET_DATA,
  NO_FILTER,
} from '../constants';

export const storeInitialState = {
  modalityFilter: NO_FILTER,
  dateFilter: NO_FILTER,
  modalityOptions: [NO_FILTER],
  dateOptions: [NO_FILTER],
  data: null,
  filteredData: [],
};

// Filter by dates first, then within the matched dates filter the images within
const filterData = (data, date, modality) => {
  if (!data) {
    return [];
  }

  // Skip any checks where the filter is not set
  const dateMatchedExams =
    date === NO_FILTER ? data : data.filter((exam) => exam.date === date);

  const modalityMatchedImages =
    modality === NO_FILTER
      ? dateMatchedExams
      : dateMatchedExams.map((exam) => ({
          ...exam,
          images: exam.images.filter(
            (imageData) => imageData.modality === modality
          ),
        }));

  return modalityMatchedImages;
};

// Assumption: Each date is unique - multiple examinations in one day would be grouped in one object
const getDateOptions = (data) =>
  data ? [NO_FILTER, ...data.map((exam) => exam.date).sort()] : [NO_FILTER];

const getModalityOptions = (data) => {
  if (!data) {
    return [NO_FILTER];
  }
  const uniqueModalities = new Set();

  data.forEach((exam) => {
    exam.images.forEach((imageData) =>
      uniqueModalities.add(imageData.modality)
    );
  });

  return [NO_FILTER, ...Array.from(uniqueModalities).sort()];
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
        dateOptions: getDateOptions(examinations),
        modalityOptions: getModalityOptions(examinations),
      };
    }
    default:
      return state;
  }
};
