import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { login } from "../app/slices/userSlice";
import { FaGoogle } from "react-icons/fa";

const Auth = () => {
  const dispatch = useDispatch();
  const onOk = (response) => {
    dispatch(
      login({
        profile: response?.profileObj,
        isLoggedIn: true,
        token: response?.accessToken,
      })
    );
  };
  const onBad = (err) => {
    console.error(err);
  };
  return (
    <div className="my-12 max-w-md mx-auto bg-gray-900 rounded shadow p-4">
      <h1 className="text-center text-2xl mb-6 font-semibold">
        Code along with friends, and join our community
      </h1>
      <GoogleLogin
        clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
        render={(renderProps) => (
          <button
            className="bg-gray-800 p-2 flex items-center space-x-2 rounded m-auto hover:opacity-80"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <FaGoogle />
            <span>Continue With Google</span>
          </button>
        )}
        buttonText="Login"
        onSuccess={onOk}
        onFailure={onBad}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default Auth;
