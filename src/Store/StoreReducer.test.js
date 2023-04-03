import {
  CHANGE_MODALITY_FILTER,
  CHANGE_DATE_FILTER,
  SET_DATA,
} from '../constants';
import data from '../examinations.json';
import { storeInitialState, storeReducer } from './StoreReducer';

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

it('adds data correctly', async () => {
  const newState = storeReducer(storeInitialState, {
    type: SET_DATA,
    payload: {
      data,
    },
  });

  expect(JSON.stringify(newState.data)).toEqual(JSON.stringify(data));
});
