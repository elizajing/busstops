import BussItem from './BussItem.js';

function Busstops({bussStopList}) {
    
    return(
        <div>
            Busses should be shown here
            {bussStopList.map((item)=> (
                <BussItem
                bussName={item.name}
                nbrOfStops={item.nbrOfStops}
                ></BussItem>
            ))}
        </div>
    )
}
export default Busstops;
