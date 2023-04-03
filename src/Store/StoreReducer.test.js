import {
  CHANGE_MODALITY_FILTER,
  CHANGE_DATE_FILTER,
  SET_DATA,
} from '../constants';
import data from '../examinations.json';
import { storeInitialState, storeReducer } from './StoreReducer';

const modifiedData = [
  {
    date: '2019-04-01',
    images: [
      {
        eye: 'L',
        modality: 'OCT',
        note: 'Left eye thickness is 2um which is normal',
        thumbnail: '/images/20190401_oct_left.jpg',
      },
      {
        eye: 'R',
        modality: 'OCT',
        note: 'Right eye thickness is 1um which is getting slightly out of normal range.',
        thumbnail: '/images/20190401_oct_right.jpg',
      },
      {
        eye: 'L',
        modality: 'OP',
        note: 'Right eye looks normal',
        thumbnail: '/images/20190401_op_left.jpg',
      },
      {
        eye: 'R',
        modality: 'OP',
        note: 'Left eye looks normal',
        thumbnail: '/images/20190401_op_right.jpg',
      },
    ],
  },
  {
    date: '2019-04-13',
    images: [
      {
        eye: 'L',
        modality: 'OCT',
        note: 'Left eye looks normal',
        thumbnail: '/images/20190413_oct_left.jpg',
      },
      {
        eye: 'R',
        modality: 'OCT',
        note: 'Right eye thickness is 0.5um which is quite a bit less than normal and will require treatment',
        thumbnail: '/images/20190413_oct_right.jpg',
      },
    ],
  },
];

it('changes modality state correctly', async () => {
  const newState = storeReducer(storeInitialState, {
    type: CHANGE_MODALITY_FILTER,
    payload: {
      value: 'OCT',
    },
  });

  expect(newState.modalityFilter).toEqual('OCT');
});

it('changes date state correctly', async () => {
  const newState = storeReducer(storeInitialState, {
    type: CHANGE_DATE_FILTER,
    payload: {
      value: '2019-04-01',
    },
  });

  expect(newState.dateFilter).toEqual('2019-04-01');
});

it('adds data, dateOptions and modalityOptions correctly when data is set', async () => {
  const newState = storeReducer(storeInitialState, {
    type: SET_DATA,
    payload: {
      data,
    },
  });

  expect(newState.data).toEqual(modifiedData);
  expect(newState.modalityOptions).toEqual([null, 'OCT', 'OP']);
  expect(newState.dateOptions).toEqual([null, '2019-04-01', '2019-04-13']);
});

describe('filtering', () => {
  const initialState = {
    modalityFilter: null,
    dateFilter: null,
    data: modifiedData,
    filteredData: null,
  };

  it('filters data correctly when modality filter is applied', () => {
    const newState = storeReducer(initialState, {
      type: CHANGE_MODALITY_FILTER,
      payload: {
        value: 'OCT',
      },
    });

    expect(newState.filteredData).toEqual([
      {
        date: '2019-04-01',
        images: [
          {
            eye: 'L',
            modality: 'OCT',
            note: 'Left eye thickness is 2um which is normal',
            thumbnail: '/images/20190401_oct_left.jpg',
          },
          {
            eye: 'R',
            modality: 'OCT',
            note: 'Right eye thickness is 1um which is getting slightly out of normal range.',
            thumbnail: '/images/20190401_oct_right.jpg',
          },
        ],
      },
      {
        date: '2019-04-13',
        images: [
          {
            eye: 'L',
            modality: 'OCT',
            note: 'Left eye looks normal',
            thumbnail: '/images/20190413_oct_left.jpg',
          },
          {
            eye: 'R',
            modality: 'OCT',
            note: 'Right eye thickness is 0.5um which is quite a bit less than normal and will require treatment',
            thumbnail: '/images/20190413_oct_right.jpg',
          },
        ],
      },
    ]);
  });

  it('filters data correctly when date filter is applied', () => {
    const newState = storeReducer(initialState, {
      type: CHANGE_DATE_FILTER,
      payload: {
        value: '2019-04-13',
      },
    });

    expect(newState.filteredData).toEqual([
      {
        date: '2019-04-13',
        images: [
          {
            eye: 'L',
            modality: 'OCT',
            note: 'Left eye looks normal',
            thumbnail: '/images/20190413_oct_left.jpg',
          },
          {
            eye: 'R',
            modality: 'OCT',
            note: 'Right eye thickness is 0.5um which is quite a bit less than normal and will require treatment',
            thumbnail: '/images/20190413_oct_right.jpg',
          },
        ],
      },
    ]);
  });

  it('filters data correctly when both filters are applied', () => {
    const initialModalityFilter = {
      ...initialState,
      modalityFilter: 'OCT',
    };

    const newState = storeReducer(initialModalityFilter, {
      type: CHANGE_DATE_FILTER,
      payload: {
        value: '2019-04-01',
      },
    });

    expect(newState.filteredData).toEqual([
      {
        date: '2019-04-01',
        images: [
          {
            eye: 'L',
            modality: 'OCT',
            note: 'Left eye thickness is 2um which is normal',
            thumbnail: '/images/20190401_oct_left.jpg',
          },
          {
            eye: 'R',
            modality: 'OCT',
            note: 'Right eye thickness is 1um which is getting slightly out of normal range.',
            thumbnail: '/images/20190401_oct_right.jpg',
          },
        ],
      },
    ]);
  });
});
