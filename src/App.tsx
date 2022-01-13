import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { history } from './redux/reducers';

import Main from './pages/Main';
import './App.css';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/not-found">
            <NotFound />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </ConnectedRouter>
    </div>
  );
}

export default App;
