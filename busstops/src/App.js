import { useState, useEffect, useRef } from 'react';
import './App.css';
import BussItem from './BussItem';
import { countData, sortData, mapStopNames } from './helpers.js';

function App() {
  const [bussStopList, setBusStopList] = useState([]);
  const [busstopNames, setBusstopNames] = useState([]);
  const [loadingBussStops, setLoadingBusstops] = useState(true);
  const [loadingBusstopNames, setLoadingBusstopNames] = useState(true);
  const [error, setError] = useState(false);
  const urlBusstops = process.env.REACT_APP_BUSSTOPLIST_URL;
  const urlBusstopNames = process.env.REACT_APP_BUSSTOPNAMES_URL;
  const dataFetchedRef = useRef(false);
  const [busStopNamePairList, setBusStopNamePairList] = useState([]);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    const fetchBusstopsData = async () => {
      try {
        const response = await fetch(urlBusstops);
        const json = await response.json();

        setBusStopList(json.ResponseData.Result);
        setLoadingBusstops(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchBusstopsData();

    const fetchBusstopNamesData = async () => {
      try {
        const response = await fetch(urlBusstopNames);
        const json = await response.json();

        setBusstopNames(json.ResponseData.Result);
        setLoadingBusstopNames(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchBusstopNamesData();

  }, [urlBusstops, urlBusstopNames])

  useEffect(() => {
    const countedData = countData(bussStopList);
    const sortedData = sortData(countedData);
    const stopNamePair = mapStopNames(sortedData, bussStopList, busstopNames);
    setBusStopNamePairList(stopNamePair);
  }, [bussStopList, busstopNames])

  let div;
  if (loadingBussStops && loadingBusstopNames) {
    div = <div>Laddar...</div>
  } else if (error) {
    div = <div>Något gick fel, datan kunde inte hämtas :(</div>
  }
  return (
    <div class='App'>
      <h1>Topp 10 SL busslinjer med flest hållplatser 🚌💨🚏</h1>
      <div class='item'>
        <p>Linje</p>
        <p class='middle'>Hållplatser</p>
        <p>Antal hållplaster</p>
      </div>
      <div class='loading'>
        {div}
      </div>
      {busStopNamePairList.map((item) => (
        <BussItem
          bussLineName={item[0]}
          stopNames={item[1]}
          key={item[0]}
        ></BussItem>
      ))
      }
    </div>
  );
}

export default App;
