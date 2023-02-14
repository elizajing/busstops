function countData(data) {
    const stopsPerLine = data.map((item) => item.LineNumber).reduce((acc, val) => {
        acc[val] = ++acc[val] || 1;

        return acc;
    }, {})

    return stopsPerLine;
}

function sortData(dataDict) {
    let items = Object.keys(dataDict).map((key) => {
        return [key, dataDict[key]];
    });

    items.sort((first, second) => {
        return second[1] - first[1];
    });

    return items.slice(0, 10);
}

function mapStopNames(sortedData, lineStopsDict, stopNamesDict) {
    const lineStops = sortedData.reduce((acc, val) => {
        const stopsIndex = lineStopsDict.filter((item) => item.LineNumber === val[0]).map((val) => val.JourneyPatternPointNumber)
        if (stopsIndex) {
            acc.push({
                LineNumber: val[0],
                Stops: stopsIndex
            })
        }
        return acc;
    }, [])

    let stopNames = [];
    let lineStopNames = [];

    lineStops.forEach((val, index) => {
        val.Stops.forEach((subVal, subIndex) => {
            const stopName = stopNamesDict.filter((val) => val.StopPointNumber === subVal).map((line) => line.StopPointName)[0];
            if(stopName !== undefined){
                stopNames.push(stopName)
            }
        })
        if (stopNames) {
            lineStopNames.push([val.LineNumber, stopNames]);
        }
        stopNames = [];

    })
    return lineStopNames;
}
export { countData, sortData, mapStopNames };
