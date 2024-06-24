import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

const MessageCard = (props) => {
  const { title, message, logo } = props;
  const linkStyle = {
    color: 'inherit', // Inherit the color from the parent (white in this case)
    textDecoration: 'none', // Remove underline
  };
  return (
    <div style={{margin:'20px'}}>
      <Row>
        <Col sm={2} md={2}>
          <img style={{width:'100px', height:'100px', padding:'10px'}} src={logo} />
          </Col>
          <Col sm={8} md={8}>
          <h4>{title}</h4>
          <p>{message} <Link to={'/'} className='green-text'><em>Back</em></Link></p>
        </Col>
      </Row>
    </div>
  );
};

export default MessageCard;
