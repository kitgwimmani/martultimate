import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
//import { Form, Container, InputGroup, Table } from 'react-bootstrap';
import CategoryCard from './components/CategoryCard';
import BusinessCard from './components/BusinessCard';
import ProductCard from './components/ProductCard';
import { Row, Col } from 'react-bootstrap';
import { FaMapMarkerAlt, FaBell, FaBriefcase, FaUserFriends, FaUser, FaBoxOpen } from 'react-icons/fa';
//import 'materialize-css/dist/css/materialize.min.css';
import Navbar from './components/Navbar';
import HomeCard from './components/HomeCard';
import HomeSlider from './components/HomeSlider';
import HomeMenu from './components/HomeMenu';
import CreateCustomer from './components/CreateCustomer';


import './App.css';

function Business() {
  const [category, setCategory] = useState([]);
  const [business, setBusiness] = useState([]);
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8081/category').then(res => setCategory(res.data))
      .catch(err => console.log(err));
  }, [])


  useEffect(() => {
    axios.get('http://localhost:8081/business_frontend/').then(res => setBusiness(res.data))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8081/product/').then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [])



  const handleActivate = async (id) => {
    await axios.put('http://localhost:8081/activateBusiness/' + id)
    window.location.reload()
  }


  const handleDecline = async (id) => {
    await axios.put('http://localhost:8081/declineBusiness/' + id)
    window.location.reload()
  }

  const handlePending = async (id) => {
    await axios.put('http://localhost:8081/pendingBusiness/' + id)
    window.location.reload()
  }


  const handleDelete = async (id) => {
    try {
      if (confirmDelete()) {
        await axios.delete('http://localhost:8081/business/' + id)
        window.location.reload()
      }
    } catch (err) {
      console.log(err)
    }

  }



  const confirmDelete = () => {
    const isConfirmed = window.confirm('Are you sure you want to delete?');
    return isConfirmed
  }



  return (
    <div className='white'>

      <Navbar/>
      <h5>Search</h5>
      <Row>
        {
      business.map((data, i) => (
        
        <Col sm={12} md={3}>
       <BusinessCard id={data.id} title={data.name} slogan={data.slogan} phone={data.phone} email={data.email} web_url={data.web_url} logo={data.logo}/>
       </Col>
      ))
      }
      </Row>
    </div>

  )
}

export default Business