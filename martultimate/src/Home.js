import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { Form, Container, InputGroup, Table } from 'react-bootstrap';

import './App.css';

function Home() {
  const [business, setBusiness] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    axios.get('http://localhost:8081/business/').then(res => setBusiness(res.data))
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
    <div className=''>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a class="navbar-brand" href="#">
      <img src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="Bootstrap" width="30" height="24" />
    </a>
            <a class="navbar-brand" href="#">MartUltimate</a>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">Disabled</a>
              </li>
            </ul>
            
          </div>
        </div>
      </nav>
      <Container>


      </Container>
    </div>

  )
}

export default Home