import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { Form, Container, InputGroup, Table } from 'react-bootstrap';

import './App.css';

function Product() {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    axios.get('http://localhost:8081/product').then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [])

  const handleDelete = async (id) => {
    try {
      if (confirmDelete()){
      await axios.delete('http://localhost:8081/product/' + id)
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
    <div className='main-content'>
      <Container>
      <h5 className='mt-4'>Product List</h5>
      <Link to='/product/createProduct' className='btn btn-success'>Add +</Link>
            <Form>
              <InputGroup className='my-3' style={{ width: '100%'}}>
                <Form.Control onChange={(e) => setSearch(e.target.value)} placeholder='Search Customer' />
              </InputGroup>

            </Form>
            <div style={{ width: '100%', height: '400px', overflow: 'auto' }}>
          <Table striped bordered  style={{ fontSize: '14px'}}>
            <thead>
              <tr>
                <th>Subcategory</th>
                <th>Name</th>
                <th>Description</th>
                <th>Business</th>
                <th>Price</th>
                <th>Product Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                product.filter((data) => {
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
                    <td>{data.subcategory}</td>
                    <td>{data.name}</td>
                    <td>{data.description}</td>
                    <td>{data.business}</td>
                    <td>{data.price}</td>
                    <td>{data.product_type}</td>
                    <td> <ButtonGroup>
                      <Link to={`updateProduct/${data.id}`} 
                      className='btn btn-warning btn-sm'
                      >
                      Update</Link>
                      <Dropdown >
                        <Dropdown.Toggle split variant="warning" 
                        className='btn-sm' 
                        id="dropdown-split-basic" />
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={e => handleDelete(data.id)}>Delete</Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item href="#">{data.status ? 'Activate' : 'Deactivate'}</Dropdown.Item>
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

export default Product