import './BussItem.css';

function BussItem({ bussLineName, stopNames }) {
    if(stopNames.length === 0) {
        return (
            <div class='BussItem'>
                <div class='row'>{bussLineName}</div>
                <label>
                    <select>
                        <option>Inga hållplatser kunde mappas 😭</option>
                    </select>
                </label>
            </div>
        )
    }
    return (
        <div class='BussItem'>
            <div class='row'>{bussLineName}</div>
            <label>
                <select>
                    {
                        stopNames.map((name) => (
                            <option>{name}</option>
                        ))
                    }
                </select>
            </label>
            <div class='row'>{stopNames.length}</div>
        </div>
    )
}

export default BussItem;
