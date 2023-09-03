import React from 'react';

interface ConfirmationModalProps {
    title: string;
    message: string;
    successButtonName: string;
    successAction:  (id: any) => void; 
    modalData: any; 
    closeModal: () => void;
  }
const ConfirmationModal = ({title,message,successButtonName,successAction,modalData,closeModal}: ConfirmationModalProps) => {
    return (
        <div>
            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}!</h3>
                    <p className="py-4">{message}!</p>
                    <div className="modal-action">
                        <label onClick={()=>successAction(modalData)}  htmlFor="confirmation-modal" className="btn bg-red-600 text-white">{successButtonName}</label>
                        <button onClick={closeModal} className='btn btn-outline'>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;