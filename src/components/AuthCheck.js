import Cookies from "js-cookie";

const AuthCheck = ({ children }) => {
  if (Cookies.get("token")) {
    return children;
  }
  return <div>Please log in to access this page.</div>;
};

export default AuthCheck;
