import { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import '../styles/AuthPage.css'; 

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useAuth();

  console.log(user)

  const handleAuth = (e) => {
    e.preventDefault();
    // Implement your authentication logic here
    if (isLogin) {
      // Login logic
      console.log('Logging in with:', name, password);
    } else {
      // Signup logic
      console.log('Signing up with:', name, password);
    }
  };

  //have 2 formik/yup schemas to handle both signup and login and choose which one based oof of auth state?

  return (
    <div style={{textAlign:'center'}}>
    <h1>OnTime</h1>
    <div className="container auth-container">
          <div className="auth-form">
            <h2>{isLogin ? 'Login' : 'Signup'}</h2>
            <form onSubmit={handleAuth}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Username
                </label>
                <input
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="password-confirm" className="form-label">
                  Confirm password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password-confirm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {isLogin ? 'Login' : 'Signup'}
              </button>
            </form>
            <p>
              {isLogin
                ? "Don't have an account? "
                : 'Already have an account? '}
              <span
                style={{cursor:"pointer",textDecoration:'underline'}}
                className="auth-toggle"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Signup here' : 'Login here'}
              </span>
            </p>
          </div>
      </div>
      </div>
  );
};

export default AuthPage;
