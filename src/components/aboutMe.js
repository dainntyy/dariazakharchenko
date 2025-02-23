import React, {useState, useEffect} from "react";
import './aboutMe.css';

const Portfolio = ({ scrollOffset }) => {
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        const updateWidth = () => {
            const numSections = document.querySelectorAll('.section').length;
            setContainerWidth(numSections * 100); // Each section takes full width
        };
        
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: "10%",
        left: "0",
        display: "flex",
        flexDirection: "row",
        width: `${containerWidth}vw`, // Dynamically adjust width
        height: "60vh",
        pointerEvents: "none", // Ensures interaction with game
        transform: `translateX(${-scrollOffset}px)`, // Moves with player
          }}
    >
         
          <div className='mb-5 p-5 section text-center name' style={{ width: '1500px' }}>
              <div className='name-container'>
                      <h1 className='display-1 p-0'>Daria Zakharchenko</h1>
              </div>
                      <p className='mt-4' style={{fontSize: '1.85rem'}}>Front-end developer</p>
                  </div>
                  <div className='section about-me d-flex flex-column align-items-center justify-content-center ms-5 ps-5' style={{width: '1500px'}}>
                      <p className='fs-1 text-center'>
                          Hi, I'm Daria!
                      </p>
                      <p className='fs-2 text-center' style={{width: '60%'}}>
          I'm a fourth-year Computer Science student at the <span className='university'>Sumy State University (Ukraine)</span>.<br />
          Currently I'm living in Portugal
                      </p>
                  </div>
                  <div className='section d-flex mt-5' style={{width: '1500px'}}>
                      <p className='fs-2 text-center hobbies mt-5' style={{lineHeight: '2rem'}}>I like to draw and read but ofc when i have time, like i did with this duck (he's cute i know)</p>
          </div>
          <div className='section d-flex flex-column ms-5' style={{width: '1500px'}}>
        <p className='fs-2 bump-info mt-5 ms-5' style={{width: '100%'}}>Some projects that i did:</p>
        <div style={{ width: '100px' }}></div>
        <div style={{width:'100px'}}></div>        
        <div style={{width:'100px'}}></div>        
        <div style={{width:'100px'}}></div>        
        <div style={{width:'100px'}}></div>        
        <div style={{width:'100px'}}></div>

      </div>
      <div className='section d-flex flex-column text-center contact-info' style={{ width: '700px' }}>
    <p className='fs-3 m-5'>Our team: </p>
    <ul className='team-container d-flex justify-content-center'>
        <li className="floating duck1">
            <img src={require('../assets/img/team/duck1.png')} style={{ maxWidth: "160px" }} />
        </li>
        <li className="floating duck2">
            <img src={require('../assets/img/team/duck2.png')} style={{ maxWidth: "160px" }} />
        </li>
        <li className="floating duck3">
            <img src={require('../assets/img/team/duck3.png')} style={{ maxWidth: "160px" }} />
        </li>
        <li className="floating duck4">
            <img src={require('../assets/img/team/duck4.png')} style={{ maxWidth: "160px" }} />
        </li>
    </ul>
      </div>
              
    </div>
  );
};


export default Portfolio;
