import { useContext, useEffect } from 'react';
import { StoreContext } from './Store';
import './App.css';
import data from './examinations.json';
import { SET_DATA } from './constants';
import { Filters } from './Filters/Filters';
import { Examination } from './Examination';

const App = () => {
  const [state, dispatch] = useContext(StoreContext);
  const { filteredData } = state;

  // While this is just local data, this can then be replaced with an endpoint query
  // to get the data from a different source.
  useEffect(() => {
    dispatch({
      type: SET_DATA,
      payload: {
        data,
      },
    });
  }, [data]);

  return (
    <div className="App">
      <h1>Oculo FE Test</h1>
      <Filters />
      {filteredData.length ? (
        filteredData.map((exam) => (
          <Examination key={exam.date} examinationData={exam} />
        ))
      ) : (
        <div>No images found.</div>
      )}
    </div>
  );
};

export default App;
