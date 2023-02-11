import { useState, useEffect, useRef } from 'react';
import './App.css';
import BussItem from './BussItem';
import fetchData from './api.js';
import { countData, sortData, mapStopNames } from './helpers.js';
import testDataBusStops from './busstopsPerLine.json';
import testDataBusStopNames from './StopNames.json';

function App() {
  const [bussStopList, setBusStopList] = useState([]);
  const [busStopNamePairList, setBusStopNamePairList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const url = 'https://api.sl.se/api2/LineData.json?model=JourneyPointOnLine&key=821481762ccf4cedae33f512bd0f2d48';
  const dataFetchedRef = useRef(false);
  let countedData = [];
  let sortedData = [];
  let stopNamePair = [];

  // useEffect(()=> {
  //   fetchData(url)
  //   .then((result)=> {
  //     setBusStopList(result.ResponseData.Result);
  //   })
  //   .catch((error)=> {
  //     setError(true);
  //   })
  //   .finally(()=>{
  //     setLoading(false);
  //   })
  // },[])

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    countedData = countData(testDataBusStops.ResponseData.Result);

    sortedData = sortData(countedData);

    stopNamePair = mapStopNames(sortedData, testDataBusStops.ResponseData.Result, testDataBusStopNames.ResponseData.Result)

    setBusStopNamePairList(stopNamePair);
  }, [])
  // if(!loading){
  //   sortedData = sortData(bussStopList);
  // }

  return (
    <div class='App'>
      <h1>Busslinjer och Hållplatser</h1>
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
