// ContactModal.js
import { useEffect } from 'react';
import { StyledModal, StyledModalContent, Input, TexTarea, ModalButton, HeaderContact } from './ContactModalStyled';

const ContactModal = ({ isOpen, toggleModal }) => {

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
          <form>
            <Input type="text" placeholder="Your name" required /><br />
            <Input type="email" placeholder="Your email" required /><br />
            <TexTarea placeholder="Your message" required /><br />
            <ModalButton type="submit">Send Message</ModalButton>
            <ModalButton onClick={toggleModal}>Close</ModalButton>
          </form>
        </StyledModalContent>
      </StyledModal>
  );

};

export default ContactModal;
