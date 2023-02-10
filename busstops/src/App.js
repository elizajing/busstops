import { useState, useEffect, useRef } from 'react';
import './App.css';
import BusstopList from './BusstopList';
import fetchData from './api.js';
import {countData, sortData, mapStopNames} from './helpers.js';
import testDataBusStops from './busstopsPerLine.json';
import testDataBusStopNames from './StopNames.json';

function App() {
  const [bussStopList, setBusStopList] = useState([]);
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
  
  useEffect(()=>{
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    countedData = countData(testDataBusStops.ResponseData.Result);
    console.log('----countedData: ' + JSON.stringify(countedData))
    sortedData = sortData(countedData);
    console.log('----sortedData: ')
    console.log(sortedData)

    //map the stop names
    // stopNamePair = sortedData.map((item)=> [item[0], []]);
    // console.log('---stopNamePair')
    // console.log(stopNamePair);
    // const lineStop = sortedData.reduce((acc, val)=>  {
    //   const stopsIndex = testDataBusStops.ResponseData.Result.map((item)=>{
    //     if(item.LineNumber = val[0])
    //     return item.JourneyPatternPointNumber
    //   })
      
    //   if(stopsIndex) {
    //     acc.push({
    //       LineNumer: val[0],
    //       Stops: stopsIndex
    //     })
    //   }
    //   return acc;
    // }, [])
    stopNamePair = mapStopNames(sortedData, testDataBusStops.ResponseData.Result, testDataBusStopNames.ResponseData.Result)
    

  },[])
  // if(!loading){
  //   sortedData = sortData(bussStopList);
  // }

  return (
    <div className="App">
      <header className="App-header">
      </header>
      {sortedData.map((item)=>(
        <p>{item}</p>
        ))}
      {/* <BusstopList bussStops={bussStopList}></BusstopList> */}
    </div>
  );
}

export default App;
