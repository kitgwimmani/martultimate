import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup } from 'react-bootstrap';

import Select from 'react-select';

function CreateSubcategory() {
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [allCategories, setAllCategory] = useState([]);
    const navigate = useNavigate();

    const handleGoBack = (event) => {
        event.preventDefault();
        navigate(-1);
    };

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

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/createSubcategory', { category, name, description }).then(res => {
            console.log(res);
            navigate(-1);
        }).catch(err => console.log(err));
    }
    return (
        <div className='d-flex vh-100  justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Sub-Category</h2>
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
                            placeholder='Enter Category Name'
                            required
                            className='form-control'
                            onChange={e => setName(e.target.value)}
                        />

                    </div>

                    <div className='mb-2'>
                        <label htmlFor=''>Description</label>
                        <textarea
                            placeholder='Enter Description'
                            required
                            className='form-control'
                            onChange={e => setDescription(e.target.value)}
                        />
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

export default CreateSubcategory