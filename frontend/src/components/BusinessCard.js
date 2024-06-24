import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';
const BusinessCard = (props) => {
  const {id, title, slogan, phone, email, web_url, logo } = props;
  const linkStyle = {
    color: 'inherit', // Inherit the color from the parent (white in this case)
    textDecoration: 'none', // Remove underline
  };
  return (
    <div className='business-card'>
      <Row>
      <Link to={`/business_profile/${id}`}>
        <Col sm={2} md={2}>
        <img className='business-logo' src={`http://localhost:8081/uploads/${logo}`} alt="Business Logo" />
          </Col>
          <Col sm={8} md={10}>
          <h6 className='business-title'>{title}</h6>
          <span className='business-subtitle'>{slogan}</span><br/>
          <span className='business-subtitle'><b>Phone: </b>{phone}</span><br/>
          <span className='business-subtitle'><b>Email: </b>{email}</span><br/>
          <span className='business-url'><b>Website: </b> <a href={`//${web_url}`} target="_blank" rel="noopener noreferrer">{web_url}</a> </span>
        </Col>
        </Link>
      </Row>
    </div>
  );
};

export default BusinessCard;
