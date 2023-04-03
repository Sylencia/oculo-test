import { useContext, useEffect } from 'react';
import { StoreContext } from './Store';
import './App.css';
import data from './examinations.json';
import { SET_DATA } from './constants';
import { Filters } from './Filters/Filters';

function App() {
  const [, dispatch] = useContext(StoreContext);

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
      <Filters />
    </div>
  );
}

export default App;
