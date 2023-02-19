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

  return (
    <AuthContext.Provider
      value={{ authState: state, loginUser, logoutUser, setdelet, delet }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
