import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup } from 'react-bootstrap';
import Select from 'react-select';

function CreateBusiness() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [slogan, setSlogan] = useState('');
    const [year_established, setYear] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [web_url, setUrl] = useState('');
    const [logo, setLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState('');

    const [allLocations, setAllLocation] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081/location').then(res => setAllLocation(res.data))
            .catch(err => console.log(err));
    }, []);

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

    const handleLogoChange = (event) => {
        const file = event.target.files[0];
    const filename = file.name;  // Extract the filename
    setLogo(file);
    setLogoPreview(URL.createObjectURL(file));

    // If you need to send the filename somewhere, you can do it here.
    // For example, if you are submitting a form:
    const formData = new FormData();
    formData.append('profileImage', file);  // Append the file
    formData.append('filename', filename);  // Append the filename

    // Then send formData to the server using your preferred method (e.g., axios)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('location', location);
        formData.append('slogan', slogan);
        formData.append('year_established', year_established);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('web_url', web_url);
        formData.append('profileImage', logo);

        try {
            const response = await axios.post('http://localhost:8081/createBusiness', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response);
            navigate('/success');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className=''>
            <form onSubmit={handleSubmit}>
                <h5>Register Your Business</h5>
                <div className='row'>
                    <div className='mb-2 col-6'>
                        <label htmlFor='name'>Name</label>
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
                        <label htmlFor='slogan'>Business Slogan</label>
                        <input type='text'
                            placeholder='Enter slogan'
                            required
                            className='form-control'
                            onChange={e => setSlogan(e.target.value)}
                        />
                    </div>
                    <div className='mb-2 col-6'>
                        <label htmlFor='year_established'>Year Established</label>
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
                        <label htmlFor='phone'>Phone Number</label>
                        <input type='text'
                            placeholder='Enter Phone'
                            required
                            className='form-control'
                            onChange={e => setPhone(e.target.value)}
                        />
                    </div>
                    <div className='mb-2 col-6'>
                        <label htmlFor='email'>Email</label>
                        <input type='email'
                            placeholder='Enter Email'
                            required
                            className='form-control'
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='mb-2 col-6'>
                        <label htmlFor='profileImage'>Upload Logo</label>
                        <input type='file'
                            id="profileImage" 
                            name="profileImage" 
                            accept="image/*" 
                            required
                            className='form-control'
                            onChange={handleLogoChange}
                        />
                    </div>
                    <div className='mb-2 col-6'>
                        <label htmlFor='web_url'>Website URL</label>
                        <input type='text'
                            placeholder='Enter Website Url e.g. www.xyz.com'
                            required
                            className='form-control'
                            onChange={e => setUrl(e.target.value)}
                        />
                    </div>
                    {logoPreview && (
                        <div className='mb-2'>
                            <label>Logo Preview:</label>
                            <img src={logoPreview} alt='Logo Preview' style={{ width: '100px', height: '100px' }} />
                        </div>
                    )}
                </div>
                <ButtonGroup>
                    <button className='btn green' onClick={handleGoBack}>Go Back</button>
                    <button className='btn green' type='submit'>Submit</button>
                </ButtonGroup>
            </form>
        </div>
    );
}

export default CreateBusiness;
