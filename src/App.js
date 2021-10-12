import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { login } from "./app/slices/userSlice";
import { Landing, Dashboard, Auth, Profile } from "./pages";
import NavBar from "./components/NavBar";

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      dispatch(login({ ...user }));
    }
  }, [dispatch]);

  return (
    <Router>
      <NavBar/>
      <Switch>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Route path="/profile" exact>
          {isLoggedIn ? <Profile /> : <Redirect to="/auth" />}
        </Route>
        <Route path="/dashboard/:projectName" exact>
          {isLoggedIn ? <Dashboard /> : <Redirect to="/auth" />}
        </Route>
        <Route path="/auth" exact>
          {!isLoggedIn ? <Auth /> : <Redirect to="/profile" />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
