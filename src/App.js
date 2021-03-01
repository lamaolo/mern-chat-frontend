import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Chat from "./pages/Chat";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/chat/:id" exact={true} component={Chat} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
