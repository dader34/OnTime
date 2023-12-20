import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <h1 className="display-4">Error 404</h1>
          <p className="lead">Sorry! We couldn't find the page you were looking for.</p>
          <Link to="/" className="btn btn-primary">
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
