import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";

function EditPlane({hideModal, plane, setLastUpdate, id}) {

    const [fromTown, setFromTown] = useState('');
    const [airline, setAirline] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [isLate, setIsLate] = useState('');


    const clearFields = () => {
        setFromTown('')
        setAirline('')
        setArrivalTime('')
        setIsLate('')
        reset('', {
            keepValues: false,
        })
    }

    const cancel = () => {
        hideModal()
        clearFields();
    };

    const schema = yup.object().shape({
        town: yup.string().required().min(3, "Please enter valid town name"),
        arrival: yup.string().required("Please choose arrival time"),
        airline: yup.string().required().min(3, "Please enter valid airline name"),
    });
    
    const EditPlane = (id, plane) => {
        axios.put('http://localhost:3005/api/planes'+ id, plane).then(() => {
            setLastUpdate(Date.now())
        })
    };

    const Edit = () => {
        EditPlane(id, {
            fromTown: fromTown,
            isLate: isLate === 'on' ? 1 : 0,
            arrivalTime: arrivalTime,
            airline: airline
        })
        hideModal()
        clearFields();
    };

    const {register, handleSubmit, formState: { errors }, reset} = useForm({
        resolver: yupResolver(schema),
    });

    if (id === 0){
        return null;
    }

    return (
        <>
            <div className="modalas">
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Edit Plane</h5>
                                    <form onSubmit={handleSubmit(Edit)}>
                                        <div className="form-group">
                                            <label >From Town</label>
                                            <input {...register('town')} name="town" type="text" className="form-control" placeholder="Enter Departure Town Name" onChange={(e) => setFromTown(e.target.value)} />
                                            <p className="warning">{errors["town"]?.message}</p>
                                        </div>
                                        <div className="form-group">
                                            <label >Arrival Time</label>
                                            <input {...register('arrival')} name="arrival" type="datetime-local" className="form-control" onChange={(e) => setArrivalTime(e.target.value)} />
                                            <p className="warning">{errors["arrival"]?.message}</p>
                                        </div>
                                        <div className="form-group">
                                            <label >Airline</label>
                                            <input {...register('airline')} name="airline" type="text" className="form-control" placeholder="Enter Airline Name" onChange={(e) => setAirline(e.target.value)} />
                                            <p className="warning">{errors["airline"]?.message}</p>
                                        </div>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">Is It Late</span>
                                            </div>
                                            <input type="checkbox" aria-label="late" className="form-control" onChange={e => setIsLate(e.target.value)} />
                                        </div>
                                        <button type="submit" className="btn btn-primary m-3">UPDATE</button>
                                        <button type="button" className="btn btn-warning" onClick={cancel} >CANCEL</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditPlane;