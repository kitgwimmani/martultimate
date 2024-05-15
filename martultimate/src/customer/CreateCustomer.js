import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup } from 'react-bootstrap';

import Select from 'react-select';

function CreateCustomer() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');

    const [allLocations, setAllLocation] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081/location').then(res => setAllLocation(res.data))
            .catch(err => console.log(err));
    }, [])

    ////for searcheable location
    const locationOptions = allLocations.map((location) => ({
        value: location.id,
        label: location.name,
    }));

    const handleLocationChange = (selectedOption) => {
        setLocation(selectedOption ? selectedOption.value : '');
    };

    // Gender options and change handler
    const genderOptions = [
        { value: '1', label: 'Male' },
        { value: '2', label: 'Female' }
    ];

    const handleGenderChange = selectedOption => {
        setGender(selectedOption ? selectedOption.value : '');
    };

    const handleGoBack = (event) => {
        event.preventDefault();
        navigate(-1);
    };

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/createCustomer', { name, email, phone, location, gender, age }).then(res => {
            console.log(res);
            navigate(-1);
        }).catch(err => console.log(err));
    }
   
    //##############################
    return (
        <div className='d-flex vh-100  justify-content-center align-items-center'>
            <div className='w-75 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Customer</h2>
                    <div className='row'>
                    <div className='mb-2 col-6'>
                        <label htmlFor=''>Name</label>
                        <input type='text'
                            placeholder='Enter Name'
                            required
                            className='form-control'
                            onChange={e => setName(e.target.value)}
                        />

                    </div>

                    <div className='mb-2 col-6'>
                        <label htmlFor=''>Email</label>
                        <input type='email'
                            placeholder='Enter email'
                            required
                            className='form-control'
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    </div>
                    <div className='row'>
                    <div className='mb-2 col-6'>
                        <label htmlFor=''>Phone Number</label>
                        <input type='text'
                            placeholder='Enter Phone'
                            required
                            className='form-control'
                            onChange={e => setPhone(e.target.value)}
                        />
                    </div>

                    <div className='mb-2 col-6'>
                        <label htmlFor='location'>Location</label>
                        <Select
                            options={locationOptions}
                            value={locationOptions.find((option) => option.value === location)}
                            onChange={handleLocationChange}
                        />

                    </div>
                    </div>
                    <div className='row'>
                    

                    <div className='mb-2 col-6'>
                        <label htmlFor=''>Age</label>
                        <input type='number'
                        min="1" max="120" step="1"
                            placeholder='Enter Age'
                            required
                            className='form-control'
                            onChange={e => setAge(e.target.value)}
                        />
                    </div>

                    <div className='mb-2 col-6'>
                        <label htmlFor='gender'>Gender</label>
                        <Select
                            options={genderOptions}
                            value={genderOptions.find((option) => option.value === gender)}
                            onChange={handleGenderChange}
                        />

                    </div>
                    </div>
                   
                    
                    <ButtonGroup>
                        <button className='btn btn-warning' onClick={handleGoBack}>Go Back</button>
                        <button className='btn btn-success'>Submit</button>
                    </ButtonGroup>
                </form>
            </div>
        </div>
    )
}

export default CreateCustomer