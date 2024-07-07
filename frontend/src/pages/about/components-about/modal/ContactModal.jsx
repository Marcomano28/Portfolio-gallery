// ContactModal.js
import { useEffect, useState } from 'react';
import { StyledModal, StyledModalContent, Input, TexTarea, ModalButton, HeaderContact } from './ContactModalStyled';

const ContactModal = ({ isOpen, toggleModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => ({
    ...prev,
    [name]: value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail();
  };

  const sendEmail = () => {
    fetch('http://localhost:4000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData),
      
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
        return response.json();
    })
    .then(data => {
      alert('Message sent successfully: ' + data.message);
      setFormData({ name: '', email: '', message: '' });
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('There was a problem sending the message.');
    });
  }
  const handleModalTransition = () => {
    const modalContent = document.querySelector('.ReactModal__Content');
    if (modalContent) {
      modalContent.style.transition = 'transform 0.8s ease';
      modalContent.style.transform = isOpen ? 'rotateY(0deg)' : 'rotateY(-90deg)';
    }
  };

  useEffect(() => {
    handleModalTransition();
  }, [isOpen]);

  return (
      <StyledModal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.15)',
            perspective: '1500px',
            zIndex: 10
          },   
        }}
        contentLabel="Contact Form"
      >
        <StyledModalContent>
          <HeaderContact>Contact Me</HeaderContact>
          <form onSubmit={handleSubmit}>
            <Input type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required /><br />
            <Input type="email" name="email" placeholder="Your email" value={formData.email} onChange={handleChange} required /><br />
            <TexTarea name='message' placeholder="Your message" value={formData.message} onChange={handleChange} required /><br />
            <ModalButton type="submit">Send Message</ModalButton>
            <ModalButton type="button" onClick={toggleModal}>Close</ModalButton>
          </form>
        </StyledModalContent>
      </StyledModal>
  );

};

export default ContactModal;
