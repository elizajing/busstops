import './BussItem.css';

function BussItem({ bussLineName, stopNames }) {
    if(stopNames.length === 0) {
        return (
            <div class='BussItem'>
                <p class='row'>{bussLineName}</p>
                <label>
                    <select>
                        <option>No bus stops could be mapped 😭</option>
                    </select>
                </label>
            </div>
        )
    }
    return (
        <div class='BussItem'>
            <p class='row'>{bussLineName}</p>
            <label>
                <select>
                    {
                        stopNames.map((name) => (
                            <option>{name}</option>
                        ))
                    }
                </select>
            </label>
        </div>
    )
}

export default BussItem;
