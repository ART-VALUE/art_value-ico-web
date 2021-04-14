import { useEffect } from 'react';
/* TODO: type ref prop */
export const useOnClickOutside = (ref:any, handler:Function) => {
	useEffect(() => {
		const listener = (event: MouseEvent): void => {
			if (!ref.current || ref.current.contains(event.target)) {
				return;
			}
			handler(event);
		};
		document.addEventListener('mousedown', listener);
		return () => {
			document.removeEventListener('mousedown', listener);
		};
	}, [ref, handler]);
};
