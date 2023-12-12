
import { createContext, useContext, useState } from 'react';

export const AuthContext = createContext({
  user:'',
  isLoggedIn:false,
  onLogIn:(data)=>{},
  onLogOut:()=>{},
})


export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState();


  const loginHandler = (userData) => {
    setUser(userData?.user);
    setIsLoggedIn(userData.isLoginEnable)
    localStorage.setItem('user', JSON.stringify(userData));

  };

  const logoutHandler = () => {

    localStorage.removeItem('user');
    localStorage.clear()
    setUser(null);
    setIsLoggedIn(false)
  };

  return (
    <AuthContext.Provider value={{ user,isLoggedIn, onLogIn:loginHandler, onLogout:logoutHandler }}>
      {children}
    </AuthContext.Provider>
  );
};


