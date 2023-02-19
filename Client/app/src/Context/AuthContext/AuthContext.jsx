import { createContext, useState } from 'react';

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [state, setState] = useState({
    isAuth: false,
    token: null,
  });

  const loginUser = (token) => {
    setState({
      ...state,
      isAuth: true,
      token,
    });
  };

  const logoutUser = () => {
    setState({
      ...state,
      isAuth: false,
      token: null,
    });
  };
  let [delet, setdelet] = useState(false);

  const [cartitem, Setcartitem] = useState(0);
  return (
    <AuthContext.Provider
      value={{
        authState: state,
        loginUser,
        logoutUser,
        setdelet,
        delet,
        Setcartitem,
        cartitem,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
