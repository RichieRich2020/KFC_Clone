import React, { useContext, useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import vfc_logo from '../Assets/images/vfc_logo.png';
import { AuthContext } from '../Context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import {
  Box,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import loader_gif from '../Assets/images/loader_gif.gif';
import { EmailIcon } from '@chakra-ui/icons';

const AfterLogin = () => {
  const [data, setdata] = useState({
    email: '',
    password: '',
  });
  const [password, setPassword] = useState('');
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { loginUser, authState } = useContext(AuthContext);
  const navigate = useNavigate();
  //   const handleSubmit = (e) => {
  //     // console.log(email, password);
  //     e.preventDefault();
  //     // setLoading(true);
  //     fetch('http://localhost:3501/users/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ ...data }),
  //     })
  //       .then((res) => res.json())
  //       .then((res) => {
  // if (res.token) {
  //   toast({
  //     position: 'top',
  //     title: 'Account created.',
  //     description: "We've created your account for you.",
  //     status: 'success',
  //     duration: 9000,
  //     isClosable: true,
  //   });
  //   // loginUser(res.token);
  //   navigate('/');
  // }
  //         console.log(res);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //     console.log(data);
  //   };
  function handleSubmit(e) {
    e.preventDefault();
    if (!data.email || !data.password) {
      alert('fill all inputs');
    }

    const REACT_APP_BASEURL = process.env.REACT_APP_BASEURL;
    // ${REACT_APP_BASEURL}
    // console.log(data);
    axios
      .post(`${REACT_APP_BASEURL}/users/login`, {
        ...data,
      })
      .then(function (response) {
        console.log(response.data);
        let objj = {
          username: data.email,
          token: response.data,
        };
        // console.log();
        // localStorage.setItem('user', JSON.stringify(objj));
        loginUser(response.data);
        navigate('/');
      })
      .catch(function (error) {
        toast({
          position: 'top',
          title: 'wrong email id or password.',
          description: ' Try again',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        // navigate('/login');
        console.log(error);
      });
  }

  if (loading) {
    return (
      <Center>
        <Image z-index='5' src={loader_gif} />
      </Center>
    );
  }

  return (
    <Center>
      <Box
        m=' 50px auto'
        p='auto 10%'
        w={{ base: '80%', sm: '80%', md: '70%', lg: '40%' }}>
        <Heading m={{ lg: '20px auto' }}>Log In</Heading>
        <Box>
          <form onSubmit={handleSubmit}>
            <Heading
              m='20px auto 10px'
              fontSize='18px'
              fontWeight='600'
              letterSpacing='1px'
              color='#e4002b'>
              Email address
            </Heading>
            <Input
              focusBorderColor='#e4002b'
              color='black'
              type='email'
              // value={email}
              onChange={(e) =>
                setdata({
                  ...data,
                  email: e.target.value,
                })
              }
            />
            <Heading
              m='20px auto 10px'
              color='#e4002b'
              fontSize='18px'
              fontWeight='600'
              letterSpacing='1px'>
              Password
            </Heading>
            <Input
              focusBorderColor='#e4002b'
              color='black'
              type='password'
              // value={password}
              onChange={(e) =>
                setdata({
                  ...data,
                  password: e.target.value,
                })
              }
            />

            <Input
              letterSpacing='1px'
              fontWeight='600'
              color='#fff'
              bg='#e4002b'
              type='submit'
              mt='30px'
            />
          </form>
        </Box>
      </Box>
    </Center>

    // <div className="login">
    //   <Link to="/">
    //     <img className="login__logo" src={vfc_logo} />
    //   </Link>
    //   <div className="login__container">
    //     <h1>Sign in</h1>
    //     <form onSubmit={handleSubmit}>
    //       <h5>E-mail</h5>
    //       <Input type="email" value={email} onChange={e => setEmail(e.target.value)}/>

    //       <h5>Password</h5>
    //       <Input
    //         type="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />

    //       <button className="login__signInButton" type="submit">
    //         Sign in
    //       </button>
    //     </form>
    //     <p>
    //       By continuing, you agree to Vfc's Conditions of Use and Privacy
    //       Notice.
    //     </p>
    //   </div>
    // </div>

    // {/* <button className="login__registerButton"  >Create your Vfc Account</button> */}
  );
};

export default AfterLogin;
