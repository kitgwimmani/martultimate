import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
//import { Form, Container, InputGroup, Table } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
//import 'materialize-css/dist/css/materialize.min.css';
import Navbar from './components/Navbar';
import CreateProduct from './components/CreateProduct';


import './App.css';

function UploadProduct() {
 

  return (
    <div className='white'>

      <Navbar />
      <Row>
        <Col sm={12} md={2}>
          
        </Col>
        <Col sm={12} md={8}>
          <CreateProduct />
        </Col>
        <Col sm={12} md={2}>
         
        </Col>

      </Row>
    </div>

  )
}

export default UploadProduct