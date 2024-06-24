import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Icon } from 'react-bootstrap';

import { FaMapMarkerAlt, FaBell, FaBriefcase, FaUserFriends, FaUser, FaBoxOpen  } from 'react-icons/fa';

const CategoryCard = (props) => {
  const { title, icon, page } = props;
  const linkStyle = {
    color: 'inherit', // Inherit the color from the parent (white in this case)
    textDecoration: 'none', // Remove underline
    fontSize: '10px',
    padding: '0px',
    
  };
  const textStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'block',
    width: '100%', // Make sure it takes up the full width of the card
    // Add some padding to avoid text touching the edges
  };
  return (
    <Card  style={{  textAlign: 'center', background: '#ff8000', color: '#ffffff' }} >
      <Card.Link as={Link} to={page} style={linkStyle}>
      <Card.Body >
        {title && <Card.Text style={textStyle}>{title}</Card.Text>}
        
      </Card.Body>
      </Card.Link>
    </Card>
  );
};

export default CategoryCard;
