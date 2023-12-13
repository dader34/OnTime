
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const nav = useNavigate()
    const location = useLocation()

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

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return ''
    }

    const handleNewError = (error) => {
        alert(error)
    }

    useEffect(() => {
        //Make fetch to backend user route
        // Set user if jwt is valid and 
        fetch('/user', {
            credentials: 'include'
        }).then(res => {
            if (res.ok) {
                res.json().then(data => setUser(data))
            } else {
                if (res.status === 401) {
                    fetch('/refresh', {
                        method: 'POST',
                        headers: {
                            'X-CSRF-TOKEN': getCookie('csrf_refresh_token')
                        }
                    }).then(res => {
                        if (res.ok) {
                            res.json().then(data => setUser(data))
                        } else {
                            nav('/login')
                            // res.json().then(err => handleNewError(err['error'] || err.msg))
                        }
                    })
                } else {
                    res.json().then(err => handleNewError(err['error'] || err.msg))
                    toast.error("Refresh token has expired")
                    nav('/login')
                }
            }
        })

        // .then(resp => resp.json().then(data => resp.ok ? (()=>{setUser(data);return true})() : nav('/login')))
        // .catch(() => {alert("An error has occured, please try again.");nav('/login')})
    }, [location.pathname, nav])


    const login = (username, password) => {
        return fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ "username": username, "password": password })
        })
            .then(resp => resp.json().then(data => {
                if (resp.ok) {
                    setUser(data);
                    return data; // Resolve with data
                } else {
                    return Promise.reject(new Error(data['error'] || 'An error occurred')); // Return a rejected promise
                }
            }))
            .catch(error => {
                // handle the error but don't re-throw it
                toast.error(error.message || "An error has occurred, please try again.");
                return Promise.reject(error); // Return the rejected promise
            })
    };


    const signUp = (username, password) => {
        return fetch('/signup', {
          method: "POST",
          headers: {
            "Content-Type": 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ "username": username, "password": password })
        })
        .then(resp => resp.json().then(data => {
          if (resp.ok) {
            setUser(data);
            return data; // Resolve with data
          } else {
            // toast.error(data['error'] || 'Signup failed');
            return Promise.reject(new Error(data['error'] || 'Signup failed')); // Return a rejected promise
          }
        }))
        .catch(error => {
          toast.error(error.message || "An error has occurred, please try again.");
          return Promise.reject(error); // Return the rejected promise
        });
      };
      

    const logout = () => {
        setUser(null);
        fetch('/logout', { method: "DELETE" })
        nav('/login')
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, signUp }}>
            {children}
        </AuthContext.Provider>
    );
};
