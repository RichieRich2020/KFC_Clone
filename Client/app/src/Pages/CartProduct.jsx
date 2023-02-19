import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';
// import { CartContext } from '../Context/CartContext/CartContext';
import { AuthContext } from '../Context/AuthContext/AuthContext';
import { useContext } from 'react';
import axios from 'axios';
const CartProduct = ({
  _id,
  id,
  name,
  images,
  price,
  type,
  quantity,
  description,
  setdelet,
  delet,
}) => {
  // const { state, dispatch } = useContext(CartContext);
  console.log(id, name, images, price, type, quantity, description);
  const { authState } = useContext(AuthContext);
  return (
    <Box
      m='40px auto'
      gap={50}
      display={{
        base: 'block',
        sm: 'block',
        md: 'flex',
        lg: 'flex',
        xl: 'flex',
      }}
      className='checkoutProduct'>
      <Image
        w={{ base: '70%', md: '30%' }}
        className='checkoutProduct__image'
        src={images}
        alt=''
      />

      <Box className='checkoutProduct__info'>
        <Box>
          <b className='checkoutProduct__title'>{name}</b>
          <Text className='checkoutProduct__price'>
            <small>₹</small>
            <strong>{price}</strong>
          </Text>
          <Text className='checkoutProduct__price'>
            <strong>{type}</strong>
          </Text>
          <Text className='checkoutProduct__price'>
            <strong>{type}</strong>
          </Text>
          <Text className='checkoutProduct__price'>
            <strong>Quantity:- {quantity} </strong>
          </Text>
        </Box>
        <Box>
          <button
            className='btn_pill'
            onClick={() => {
              const config = {
                method: 'delete',
                url: `http://localhost:3501/menu/addtocartdelete/${_id}`,
                headers: { Authorization: 'Bearer ' + authState.token },
              };
              axios(config)
                .then(function (response) {
                  // console.log(response);
                  setdelet(!delet);
                  // setdelete(deletstate + 1);
                })
                .catch(function (error) {
                  console.log(error);
                });
            }}>
            Remove from Cart
          </button>
        </Box>
      </Box>
    </Box>
  );
};

export default CartProduct;
