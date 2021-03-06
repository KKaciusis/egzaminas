import * as React from 'react';

function PlaneForTable(props) {
    var myDate = props.data.arrival_time;
    var date = new Date(myDate).toISOString().substring(0, 10);
    const time = new Date(myDate).toLocaleTimeString('en', { timeStyle: 'short', hour12: false, timeZone: 'UTC' });

    return (
        <tr>
            <td>{props.data.id}</td>
            <td>{props.data.from_town}</td>
            <td>{date} {time}</td>
            <td>{props.data.is_late === 1 ? "Late" : "On Time"}</td>
            <td>{props.data.airline}</td>
            <td>
                <button type="button" className="btn btn-outline-danger" onClick={() => props.delete(props.data.id)}>Delete</button>
                <button type="button" className="btn btn-warning" onClick={() => props.showModal(props.data.id)}>Edit</button>
            </td>
        </tr>
    )
}
export default PlaneForTable;