import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DashboardCard = (props) => {
  const { title, count, page } = props;
  const linkStyle = {
    color: 'inherit', // Inherit the color from the parent (white in this case)
    textDecoration: 'none', // Remove underline
  };
  return (
    <Card style={{ width: '18rem', textAlign: 'center',  background: 'linear-gradient(to right, #12a8a9, #208080)', color: 'white' }}>
      <Card.Link as={Link} to={page} style={linkStyle}>
      <Card.Body>
        {title && <Card.Title>{title}</Card.Title>}
        {count && <Card.Text>{count}</Card.Text>}
        
      </Card.Body>
      </Card.Link>
    </Card>
  );
};

export default DashboardCard;
