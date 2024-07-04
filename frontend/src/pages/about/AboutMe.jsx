import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { AboutText } from '../about/components-about/text/AboutText'
import { KeyCanvas } from "../about/components-about/sketch/KeyCanvas"
import {NavAbout} from '../about/components-about/navigation/NavAbout'
import sketch from '../../JsSketchs/AboutSketch'
import { Container, AboutWraper } from "./AboutMeStyled"
import ContactModal from '../about/components-about/modal/ContactModal'

export const AboutMe = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
      setIsOpen(!isOpen);
  };

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);
  return (
    <AboutWraper>
      <NavAbout />
      <Container>
        <KeyCanvas sketch={sketch}/>
        <AboutText toggleModal={toggleModal}/>
      </Container>
      <ContactModal isOpen={isOpen} toggleModal={toggleModal} />
    </AboutWraper>
  )
}
