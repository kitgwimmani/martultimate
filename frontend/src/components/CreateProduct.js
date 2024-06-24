import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup } from 'react-bootstrap';
import Select from 'react-select';

function CreateProduct() {
    const [subcategory, setSubcategory] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [business, setBusiness] = useState('');
    const [price, setPrice] = useState('');
    const [product_type, setProductType] = useState('');
    const [logoPreview, setLogoPreview] = useState('');
    const [image, setImage] = useState('');

    const [allSubcategories, setAllSubcategory] = useState([]);
    const [allBusinesses, setAllBusiness] = useState([]);
    const [allProductTypes, setAllProductType] = useState([]);
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

    const handleImageChange = (event) => {
        const file = event.target.files[0];
    const filename = file.name;  // Extract the filename
    setImage(file);
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
        formData.append('subcategory', subcategory);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('business', business);
        formData.append('price', price);
        formData.append('product_type', product_type);
        formData.append('profileImage', image);

        try {
            const response = await axios.post('http://localhost:8081/createProduct', formData, {
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
                <h5>Upload Product</h5>
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
                        <label htmlFor=''>Product Name</label>
                        <input type='text'
                            placeholder='Enter Name'
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
                <div className='row'>
                    <div className='mb-2 col-6'>
                        <label htmlFor='profileImage'>Upload Image</label>
                        <input type='file'
                            id="profileImage" 
                            name="profileImage" 
                            accept="image/*" 
                            required
                            className='form-control'
                            onChange={handleImageChange}
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

export default CreateProduct;
