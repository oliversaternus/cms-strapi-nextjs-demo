import { useRef, useState } from 'react';

export function useCounter(start: number, end: number, time: number, interval: number, timing: 'linear' | 'ease-in' | 'ease-out') {
    const intervalRef = useRef<NodeJS.Timeout>();
    const passedTimeRef = useRef(0);
    const [value, setValue] = useState(start);

    const startCount = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setValue(start);
        passedTimeRef.current = 0;

        intervalRef.current = setInterval(() => {
            if (passedTimeRef.current > time && intervalRef.current) {
                clearInterval(intervalRef.current);
                return;
            }
            switch (timing) {
                case 'ease-in':
                    setValue(start + (end - start) * Math.pow((passedTimeRef.current / time), 2));
                    break;
                case 'ease-out':
                    setValue(start + (end - start) * Math.pow(passedTimeRef.current / time, 1 / 2));
                    break;
                case 'linear':
                    setValue(start + (end - start) * (passedTimeRef.current / time));
                    break;
            }
            passedTimeRef.current += interval;
        }, interval);
    };

    return { value, startCount };
}