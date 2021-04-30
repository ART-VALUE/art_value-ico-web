import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Modal from 'react-modal';
import PurchaseDialog from '../../components/purchaseDialog/PurchaseDialog';
import { io } from 'socket.io-client';
import { PAYMENT_NS } from '../../api';

const stripePromise = loadStripe(
	'pk_test_51ITna8JcDKL67QxNOgLJSMRVqFGagqi7pcHXCtewhqPyxqsWt5QrIWLeCoWXTZlZIi2gOhNSh3JE4M6Rr40VFhSJ00cmqxUD2d'
);
const paymentApiIo = io(`http://localhost:3000/${PAYMENT_NS}`);

Modal.setAppElement('#root');

export const HomeView = () => {
	const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
	const endDate = new Date(1615809936000).getMilliseconds();

	const handlePurchaseTokenClick = () => {
		setPurchaseDialogOpen(true);
	};

	const closeModal = () => {
		setPurchaseDialogOpen(false);
	};

	return (
		<div>
			<button onClick={handlePurchaseTokenClick}>Open Modal</button>
			<Modal
				isOpen={purchaseDialogOpen}
				className="PurchaseDialogModal"
				overlayClassName="PurchaseDialogModalOverlay"
				contentLabel="Coin Purchase Dialog"
				shouldCloseOnOverlayClick={true}
			>
				<PurchaseDialog stripePromise={stripePromise} paymentApiIo={paymentApiIo} />
				<button onClick={closeModal}>close</button>
			</Modal>
		</div>
	);
};
