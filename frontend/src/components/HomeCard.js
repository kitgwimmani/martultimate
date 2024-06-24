import React, { useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import '../App.css';

const HomeCard = () => {
  useEffect(() => {
    // Initialize the mobile sidenav
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);
  }, []);

  return (
    <div class=" bold-font center">
            <h1 class="flow-text" style={{fontSize:'30px'}}>Martultimate</h1>

            <p style={{fontSize: '24px'}}>The Electronic Market</p>
            <p style={{fontSize: 'small'}}>Mart Ultimate gives your business the greatest visibility to attract real customers. We are enhancing local economies by promoting commerce with our distinctive technologies and service systems</p>
            <button class="btn btn-small green" >Explore</button>
        </div>
  );
};

export default HomeCard;