
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

//   const refreshToken = () => {
//     return fetch('http://127.0.0.1:5555/refresh', {
//       method: 'POST',
//       credentials: 'include', // to send the HttpOnly cookie
//     })
//     .then(resp => resp.json())
//     .then(data => {
//       if (data.access_token) {
//         // Set the new access token in the state, local storage, or where you manage your tokens
//       }
//     })
//     .catch(error => console.error("Refresh token error:", error));
//   };

  const login = (username,password) => {
    return fetch('http://127.0.0.1:5555/login',{
        method:"POST",
        headers:{
            "Content-Type" : 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({"username":username,"password":password})
    })
    .then(resp => resp.json().then(data => resp.ok ? () =>{setUser(data)} : alert(data['error'])))
    .catch(() => alert("An error has occured, please try again."))

    
  };

  const signUp = (username,password) =>{

  }

  const logout = () => {
    // clear tokens / cookies
    // Set the user state to null 
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
