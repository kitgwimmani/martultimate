import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonGroup } from 'react-bootstrap';

import Select from 'react-select';

function UpdateCustomer() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const { id } = useParams();
    const [allLocations, setAllLocation] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:8081/location').then(res => setAllLocation(res.data))
            .catch(err => console.log(err));
    }, [])

   
   
    useEffect(() => {
        // Fetch user data by ID and set the initial state values
        axios.get(`http://localhost:8081/getCustomer/${id}`)
            .then(res => {
                const customerData = res.data; // Assuming the fetched data has fields: name, email, role
                //alert(businessData[0].name);

                // Check if userData exists and has the expected properties
                
                    setName(customerData[0].name);
                    setPhone(customerData[0].phone);
                    setEmail(customerData[0].email);
                    setLocation(customerData[0].location);
                    setGender(customerData[0].gender);
                    setAge(customerData[0].age);
               
            })
            .catch(err => console.log(err));
    }, [id]);

    
    // Gender options and change handler
    const genderOptions = [
        { value: '1', label: 'Male' },
        { value: '2', label: 'Female' }
    ];

    const handleGenderChange = selectedOption => {
        setGender(selectedOption ? selectedOption.value : '');
    };


     ////for searcheable location
     const locationOptions = allLocations.map((location) => ({
        value: location.id,
        label: location.name,
    }));

    const handleLocationChange = (selectedOption) => {
        setLocation(selectedOption ? selectedOption.value : '');
    };

    const handleGoBack = (event) => {
        event.preventDefault();
        navigate(-1);
    };


    function handleSubmit(event) {
        event.preventDefault();
        axios.put(`http://localhost:8081/updateCustomer/${id}`, { name, email, phone, location, age, gender })
            .then(res => {
                console.log(res);
                navigate('/customer');
            })
            .catch(err => console.log(err));
    }
   
    //##############################
    return (
        <div className='d-flex vh-100  justify-content-center align-items-center'>
            <div className='w-75 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                    <h2>Update Customer</h2>
                    <div className='row'>
                    <div className='mb-2 col-6'>
                        <label htmlFor=''>Name</label>
                        <input type='text'
                            placeholder='Enter Name'
                            value={name}
                            required
                            className='form-control'
                            onChange={e => setName(e.target.value)}
                        />

                    </div>

                    <div className='mb-2 col-6'>
                        <label htmlFor=''>Email</label>
                        <input type='email'
                            placeholder='Enter email'
                            value={email}
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
                            value={phone}
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
                            value={age}
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
                        <button className='btn btn-success'>Update</button>
                    </ButtonGroup>
                </form>
            </div>
        </div>
    );
}

export default UpdateCustomer;
