import { createContext, useReducer } from 'react';
import React, { useEffect, useState } from 'react';

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(reducer, initialState);

  const [locationn, setlocation] = useState('');

  // console.log(state.basket)
  useEffect(() => {
    const success = async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setTimeout(() => {
        fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        )
          .then((res) => {
            return res.json();
          })
          .then((ress) => {
            // return data;
            // console.log(ress.locality);
            setlocation(ress.locality);
          })
          .catch((error) => {
            setlocation('set Manually');
          });
      }, 2000);
    };

    const error = () => {
      // root.textContent = 'Unable to retrive your location';
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      // root.textContent = "Geolocation isn't supported by your browser";
    }
  }, []);

  return (
    <CartContext.Provider value={{ locationn }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
