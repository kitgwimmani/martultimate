import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const IconMenu = (props) => {
  const { icon: Icon, title, page, count } = props; // Destructure icon prop and rename it to Icon
  const linkStyle = {
    color: 'inherit', // Inherit the color from the parent (white in this case)
    textDecoration: 'none', // Remove underline
    color: "#008800",
  };
  return (
    <Card className="text-center">
      <Card.Link as={Link} to={page} style={linkStyle}>
      {count>0 ? (
           <span class="badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger "> {count}</span>
        ): (
          <span class="badge"></span>
        )}
        <Card.Body>
          <Icon size={30} /> {/* Render the icon component */}
          <Card.Title style={{fontSize:'1rem'}}>{title}</Card.Title> {/* Use the title prop */}
        </Card.Body>
      </Card.Link>
    </Card>
  );
};

export default IconMenu;
