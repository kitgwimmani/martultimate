import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
//import 'materialize-css/dist/css/materialize.min.css';
import Navbar from './components/Navbar';
import MessageCard from './components/MessageCard';


import './App.css';

function SuccessPage() {
 
  return (
    <div className='white '>

      <Navbar />
      <Row className=''>
        <Col sm={12} md={2}>
          
        </Col>
        <Col sm={12} md={8}>
          <MessageCard logo='/success.png' title='Business Request Sent!' message='Your request to be part of martultimate as a business is sent successfully, 
         your current activation status is pending, kindly wait for confirmation via your email. Thank you for joining us'/>
        </Col>
        
        <Col sm={12} md={2}>
         
        </Col>

      </Row>
    </div>

  )
}

export default SuccessPage