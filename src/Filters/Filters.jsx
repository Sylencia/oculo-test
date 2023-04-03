import { useContext, useMemo } from 'react';
import { StoreContext } from '../Store';
import {
  CHANGE_DATE_FILTER,
  CHANGE_MODALITY_FILTER,
  NO_FILTER,
} from '../constants';
import './Filters.css';

export const Filters = () => {
  const [state, dispatch] = useContext(StoreContext);
  const { modalityFilter, dateFilter, modalityOptions, dateOptions } = state;

  const handleFilterChange = (e, type) => {
    const dispatchType =
      {
        date: CHANGE_DATE_FILTER,
        modality: CHANGE_MODALITY_FILTER,
      }[type] || '';

    if (dispatchType) {
      dispatch({
        type: dispatchType,
        payload: {
          value: e.target.value,
        },
      });
    }
  };

  const modalitySelectOptions = useMemo(
    () =>
      modalityOptions.map((modality) => (
        <option key={`modality-${modality}`} value={modality}>
          {modality === NO_FILTER ? '-' : modality}
        </option>
      )),
    [modalityOptions]
  );

  const dateSelectOptions = useMemo(
    () =>
      dateOptions.map((date) => (
        <option key={`date-${date}`} value={date}>
          {date === NO_FILTER ? '-' : date}
        </option>
      )),
    [dateOptions]
  );

  return (
    <div className="filter-container">
      <div className="filter-item">
        <label htmlFor="modalityFilter">
          <span className="filter-title">Modality:</span>
          <select
            id="modalityFilter"
            value={modalityFilter}
            onChange={(e) => handleFilterChange(e, 'modality')}
          >
            {modalitySelectOptions}
          </select>
        </label>
      </div>
      <div className="filter-item">
        <label htmlFor="dateFilter">
          <span className="filter-title">Date:</span>
          <select
            id="dateFilter"
            value={dateFilter}
            onChange={(e) => handleFilterChange(e, 'date')}
          >
            {dateSelectOptions}
          </select>
        </label>
      </div>
    </div>
  );
};
