
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-11 col-lg-10">
          <div className="landing-hero p-5 rounded-4 soft-shadow mx-3 mx-md-5 text-center">
            <h1 className="display-4 mb-3">🐸 Croak Counter</h1>
            <div className="d-flex justify-content-center flex-wrap gap-2 mb-3">
              <span className="chip">Michigan Technology University</span>
            </div>
            <p className="lead mx-auto" style={{maxWidth: '60ch'}}>
              Help the Keweenaw Bay Indian Community track frog populations using
              quick call index surveys.
            </p>

            <hr className="my-4 divider" />
            <h3 className="mb-3">Useful Equipment to Bring</h3>
            <ul className="mb-4 list-unstyled">
              <li>Thermometer <strong>(Required)</strong></li>
              <li>Flashlight</li>
              <li>Map</li>
            </ul>

            <div className="d-flex justify-content-center gap-3">
              <Link to="/help">
                <button className="btn btn-primary btn-lg btn-pill">Beginner Survey</button>
              </Link>
              <Link to="/survey">
                <button className="btn btn-success btn-lg btn-pill">Advanced Survey</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
