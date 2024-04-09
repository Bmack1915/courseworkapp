import Cookies from "js-cookie";
import LoginForm from "./LoginForm";
import AccountForm from "./AccountForm";

const AuthCheck = ({ children }) => {
  if (Cookies.get("token")) {
    return children;
  }
  return (
    <div className="container">
      <AccountForm />;
    </div>
  );
};

export default AuthCheck;
