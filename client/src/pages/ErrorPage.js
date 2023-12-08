import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ErrorPage.css'; // Import your CSS file with styles

const ErrorPage = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-heading">Error 404</h1>
        <p className="error-message">Sorry! We couldnt find the page you were looking for</p>
        <Link to="/" className="btn btn-primary">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
