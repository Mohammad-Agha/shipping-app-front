import { BrowserRouter, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Shipments from "./components/Shipment/Shipments";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <ProtectedRoute
            exact
            path="/"
            render={(props) => <Shipments {...props} />}
          />
          <ProtectedRoute
            path="/shipments"
            render={(props) => <Shipments {...props} />}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
