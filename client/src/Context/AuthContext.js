
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
    const apiKey = process.env.REACT_APP_API_KEY

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return ''
    }

    const refreshUser = () => {
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
                        }
                    })
                        .catch(e => console.log(e))
                } else {
                    nav('/login')
                }
            }
        }).catch(e => console.log(e))
    }



    //Auth check + refresh
    useEffect(() => {
        refreshUser()
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
                    nav('/')
                    return data;
                } else {
                    return Promise.reject(new Error(data['error'] || 'Login failes'));
                }
            }))
            .catch(error => {
                toast.error(error.message || "An error has occurred, please try again.");
                return Promise.reject(error);
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
                    nav('/')
                    return data;
                } else {
                    return Promise.reject(new Error(data['error'] || 'Signup failed'));
                }
            }))
            .catch(error => {
                toast.error(error.message || "An error has occurred, please try again.");
                return Promise.reject(error);
            });
    };


    const logout = () => {
        setUser(null);
        fetch('/logout', { method: "DELETE" })
        nav('/login')
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, signUp, getCookie, apiKey }}>
            {children}
        </AuthContext.Provider>
    );
};
