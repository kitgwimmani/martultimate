import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Notification = (props) => {
  const { title,count, page } = props;
  const linkStyle = {
    color: 'inherit', // Inherit the color from the parent (white in this case)
    textDecoration: 'none', // Remove underline
  };
  return (
    <Card>
    <Card.Link as={Link} to={page} style={linkStyle} class="btn btn-light d-flex justify-content-between align-items-center position-relative">
    
        {title} 
        {count>0 ? (
           <span class="badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger "> {count}</span>
        ): (
          <span class="badge"></span>
        )}
        
    
      </Card.Link>
      </Card>
  );
};

export default Notification;
