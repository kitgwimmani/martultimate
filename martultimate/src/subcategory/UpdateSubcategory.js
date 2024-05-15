import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonGroup } from 'react-bootstrap';

import Select from 'react-select';

function UpdateSubcategory() {
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [allCategories, setAllCategory] = useState([]);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081/category').then(res => setAllCategory(res.data))
            .catch(err => console.log(err));
    }, [])

    ////for searcheable category
    const categoryOptions = allCategories.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    const handleCategoryChange = (selectedOption) => {
        setCategory(selectedOption ? selectedOption.value : '');
    };
    //##############################

    useEffect(() => {
        axios.get(`http://localhost:8081/getSubcategory/${id}`)
            .then(res => {
                const userData = res.data; 
                
                    setCategory(userData[0].category);
                    setName(userData[0].name);
                    setDescription(userData[0].description);
               
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleGoBack = (event) => {
        event.preventDefault();
        navigate(-1);
    };

    function handleSubmit(event){
        event.preventDefault();
        axios.put('http://localhost:8081/updateSubcategory/'+id, {category, name, description}).then(res => {
            console.log(res);
            navigate('/subcategory');
        }).catch(err => console.log(err));
    }
  return (
    <div className='d-flex vh-100  justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Update Subcategory</h2>
                <div className='mb-2'>
                        <label htmlFor='category'>Category</label>
                        <Select
                            options={categoryOptions}
                            value={categoryOptions.find((option) => option.value === category)}
                            onChange={handleCategoryChange}
                        />

                    </div>

                    <div className='mb-2'>
                        <label htmlFor=''>Subcategory Name</label>
                        <input type='text'
                            placeholder='Enter Subcategory Name'
                            required
                            value={name}
                            className='form-control'
                            onChange={e => setName(e.target.value)}
                        />

                    </div>

                    <div className='mb-2'>
                        <label htmlFor=''>Description</label>
                        <textarea
                            placeholder='Enter Description'
                            value={description}
                            required
                            className='form-control'
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>

                <ButtonGroup>
                    <button className='btn btn-warning' onClick={handleGoBack}>Go Back</button>
                    <button className='btn btn-success'>Update</button>
                </ButtonGroup>
            </form>
        </div>
    </div>
  )
}

export default UpdateSubcategory