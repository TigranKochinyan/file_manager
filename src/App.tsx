import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { history } from './redux/reducers';
import { Box } from '@mui/material';

import Main from './pages/Main';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Box className="App">
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
    </Box>
  );
}

export default App;
