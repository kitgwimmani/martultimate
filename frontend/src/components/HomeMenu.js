import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import '../App.css';

const HomeMenu = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    // Initialize the mobile sidenav
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);

    // Initialize collapsible
    const collapsibles = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapsibles);
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8081/category').then(res => setCategory(res.data))
      .catch(err => console.log(err));
  }, [])


  return (
    <div className=" " style={{ paddingTop: '20px' }}>
      <div className="center home-menu bold-font" >
        <ul className="collapsible z-depth-0 full-width-important" >
        {
      category.map((data, i) => (
        
        <li>
            <div className="collapsible-header" style={{ padding: '7px'}}>
              <i className="material-icons">{data.icon}</i>
              <span className='home-menu-light' style={{ marginLeft: '10px'}}>{data.name}</span>
            </div>
            <div className="collapsible-body">
              <span style={{fontSize: '10px'}}>{data.description}</span>
            </div>
          </li>
        
      ))
      }
       
          
        </ul>
      </div>
    </div>
  );
};

export default HomeMenu;
