import { FunctionComponent, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Modal from 'react-modal';
import PurchaseDialog from '../../components/purchaseDialog/PurchaseDialog';
import { Socket } from 'socket.io-client';

const stripePromise = loadStripe(
	'pk_test_51ITna8JcDKL67QxNOgLJSMRVqFGagqi7pcHXCtewhqPyxqsWt5QrIWLeCoWXTZlZIi2gOhNSh3JE4M6Rr40VFhSJ00cmqxUD2d'
);

Modal.setAppElement('#root');

export const HomeView: FunctionComponent<{
  io: Socket
}> = ({ io }) => {
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
				<PurchaseDialog stripePromise={stripePromise} io={io} />
				<button onClick={closeModal}>close</button>
			</Modal>
		</div>
	);
};
