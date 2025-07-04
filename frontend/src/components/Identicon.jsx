import React, { useEffect, useRef } from 'react';
import jazzicon from 'jazzicon';

const Identicon = ({ address, size }) => {
  const ref = useRef();

  useEffect(() => {
    if (address && ref.current) {
      ref.current.innerHTML = '';
      ref.current.appendChild(jazzicon(size, parseInt(address.slice(2, 10), 16)));
    }
  }, [address, size]);

  return <div ref={ref} style={{ width: size, height: size }} />;
};

export default Identicon;
