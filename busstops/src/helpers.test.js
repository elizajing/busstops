import { countData, sortData, mapStopNames } from "./helpers";
import testDataBusStops from './TestData/busstopsPerLine.json';
import testDataBusStopNames from './TestData/StopNames.json';

test('Should count number of stops for each bus line', ()=>{
    const expected = {
        '1': 3,
        '10': 2,
        '11': 3
    }
    expect(countData(testDataBusStops.ResponseData.Result)).toStrictEqual(expected);
});

test('Should sort counted data to only to top 10 busstops with the most busstops at top', ()=>{
    const dataDict = {
        '1': 3,
        '10': 2,
        '11': 3
    }
    const expected = [
        ['1', 3],
        ['11', 3],
        ['10', 2]
    ]
    expect(sortData(dataDict)).toStrictEqual(expected);
});

test('Should map busstop names for the top 10 bus lines',()=>{
    const busstops = [
        ['1', 3],
        ['11', 3],
        ['10', 2]
    ]
    const expected = [
        ['1', ['S:t Eriksgatan', 'Celsiusgatan', 'Scheelegatan']],
        ['11', ['John Bergs plan', 'Arbetargatan', 'Frihamnsporten']],
        ['10', ['Stadshagsplan', 'John Bergs plan']]
    ]
    expect(mapStopNames(busstops, testDataBusStops.ResponseData.Result, testDataBusStopNames.ResponseData.Result)[0][0]).toEqual('1');
    expect(mapStopNames(busstops, testDataBusStops.ResponseData.Result, testDataBusStopNames.ResponseData.Result)[0][1]).toEqual(['S:t Eriksgatan', 'Celsiusgatan', 'Scheelegatan']);
    expect(mapStopNames(busstops, testDataBusStops.ResponseData.Result, testDataBusStopNames.ResponseData.Result)[1][0]).toEqual('11');
    expect(mapStopNames(busstops, testDataBusStops.ResponseData.Result, testDataBusStopNames.ResponseData.Result)[1][1]).toEqual(['John Bergs plan', 'Arbetargatan', 'Frihamnsporten']);
    expect(mapStopNames(busstops, testDataBusStops.ResponseData.Result, testDataBusStopNames.ResponseData.Result)[2][0]).toEqual('10');
    expect(mapStopNames(busstops, testDataBusStops.ResponseData.Result, testDataBusStopNames.ResponseData.Result)[2][1]).toEqual(['Stadshagsplan', 'John Bergs plan']);
});
