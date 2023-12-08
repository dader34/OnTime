import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Jumbotron */}
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-4">OnTime Dashboard</h1>
          <p className="lead">
            Explore and discover exciting events in your community.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <h2>Upcoming Events</h2>
            list of upcoming events or other relevant content
          </div>
          <div className="col-md-6">
            <h2>Featured Categories</h2>
            list of featured categories or other relevant content
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
