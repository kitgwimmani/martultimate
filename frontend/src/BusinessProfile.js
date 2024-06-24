import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BusinessCard from './components/BusinessCard';
import ProductCard from './components/ProductCard';
import { Row, Col } from 'react-bootstrap';
//import 'materialize-css/dist/css/materialize.min.css';
import Navbar from './components/Navbar';



import './App.css';
import Business from './Business';

function BusinessProfile() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [slogan, setSlogan] = useState('');
  const [year_established, setYear] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [web_url, setUrl] = useState('');
  const [logo, setLogo] = useState('');
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [allLocations, setAllLocation] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/location').then(res => setAllLocation(res.data))
      .catch(err => console.log(err));
  }, [])
  useEffect(() => {
    axios.get(`http://localhost:8081/product_detail/${id}`).then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    // Fetch user data by ID and set the initial state values
    axios.get(`http://localhost:8081/getBusiness/${id}`)
      .then(res => {
        const businessData = res.data; // Assuming the fetched data has fields: name, email, role
        //alert(businessData[0].name);

        // Check if userData exists and has the expected properties

        setName(businessData[0].name);
        setLocation(businessData[0].location);
        setSlogan(businessData[0].slogan);
        setYear(businessData[0].year_established);
        setPhone(businessData[0].phone);
        setEmail(businessData[0].email);
        setUrl(businessData[0].web_url);
        setLogo(businessData[0].logo);

      })
      .catch(err => console.log(err));
  }, [id]);

  ////for searcheable location
  const locationOptions = allLocations.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleLocationChange = (selectedOption) => {
    setLocation(selectedOption ? selectedOption.value : '');
  };

  const handleShowProfile = async (id) => {
    await axios.get('http://localhost:8081/business/' + id)
    window.location.reload()
  }


  const handleGoBack = (event) => {
    event.preventDefault();
    navigate(-1);
  };




  //##############################
  return (
    <div >
      <div className='p-4'>
        <Row>
          

          <Col sm={12} md={2}>
          <center>
           
                <img className='profile_logo' src={`http://localhost:8081/uploads/${logo}`} alt="Business Logo" />
                <br />
               <h5>{name}</h5> 
               <i> {slogan}</i><br/>
                <span><b>Email:</b> {email}</span><br/>
                <span><b>Phone:</b> {phone}</span><br/>
                <span><b>Website: </b> <a href={`//${web_url}`} target="_blank" rel="noopener noreferrer">{web_url}</a> </span>
            </center>
              
          </Col>

      {
        product.map((data, i) => {
       return (
         <Col key={i} sm={12} md={2}>
           <ProductCard 
            name={data.product} 
                 description={data.description} 
                 price={data.price} 
                 category={data.category}
                 subcategory={data.subcategory} 
                 business={data.business}
                 product_type={data.product_type} 
                 image={data.image} 
                 business_logo = {data.logo}
           />
         </Col>
       );
     })
     }
         
        </Row>
      </div>
    </div>
  );
}

export default BusinessProfile