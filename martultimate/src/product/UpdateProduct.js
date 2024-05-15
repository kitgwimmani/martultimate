import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonGroup } from 'react-bootstrap';

import Select from 'react-select';

function UpdateProduct() {
    const [subcategory, setSubcategory] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [business, setBusiness] = useState('');
    const [price, setPrice] = useState('');
    const [product_type, setProductType] = useState('');
    const [allSubcategories, setAllSubcategory] = useState([]);
    const [allBusinesses, setAllBusiness] = useState([]);
    const [allProductTypes, setAllProductType] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
   
    useEffect(() => {
        axios.get('http://localhost:8081/subcategory').then(res => setAllSubcategory(res.data))
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8081/business').then(res => setAllBusiness(res.data))
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8081/product_type').then(res => setAllProductType(res.data))
            .catch(err => console.log(err));
    }, [])

   
   
    useEffect(() => {
        // Fetch user data by ID and set the initial state values
        axios.get(`http://localhost:8081/getProduct/${id}`)
            .then(res => {
                const productData = res.data; // Assuming the fetched data has fields: name, email, role
                //alert(businessData[0].name);

                // Check if userData exists and has the expected properties
                
                    setSubcategory(productData[0].subcategory);
                    setName(productData[0].name);
                    setDescription(productData[0].description);
                    setBusiness(productData[0].business);
                    setPrice(productData[0].price);
                    setProductType(productData[0].product_type);
               
            })
            .catch(err => console.log(err));
    }, [id]);

   ////for searcheable subcategory
   const subcategoryOptions = allSubcategories.map((subcategory) => ({
    value: subcategory.id,
    label: subcategory.name,
}));

const handleSubcategoryChange = (selectedOption) => {
    setSubcategory(selectedOption ? selectedOption.value : '');
};

////for searcheable business
const businessOptions = allBusinesses.map((business) => ({
    value: business.id,
    label: business.name,
}));

const handleBusinessChange = (selectedOption) => {
    setBusiness(selectedOption ? selectedOption.value : '');
};

////for searcheable business
const productTypeOptions = allProductTypes.map((product_type) => ({
    value: product_type.id,
    label: product_type.name,
}));

const handleProductTypeChange = (selectedOption) => {
    setProductType(selectedOption ? selectedOption.value : '');
};


    const handleGoBack = (event) => {
        event.preventDefault();
        navigate(-1);
    };


    function handleSubmit(event) {
        event.preventDefault();
        axios.put(`http://localhost:8081/updateProduct/${id}`, { subcategory, name, description, business, price, product_type })
            .then(res => {
                console.log(res);
                navigate('/product');
            })
            .catch(err => console.log(err));
    }
   
    //##############################
    return (
        <div className='d-flex vh-100  justify-content-center align-items-center'>
            <div className='w-75 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                    <h2>Update Product</h2>
                    <div className='row'>
                    <div className='mb-2 col-6'>
                        <label htmlFor='subcategory'>Select Subcategory</label>
                        <Select
                            options={subcategoryOptions}
                            value={subcategoryOptions.find((option) => option.value === subcategory)}
                            onChange={handleSubcategoryChange}
                        />

                    </div>
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
                    </div>
                    <div className='row'>

                    <div className='mb-2 col-6'>
                        <label htmlFor=''>Description</label>
                        <textarea
                            placeholder='Enter description'
                            value={description}
                            required
                            className='form-control'
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>

                    <div className='mb-2 col-6'>
                        <label htmlFor='business'>Select Business</label>
                        <Select
                            options={businessOptions}
                            value={businessOptions.find((option) => option.value === business)}
                            onChange={handleBusinessChange}
                        />

                    </div>

                    </div>

                    <div className='row'>
                    <div className='mb-2 col-6'>
                        <label htmlFor=''>Price</label>
                        <input type='number'
                            placeholder='Enter Price'
                            value={price}
                            required
                            className='form-control'
                            onChange={e => setPrice(e.target.value)}
                        />
                    </div>

                    <div className='mb-2 col-6'>
                        <label htmlFor='product_type'>Select Product Type</label>
                        <Select
                            options={productTypeOptions}
                            value={productTypeOptions.find((option) => option.value === product_type)}
                            onChange={handleProductTypeChange}
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

export default UpdateProduct;
