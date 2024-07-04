import { useEffect} from 'react';

const useResizeCheck = (ref, callback) => {
    useEffect(() => {
        const observeTarget = ref.current;
        const resizeObserver = new ResizeObserver((entries) => {
            callback(entries);
        });

        resizeObserver.observe(observeTarget);

        return () => {
            resizeObserver.unobserve(observeTarget);
        };
    }, [ref, callback]);
}
export default useResizeCheck;