import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { Form, Container, InputGroup, Table } from 'react-bootstrap';

import './App.css';

function Customer() {
  const [customer, setCustomer] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    axios.get('http://localhost:8081/customer').then(res => setCustomer(res.data))
      .catch(err => console.log(err));
  }, [])


  const handleActivate = async (id) => {
    await axios.put('http://localhost:8081/activateCustomer/' + id)
    window.location.reload()
  }


  const handleDecline = async (id) => {
    await axios.put('http://localhost:8081/declineCustomer/' + id)
    window.location.reload()
  }

  const handlePending = async (id) => {
    await axios.put('http://localhost:8081/pendingCustomer/' + id)
    window.location.reload()
  }

  const handleDelete = async (id) => {
    try {
      if (confirmDelete()){
      await axios.delete('http://localhost:8081/customer/' + id)
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
  
 //<Link to='/customer/createCustomer' className='btn btn-success'>Add +</Link>


  return (
    <div className='main-content'>
      <Container>
      <h5 className='mt-4'>Customer List</h5>
      
            <Form>
              <InputGroup className='my-3' style={{ width: '100%'}}>
                <Form.Control onChange={(e) => setSearch(e.target.value)} placeholder='Search Customer' />
              </InputGroup>

            </Form>
            <div style={{ width: '100%', height: '400px', overflow: 'auto' }}>
          <Table striped bordered  style={{ fontSize: '14px'}}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                customer.filter((data) => {
                    const searchLower = search.toLowerCase();
                    //specific   return search.toLowerCase()=== ''? data : data.item.toLowerCase().includes(search)
                    return (
                      searchLower === '' ||
                      Object.values(data).some(
                        (value) =>
                          value && value.toString().toLowerCase().includes(searchLower)
                      )
                    );
                  }).map((data, i) => (
                  <tr key={i}>
                    <td>{data.name}</td>
                    <td>{data.email}</td>
                    <td>{data.phone}</td>
                    <td>{data.location}</td>
                    <td>{data.gender}</td>
                    <td>{data.age}</td>
                    <td style={{
                      backgroundColor:
                        data.status === 0 ? '#ffff00' :
                          data.status === 1 ? '#aaffaa' :
                            data.status === 2 ? '#ffaaaa' :
                              'black'
                    }}>
                      {data.status === 0 ? 'Pending' :
                        data.status === 1 ? 'Active' :
                          data.status === 2 ? 'Declined' :
                            'Unknown'}
                    </td>
                    <td> <ButtonGroup>
                      <button onClick={e => handleActivate(data.id)}
                        className='btn btn-light btn-sm'
                      >
                        Activate</button>
                      <Dropdown >
                        <Dropdown.Toggle split variant="light"
                          className='btn-sm'
                          id="dropdown-split-basic" />
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={e => handlePending(data.id)}>Keep Pending</Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item onClick={e => handleDecline(data.id)}>Decline</Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item onClick={e => handleDelete(data.id)}>Delete</Dropdown.Item>

                        </Dropdown.Menu>
                      </Dropdown>
                    </ButtonGroup></td>

                  </tr>
                ))
              }

            </tbody>

          </Table>
          </div>
          </Container>
        </div>
    
  )
}

export default Customer