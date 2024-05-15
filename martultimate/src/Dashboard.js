
import React, { useEffect, useState } from 'react'
import axios from 'axios';

//import Notification from './components/Notification';
import { Container, Row, Col } from 'react-bootstrap';

import { FaMapMarkerAlt, FaBell, FaBriefcase, FaUserFriends, FaUser, FaBoxOpen  } from 'react-icons/fa';
import IconMenu from './components/IconMenu';

function Dashboard() {
  const [location, setLocation] = useState([])
  const [business, setBusiness] = useState([])
  const [customer, setCustomer] = useState([])
  const [product, setProduct] = useState([])

  
  useEffect(() => {
    axios.get('http://localhost:8081/location').then(res => setLocation(res.data))
      .catch(err => console.log(err));
  }, [])

  

  useEffect(() => {
    axios.get('http://localhost:8081/business').then(res => setBusiness(res.data))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8081/customer').then(res => setCustomer(res.data))
      .catch(err => console.log(err));
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8081/product').then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [])

 
  return (
    <Container>
      <h3 className='mt-4'>Dashboard</h3>

      <Row >
      
        <Col >
        
        <Row>
        <Col sm={12} md={2}><IconMenu icon={FaMapMarkerAlt} title={`Locations (${location.length})`} page="/location" /></Col>
        <Col sm={12} md={2}><IconMenu icon={FaBell} title="Notifications" page="/notifications" count={customer.length+business.length+product.length}/></Col>
        <Col sm={12} md={2}><IconMenu icon={FaBriefcase} title={`Businesses (${business.length})`} page="/business" /></Col>
        <Col sm={12} md={2}><IconMenu icon={FaUserFriends} title={`Customers (${customer.length})`} page="/customer" /></Col>
        <Col sm={12} md={2}><IconMenu icon={FaBoxOpen} title={`Products (${product.length})`} page="/product" /></Col>
        <Col sm={12} md={2}><IconMenu icon={FaUser} title="Admins" page="/" /></Col>
        </Row>
        
        
        </Col>

       </Row>

    </Container>


  )
}

export default Dashboard