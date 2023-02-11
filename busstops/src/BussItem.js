import './BussItem.css';

function BussItem({ bussLineName, stopNames }) {

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
