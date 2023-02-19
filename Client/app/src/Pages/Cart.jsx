import { Box, Center, Grid, Heading, Image, Flex } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext/AuthContext';

import CartProduct from './CartProduct';
import empty_bucket from '../Assets/images/empty_bucket.gif';
import { NavLink } from 'react-router-dom';
import SubTotal from '../Components/SubTotal';
import axios from 'axios';
const Cart = () => {
  // const { state } = useContext(CartContext);
  let [state, setstate] = useState([]);
  // let [delet, setdelet] = useState(false);
  let [total, settotal] = useState(0);
  const { setdelet, delet, authState } = useContext(AuthContext);
  // useEffect(()=>{
  //   fetch()
  // })

  const REACT_APP_BASEURL = process.env.REACT_APP_BASEURL;
  // ${REACT_APP_BASEURL}
  useEffect(() => {
    if (authState.token) {
      // console.log(authState);
      const config = {
        method: 'get',
        url: `${REACT_APP_BASEURL}/menu/addtocart`,
        headers: { Authorization: 'Bearer ' + authState.token },
      };
      axios(config)
        .then(function (response) {
          setstate(response.data);
          // console.log(response.data);
          // setstate(res);
          // console.log(res);
          let sum = 0;
          response.data.map((e) => {
            sum += e.price * e.quantity;
          });
          settotal(sum);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [delet]);

  return (
    <Box m='10% 10%'>
      <Grid
        display={{
          base: 'block',
          sm: 'block',
          md: 'block',
          lg: 'flex',
          xl: 'flex',
        }}
        gridTemplateColumns={{ base: '2fr,1fr', xl: '2fr 1fr' }}
        className='checkout'>
        <Box m='auto' className='checkout__left'>
          {/* <img
          className="checkout__add"
          src="https://images.ctfassets.net/wtodlh47qxpt/Na9oR4t8WKmSjIuy5pg4U/2fef58b44c29bbb4341ed116bac84f44/KFC_Maggi__Banner__1440x396px__2_.jpg?w=988&fit=fill&fm=webp"
          alt=""
        /> */}
          {state.length === 0 ? (
            <Box
              m='auto'
              // border="1px solid yellow"
            >
              <Center>Your Shopping Basket is Empty</Center>
              <NavLink to='/menu'>
                <Center>
                  <button className='btn_pill'>Click me for Order Now</button>
                </Center>
              </NavLink>

              <Center>
                <Image src={empty_bucket} />
              </Center>
            </Box>
          ) : (
            <Box>
              <Heading className='checkout__title'>Your Food Cart</Heading>
              {state?.map((item) => (
                <CartProduct
                  {...item}
                  setdelet={setdelet}
                  delet={delet}
                  key={item._id}
                />
              ))}
            </Box>
          )}
        </Box>
        {state && (
          <Box className='checkout__right'>
            <SubTotal total={total} />
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default Cart;
