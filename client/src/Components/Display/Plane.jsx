import React, { useState } from "react";
import Axios from 'axios';

function Plane(props) {
    var myDate = props.data.arrival_time;
    var date = new Date(myDate).toISOString().substring(0, 10);
    const time = new Date(myDate).toLocaleTimeString('en', { timeStyle: 'short', hour12: false, timeZone: 'UTC' });

    const [newTime, setNewTime] = useState('');
    const [newStatus, setNewStatus] = useState('');

    const editTime = (id, newTime) => {
        Axios.put('http://localhost:3005/api/planes/newTime' + id, newTime).then(() => {
            props.setLastUpdate(Date.now())
        })
    };

    const changeTime = (id) => {
        editTime(id, {
            newTime: newTime
        })
    }

    const editStatus = (id, newStatus) => {
        Axios.put('http://localhost:3005/api/planes/newStatus' + id, newStatus).then(() => {
            props.setLastUpdate(Date.now())
        })
    };

    const changeStatus = (id) => {
        editStatus(id, {
            newStatus: newStatus === 'on' ? 1 : 0,
        })
    }

    return (
        <div className="card m-1" style={{ width: '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">From: {props.data.from_town}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Arrival Date: {date}</h6>
                <h6 className="card-subtitle mb-2 text-muted">Arrival time: {time}</h6>
                <input name="arrival" type="datetime-local" className="form-control" onChange={(e) => setNewTime(e.target.value)} />
                <div className="setNewItems"><button type="button" className="btn btn-warning m-2 btn-sm" onClick={() => changeTime(props.data.id)}>Set New Time</button><button type="button" className="btn btn-warning m-2 btn-sm" onClick={() => changeStatus(props.data.id)}>Set New Status</button></div>
                <h6 className="card-subtitle mb-2">Status : {props.data.is_late === 1 ? "Late" : "On time"} </h6>
                <h6 className="card-subtitle mb-2">Change Status? <input type="checkbox" aria-label="late" className="" onChange={e => setNewStatus(e.target.value)} /> </h6>
                <p className="card-text">Airline: {props.data.airline}</p>
                <button type="button" className="btn btn-outline-danger m-3" onClick={() => props.delete(props.data.id)}>Delete</button>
                <button type="button" className="btn btn-warning" onClick={() => props.showModal(props.data.id)}>Edit</button>
            </div>
        </div>
    )
}
export default Plane;
