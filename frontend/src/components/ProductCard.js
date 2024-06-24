import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';

const ProductCard = (props) => {
  const {category, subcategory, name, description, business, price, product_type, image, business_logo } = props;

  const linkStyle = {
    color: 'inherit', // Inherit the color from the parent (white in this case)
    textDecoration: 'none', // Remove underline
  };

  const formatPriceAsNaira = (price) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(price);
  };

  return (
    <div className='product-card'>
      <Row>
        <Col sm={12} md={12}>
          <img className='product-logo' src={`http://localhost:8081/uploads/${image}`} alt="Product Logo" />
        </Col>
        <Col sm={12} md={12}>
          <h6 className='product-title'>{name}</h6>
          <span className='product-badge'><b>Price: </b>{formatPriceAsNaira(price)}</span><br/>
          <span className='product-subtitle'>{category} - {subcategory}</span><br/>
          <span className='product-subtitle'>{description}</span><br/>
          <span className='product-subtitle-bold'>
            <img className='tiny_logo' src={`http://localhost:8081/uploads/${business_logo}`} alt="Business Logo" />{business}
          </span><br/>
        </Col>
      </Row>
    </div>
  );
};

export default ProductCard;
