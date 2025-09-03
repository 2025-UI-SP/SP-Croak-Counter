
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="hero bg-light p-5 rounded shadow-sm mx-3 mx-md-5">
            <h1 className="display-4 mb-4 text-center">Croak Counter</h1>
            <p className="lead text-center">
              This website allows citizen scientists to perform call index surveys that will help the Keweenaw Bay Indian Community track Michigan frog populations.
              If you have prior experience with call index surveys, feel free to go directly to the survey page to perform a survey.
              If you have never performed a call index survey before, or would like to brush up on your frog knowledge, then go to the info page to learn about frogs and how the survey works.
            </p>
            <h3 className="mt-4 text-center">Useful Equipment to Bring:</h3>
            <ul className="mb-4 list-unstyled text-center">
              <li>Thermometer <strong>(Required)</strong></li>
              <li>Flashlight</li>
              <li>Map</li>
            </ul>
            <div className="d-flex justify-content-center gap-3">
              <Link to="/info">
                <button className="btn btn-primary btn-lg">Beginner Survey</button>
              </Link>
              <Link to="/survey">
                <button className="btn btn-success btn-lg">Advanced Survey</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
