import './contacts.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
export default function Contacts({ show, onHide  }) {
    
    return (
        <Modal show={show} onHide={onHide} centered>
            <div className='bg-container'>
                <div className='line-bord-header'>
                    <Modal.Header closeButton style={{ color: "#372309" }} id='bord-nn'>
                        <Modal.Title>Contact Information</Modal.Title>
                    </Modal.Header>
                </div>
                <Modal.Body >
                    <p style={{ color: "#372309" }}>Email: <a href='mailto:z2507dasha@gmail.com' target='_blank' style={{ color: "#372309" }}>z2507dasha@gmail.com</a></p>
                    <p style={{ color: "#372309" }}>GitHub: <a href='https://github.com/dainntyy' target='_blank' style={{ color: "#372309" }}>@dainntyy</a></p>
                    <p style={{ color: "#372309" }}>Insta: <a href='https://www.instagram.com/dainntyy?igsh=OHV1eWxmY3M5cnU4' target='_blank' style={{ color: "#372309" }}>@dainntyy</a></p>
                </Modal.Body>
                <div className='line-bord-footer'>
                    <Modal.Footer id='bord-nn'>
                        <Button
                            variant='outline-dark'
                        onClick={() => window.open('/resume_Daria_upd.pdf', '_blank')}>
                        View Resume
                        </Button>
                    </Modal.Footer>
                </div>
            </div>
        </Modal>
    );
}