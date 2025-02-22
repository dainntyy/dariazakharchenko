import { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './projectDescription.css';

export default function ModalWindow({ activeBox, handleClose }) {

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose]);


    return (
      <Modal show={activeBox !== null} onHide={handleClose} centered style={{ backgroundColor: "transparent"}} size="lg">
        <div className='bg-container'>
          <div  className='line-bord-header'>
            <Modal.Header closeButton id='bord-nn' style={{ color: "#372309" }}>
              <Modal.Title className='fs-1 ms-4 mt-5' style={{ lineHeight: '2rem'}}>
                {activeBox === 1 && 'Weather Forecast Web App'}
                {activeBox === 2 && 'Shopping Product Cart'}
                {activeBox === 3 && 'Construction company landing page'}
                {activeBox === 4 && '2048 game'}
                {activeBox === 5 && 'Modern bakery website'}
                {activeBox === 6 && 'Jammming. Music app'}
              </Modal.Title>
            </Modal.Header>
          </div>
          <Modal.Body className='p-5 pb-4 pt-4'>
            {activeBox === 1 &&
              <Row className='d-flex align-items-center' >
                <Col xs={6} className='react-box bs-box'>
                  <img src={ require('../assets/img/projects/weather-forecast.gif')} className='project-img' />
                </Col>
                <Col className='ts-box'>
                  <p style={{ color: "#372309" }} className='project-text'>Cute weather app that is using <span className='accent-text' style={{ color: "#372309" }}> Open  Weather API</span> to get the information about weather in different cities. I made it using <span className='accent-text' style={{ color: "#372309" }}>React, TypeScript and Bootstrap</span>  just to make styling easier.<br/> I really like the animation of sun and moon changing.</p>
                </Col>
              </Row>
            }
            {activeBox === 2 && 
              <Row className='d-flex align-items-center'>
                <Col xs={6} className='react-box bs-box'>
                  <img src={ require('../assets/img/projects/productCart.gif')} className='project-img' />
                </Col>
                <Col className='ts-box'>
                  <p style={{ color: "#372309" }} className='project-text'>Demo version of the shopping website. Nice, pretty and interactible interface. 
<br/>You are able to add as much products as you want)
<br/>
I was using <span className='accent-text' style={{ color: "#372309" }}> React, TypeScript and Bootstrap</span> for styling.</p>
                </Col>
              </Row>
            }
            {activeBox === 3 && 
              <Row className='d-flex align-items-center'>
                <Col xs={5} >
                  <img src={ require('../assets/img/projects/constructionCompanyDesktop.gif')} className='project-img' />
                </Col>
                <Col className='html-box css-box'>
                  <p style={{ color: "#372309" }} className='project-text'>Responsive landing page for the construction company in Ukraine. 
                    <br />Simple nice <span className='accent-text' style={{ color: "#372309" }}> HTML5 + CSS3</span> combination.</p>
                  <p className='project-text'>
                    <a href='https://dainntyy.github.io/construction_company/' target='blank' className='project-text' style={{ color: "#372309" }}>*You can check full preview here*</a>
                  </p>
                </Col>
              </Row>
            }
            {activeBox === 4 && 
              <Row className='d-flex align-items-center'>
                <Col xs={5} className='react-box js-box'>
                  <img src={ require('../assets/img/projects/2048-game.gif')} className='project-img' />
                </Col>
                <Col className='sass-box'>
                  <p style={{ color: "#372309" }} className='project-text'>Basically it’s a web page where you can play famous “2048” game. Nothing super crazy.

<br/><br/>Love the way cells are merging into each other.</p>
                </Col>
              </Row>
            }
            {activeBox === 5 && 
              <Row className='d-flex align-items-center'>
                <Col xs={5} className='html-box js-box'>
                  <img src={ require('../assets/img/projects/modernBakery.gif')} className='project-img' />
                </Col>
                <Col className='sass-box'>
                  <p style={{ color: "#372309" }} className='project-text'>Lovely one. I like this project really much.
                    <br />My favorite part is the slider).</p>
                  <p className='project-text'>
                    <a href='https://dainntyy.github.io/modern_bakery/' target='blank' className='project-text' style={{ color: "#372309" }}>*You can check full preview here*</a>
                  </p>
                </Col>
              </Row>
            }
            {activeBox === 6 && 
              <Row className='d-flex align-items-center'>
                <Col xs={5} className='react-box js-last-box'>
                  <img src={ require('../assets/img/projects/jammming.gif')} className='project-img' />
                </Col>
                <Col className='css-box'>
                  <p style={{ color: "#372309" }} className='project-text'>It’s a website where you can search for a song or a singer and add this songs in your Spotify playlist.</p>
                </Col>
              </Row>
            }
          </Modal.Body>
          <div className='line-bord-footer'>
            <Modal.Footer id='bord-nn' style={{ color: "#372309" }} className='p-5 pb-4 pt-4'>
              {activeBox === 1 &&
              <Row className='d-flex align-items-center'>
                <Col>
                  <p style={{ color: "#372309" }} className='project-text'>Also cool thing about this app is that after it will get the information from Open Weather it will choose proper image according to the description of the weather (clouds, rain, etc) and of course background and sun/moon changes accordingly.</p>
                </Col>
                <Col xs={5} >
                  <img src={ require('../assets/img/projects/weather-forecast.png')} className='project-img' />
                </Col>
              </Row>
              }
              {activeBox === 2 &&
              <Row className='d-flex align-items-center'>
                <Col>
                  <p style={{ color: "#372309" }} className='project-text'>Obviously, after you done choosing there is need to confirm order.
                      <br /><br />So here is really cute confirmation modal window)</p>
                    
                </Col>
                <Col xs={5} >
                  <img src={ require('../assets/img/projects/productCart.png')} className='project-img' />
                </Col>
              </Row>
              }
              {activeBox === 3 &&
              <Row className='d-flex align-items-center justify-content-between p-3'>
                <Col>
                  <p style={{ color: "#372309", lineHeight: '1.2rem' }} className='project-text pe-5'>My favourite thing about this one is the way how it looks on modile phone.
<br/>Just love hero section with it’s background + text combination</p>
                </Col>
                <Col xs={7} style={{ maxWidth: "155px" }} className='mb-0'>
                  <img src={ require('../assets/img/projects/constructionCompanyMobile.gif')} className='project-img' />
                </Col>
              </Row>
              }
              {activeBox === 4 &&
              <Row className='d-flex align-items-center justify-content-between p-3'>
                <Col>
                  <p style={{ color: "#372309", lineHeight: '1.5rem' }} className='project-text pe-5'>Used <span className='accent-text' style={{ color: "#372309" }}>React, JavaScript</span> for that one, also <span className='accent-text' style={{ color: "#372309" }}>Sass</span> styles.</p>
                </Col>
                <Col xs={4} className='mb-0'>
                  <img src={ require('../assets/img/projects/2048.gif')} className='project-img' />
                </Col>
              </Row>
              }
              {activeBox === 5 &&
              <Row className='d-flex align-items-center justify-content-between p-3'>
                <Col>
                  <p style={{ color: "#372309", lineHeight: '1.5rem' }} className='project-text pe-5'>Looks really pretty on mobile version. Full <span className='accent-text' style={{ color: "#372309" }}>HTML5, SCSS and a bit JS</span> website.

<br/><br/>I’m planning to add propper menu for mobile version and focus on modal window.</p>
                </Col>
                <Col xs={4} className='mb-0'>
                  <img src={ require('../assets/img/projects/modernBakeryMobile.png')} className='project-img' />
                </Col>
              </Row>
              }
              {activeBox === 6 &&
              <Row className='d-flex align-items-center justify-content-between p-3'>
                <Col>
                  <p style={{ color: "#372309", lineHeight: '1.2rem' }} className='project-text pe-5'>In this project I used <span className='accent-text' style={{ color: "#372309" }}>Spotify API</span>, so when user is using this one he needs to autorize in Spotify first, before making playlist.

<br/><br/>Made <span className='accent-text' style={{ color: "#372309" }}>React JS app with CSS3</span> for styling.</p>
                </Col>
                <Col xs={4} className='mb-0'>
                  <img src={ require('../assets/img/projects/jammming.png')} className='project-img' />
                </Col>
              </Row>
            }
            </Modal.Footer>
          </div>
        </div>
    </Modal>
    );
}