import { useContext, useEffect } from 'react';
import { StoreContext } from './Store/StoreProvider';
import './App.css';
import data from './examinations.json';
import { SET_DATA } from './constants';

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
      <header className="App-header">
        <img src="/images/20190401_oct_left.jpg" alt="test" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
