import React from 'react';
import { Card, Modal as Backdrop } from 'react-onsenui';

const Modal = ({showModal, children}:Props) =>{

  return(
    <Backdrop isOpen={showModal}>
      <div>
        <Card modifier="modal">
      {children}
        </Card>
      </div>
    </Backdrop>
  )
}

interface Props{
  showModal: boolean
  setShowModal: Function,
  children: any
}

export default Modal
