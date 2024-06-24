import React, { useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import '../App.css';


const HomeSlider = () => {
  useEffect(() => {
    // Initialize the mobile sidenav
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);

    // Initialize sliders
    const sliders = document.querySelectorAll('.slider');
    M.Slider.init(sliders, {indicators: false });
  }, []);

  return (
    <div style={{ padding: '30px' }}>
      <div className="panel transparent hide-on-med-and-down">
        <div className="col s12 m2 l2 slider">
          <ul className="slides">
            <li>
              <img src='../1.jpg' alt="" className="responsive-img" />
              <div className="caption center"></div>
            </li>
            <li>
              <img src='../1a.jpg' className="responsive-img" />
              <div className="caption center"></div>
            </li>
          </ul>
        </div>
        <div className="col s12 m2 l2 slider">
          <ul className="slides">
            <li>
              <img src='../2.jpg' className="responsive-img" />
              <div className="caption center"></div>
            </li>
          </ul>
        </div>
        <div className="col s12 m2 l2 slider">
          <ul className="slides">
            <li>
              <img src='../3a.jpg' alt="" className="responsive-img s12" />
              <div className="caption center"></div>
            </li>
            <li>
              <img src='../3.jpg' alt="" className="responsive-img s12" />
              <div className="caption center"></div>
            </li>
          </ul>
        </div>
        <div className="col s12 m2 l2 slider">
          <ul className="slides">
            <li>
              <img src='../4.jpg' alt="" className="responsive-img" />
              <div className="caption center"></div>
            </li>
            <li>
              <img src='../4a.jpg' alt="" className="responsive-img" />
              <div className="caption center"></div>
            </li>
          </ul>
        </div>
        <div className="col s12 m2 l2 slider">
          <ul className="slides">
            <li>
              <img src='../5a.jpg' alt="" className="responsive-img" />
              <div className="caption center"></div>
            </li>
            <li>
              <img src='../5.jpg' alt="" className="responsive-img" />
              <div className="caption center"></div>
            </li>
          </ul>
        </div>
        <div className="col s12 m2 l2 slider">
          <ul className="slides">
            <li>
              <img src='../6b.jpg' alt="" className="responsive-img" />
              <div className="caption center"></div>
            </li>
            <li>
              <img src='../6.jpg' alt="" className="responsive-img" />
              <div className="caption center"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;
