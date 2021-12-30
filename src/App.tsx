import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { history } from './redux/reducers';


import Main from './pages/Main';
import './App.css';

function App() {
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        {/* <Header /> */}
        <Switch>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </ConnectedRouter>
    </div>
  );
}

export default App;
