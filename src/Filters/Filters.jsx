import { useContext, useMemo } from 'react';
import { StoreContext } from '../Store';
import { CHANGE_DATE_FILTER, CHANGE_MODALITY_FILTER } from '../constants';
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
          {modality || '-'}
        </option>
      )),
    [modalityOptions]
  );

  const dateSelectOptions = useMemo(
    () =>
      dateOptions.map((date) => (
        <option key={`date-${date}`} value={date}>
          {date || '-'}
        </option>
      )),
    [dateOptions]
  );

  return (
    <div className="filter-container">
      <div className="filter-item">
        <label htmlFor="modalityFilter">
          Filter by Modality:
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
          Filter by Date:
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
