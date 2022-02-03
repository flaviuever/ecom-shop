import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ItemModal = ({show, 
    onHide, 
    modalImg, 
    modalName, 
    modalCategory, 
    modalPrice, 
    modalDescription,
    modalShortDescription,
    selectedLanguage}) => {
    
return (
        <Modal
        show = {show}
        onHide = {onHide} 
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            {modalName}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <img 
                id="modalImg"
                className="mb-4"
                src={modalImg} 
                alt = "img" 
                style={{ height: '300px', width: '227,82px' }}
                />
                
                <p>{selectedLanguage.labelForName} : {modalName}</p>
                <p>{selectedLanguage.labelForCategory}: {modalCategory}</p>
                <p>{selectedLanguage.labelForDescription} : {modalDescription}</p>
                <p>{selectedLanguage.labelForShortDescription} : {modalShortDescription}</p>
                <p>{selectedLanguage.labelForPrice} : {modalPrice}</p>

        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
        </Modal>
       
    );
}

export default ItemModal;