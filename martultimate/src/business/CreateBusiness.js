import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup } from 'react-bootstrap';

import Select from 'react-select';

function CreateBusiness() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [profile, setProfile] = useState('');
    const [year_established, setYear] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [web_url, setUrl] = useState('');

    const [allLocations, setAllLocation] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081/location').then(res => setAllLocation(res.data))
            .catch(err => console.log(err));
    }, [])

    ////for searcheable location
    const locationOptions = allLocations.map((category) => ({
        value: category.id,
        label: category.name,
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
        axios.post('http://localhost:8081/createBusiness', { name, location, profile, year_established, phone, email, web_url }).then(res => {
            console.log(res);
            navigate(-1);
        }).catch(err => console.log(err));
    }
   
    //##############################
    return (
        <div className='d-flex vh-100  justify-content-center align-items-center'>
            <div className='w-75 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Business</h2>
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
                        <label htmlFor=''>Profile</label>
                        <input type='text'
                            placeholder='Enter Profile'
                            required
                            className='form-control'
                            onChange={e => setProfile(e.target.value)}
                        />
                    </div>

                    <div className='mb-2 col-6'>
                        <label htmlFor=''>Year Established</label>
                        <input type='number'
                        min="1900" max="2100" step="1"
                            placeholder='Enter Year'
                            required
                            className='form-control'
                            onChange={e => setYear(e.target.value)}
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
                        <label htmlFor=''>Email</label>
                        <input type='email'
                            placeholder='Enter Email'
                            required
                            className='form-control'
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    </div>
                    <div className='row'>
                    <div className='mb-2'>
                        <label htmlFor=''>Website URL</label>
                        <input type='text'
                            placeholder='Enter Website Url e.g. www.xyz.com'
                            required
                            className='form-control'
                            onChange={e => setUrl(e.target.value)}
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

export default CreateBusiness