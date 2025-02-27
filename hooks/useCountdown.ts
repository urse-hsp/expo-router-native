/**
 * 倒计时hooks
 */
import { useState, useEffect } from 'react';

const useCountdown = (initialTime = 60) => {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer: any = null;
    if (isActive && time > 0) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(timer);
      setIsActive(false);
      setTime(initialTime); // 初始化
    }

    // 清理副作用
    return () => clearInterval(timer);
  }, [isActive, time]);

  const start = () => setIsActive(true);
  const stop = () => setIsActive(false);
  const reset = () => setTime(initialTime);

  return { time, start, stop, reset, isActive };
};

export default useCountdown;
