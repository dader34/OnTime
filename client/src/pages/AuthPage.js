import { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useFormik } from 'formik';
import '../styles/AuthPage.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, signUp } = useAuth();
  const nav = useNavigate()


  const handleFormikChange = (field, value, form) => {
    form.setFieldValue(field, value)
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().min(5, "Username must be at least 5 characters").max(15, "Username has to be 15 characters or less").required("Username is required"),
      password: Yup.string().min(5, "Password must be at least 5 characters").max(15, "Password has to be 15 characters or less").required("Password is required")
    }),
    onSubmit: async (values) => {
      try {
        await toast.promise(
          login(formik.values.name, formik.values.password),
          {
            pending: "Logging in...",
            success: "Successfully logged in!",
            error: "Login failed"
          }
        );
      } catch (e) {

      }

    }
  });

  const formiksignup = useFormik({
    initialValues: {
      name: '',
      password: '',
      passwordConfirm: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().min(5, "Username must be at least 5 characters").max(15, "Username has to be 15 characters or less").required("Username is required"),
      password: Yup.string().min(5, "Password must be at least 5 characters").max(15, "Password has to be 15 characters or less").required("Password is required"),
      passwordConfirm: Yup.string().test('passwords-match', 'Passwords must match', (value) => value === formiksignup.values.password).required("Passwords must match")
    }),
    onSubmit: async (values) => {
      // Use toast.promise to wrap the asynchronous operation
      try {
        await toast.promise(
          signUp(formiksignup.values.name, formiksignup.values.password),
          {
            pending: "Signing up...",
            success: "Successfully signed up!",
            error: "Sign up failed"
          }
        );
      } catch (e) {

      }

    }
  });


  const handleAuth = async (e, form) => {
    e.preventDefault();
    await form.submitForm()

    const errors = await form.validateForm();

    const errorKeys = Object.keys(errors)

    if (Object.keys(errors).length > 0) {
      toast.error(errors[errorKeys[0]])
    }

  };


  //have 2 formik/yup schemas to handle both signup and login and choose which one based off of auth state?

  return (
    <div style={{ textAlign: 'center' }} className="page-container" >
      <h1>OnTime</h1>
      <div className="container auth-container">
        <div className="auth-form">
          <h2>{isLogin ? 'Login' : 'Signup'}</h2>
          <form onSubmit={e => handleAuth(e, isLogin ? formik : formiksignup)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Username
              </label>
              <input
                className="form-control"
                id="name"
                value={isLogin ? formik.values.name : formiksignup.values.name}
                onChange={(e) => handleFormikChange("name", e.target.value, isLogin ? formik : formiksignup)}
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
                value={isLogin ? formik.values.password : formiksignup.values.password}
                onChange={(e) => handleFormikChange("password", e.target.value, isLogin ? formik : formiksignup)}
                required
              />

            </div>
            {!isLogin &&
              <div className="mb-3">
                <label htmlFor="password-confirm" className="form-label">
                  Confirm password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password-confirm"
                  value={formiksignup.values.passwordConfirm}
                  onChange={(e) => handleFormikChange('passwordConfirm', e.target.value, formiksignup)}
                  required
                />
              </div>
            }
            <button type="submit" className="btn btn-primary">
              {isLogin ? 'Login' : 'Signup'}
            </button>
          </form>
          <p>
            {isLogin
              ? "Don't have an account? "
              : 'Already have an account? '}
            <span
              style={{ cursor: "pointer", textDecoration: 'underline' }}
              className="auth-toggle"
              onClick={() => { setIsLogin(!isLogin); formik.resetForm(); formiksignup.resetForm() }}
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
