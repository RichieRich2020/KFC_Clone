import {
  Box,
  GridItem,
  Image,
  Text,
  Flex,
  HStack,
  Button,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import veg from '../Assets/images/veg.svg';
import non_veg from '../Assets/images/non_veg.svg';
import axios from 'axios';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Icon_Add_to_Cart from '../Assets/images/Icon_Add_to_Cart.svg';
// import { initialState } from '../Context/CartContext/reducer';
import { AuthContext } from '../Context/AuthContext/AuthContext';

const SingleCard = ({ id, images, name, type, price, description }) => {
  const { authState, Setcartitem } = useContext(AuthContext);
  // const { setdelet, delet, Setcartitem } = useContext(AuthContext);
  // let [statee, setstatee] = useState({
  //   images: ' ',
  //   name: ' ',
  //   type: ' ',
  //   price: ' ',
  //   description: ' ',
  // });

  const REACT_APP_BASEURL = process.env.REACT_APP_BASEURL;
  // ${REACT_APP_BASEURL}
  function sub() {
    console.log(authState);
    let obj = {
      id: id,
      images: images,
      name: name,
      price: price,
      description: description,
      type: type,
    };
    // console.log(statee);
    const config = {
      method: 'post',
      data: { ...obj },
      url: `${REACT_APP_BASEURL}/menu/addtocart`,
      headers: { Authorization: 'Bearer ' + authState.token },
    };
    axios(config)
      .then(function (response) {
        // console.log(response, 'sassa');
        Setcartitem(response.data.length);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Box w='400px' h='550px'>
      <GridItem>
        <Box>
          <Image w='100%' borderRadius='4px 4px' h='fit-content' src={images} />
        </Box>
        <Box>
          {/* <b>{name}</b> */}
          <br />
          <b>{name}</b>

          <HStack fontSize='13px'>
            <Flex m='10px 0' gap={2}>
              {type === 'Veg' ? (
                <Image src={veg} alt={type} />
              ) : (
                <Image src={non_veg} alt={type} />
              )}
              {type}
            </Flex>
          </HStack>
          <b margin='5px 0'>₹{price}</b>
          <Text m='5px auto' fontSize='13px'>
            {description}
          </Text>
          <button onClick={sub} className='btn_pill' bg='#e4002b'>
            <HStack>
              <Text>Add to Cart</Text>
              <Image src={Icon_Add_to_Cart} alt='bucket' />
            </HStack>{' '}
          </button>
        </Box>
      </GridItem>
    </Box>
  );
};
export default SingleCard;
