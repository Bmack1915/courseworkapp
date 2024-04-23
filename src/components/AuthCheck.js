import Cookies from "js-cookie";
import LoginForm from "./LoginForm";
import AccountForm from "./AccountForm";
import Features from "./Features";

const AuthCheck = ({ children }) => {
  if (Cookies.get("token")) {
    return children;
  }
  return (
    <>
      <header className="bg-light py-5">
        <div className="container px-5">
          <div className="row gx-5 align-items-center justify-content-between">
            <div className="col-lg-4 text-center text-lg-start">
              <h1 className="display-5 fw-bolder text-black mb-2">
                Uh oh! You must sign in to build your Fantasy Team!
              </h1>
              <p className="lead fw-normal text-black-50 mb-4">
                Please sign in, or register if you are new here, using the sign
                in form on this page.
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
      <div>
        <Features />
      </div>
    </>
  );
};

export default AuthCheck;
