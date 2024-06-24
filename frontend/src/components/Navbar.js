import React, { useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import '../App.css';

const Navbar = () => {
  useEffect(() => {
    // Initialize the mobile sidenav
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);
  }, []);

  return (
    <div>
      <nav className='z-depth-0 '>
        <div className="nav-wrapper green darken-2 main_nav" >
          <a href="#!" className=" menu_logo "><img className=" menu_logo" src="../logo.png"></img></a>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
          <ul className="right hide-on-med-and-down ">
            <li><a href="/">Home</a></li>
            <li><a href="/business">Businesses</a></li>
            <li><a href="/product">Products/Services</a></li>
            <li><a href="/signup_business">Register</a></li>
            <li><a href="/signup_user">Sign Up</a></li>
          </ul>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-demo">
      <li><a href="/">Home</a></li>
            <li><a href="/business">Businesses</a></li>
            <li><a href="/product">Products/Services</a></li>
            <li><a href="/signup_business">Register</a></li>
            <li><a href="/signup_user">Sign Up</a></li>
      </ul>
    </div>
  );
};

export default Navbar;