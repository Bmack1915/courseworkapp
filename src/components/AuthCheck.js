import Cookies from "js-cookie";
import LoginForm from "./LoginForm";
import AccountForm from "./AccountForm";

const AuthCheck = ({ children }) => {
  if (Cookies.get("token")) {
    return children;
  }
  return (
    <div className="container">
      <header className="bg-light py-5">
        <div className="container px-5">
          <div className="row gx-5 align-items-center justify-content-between">
            <div className="col-lg-4 text-center text-lg-start">
              <h1 className="display-5 fw-bolder text-black mb-2">
                Uh Oh! You must sign in to build your fantasy team!
              </h1>
              <p className="lead fw-normal text-white-50 mb-4">
                Please sign in to access all features
              </p>
              <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-lg-start"></div>
            </div>

            <div className="col-lg-4 d-none d-lg-block text-center">
              <img
                className="img-fluid rounded-3 my-5"
                src="/team-badges/league.png"
              />
            </div>

            <div className="col-lg-4">
              <AccountForm />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default AuthCheck;
