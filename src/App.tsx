import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import useActions from './hooks/useActions';
import Header from './components/Header';
import Main from './pages/Main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';

function App() {
  const actions = useActions()

  const state = useSelector(state => state)

  useEffect(() => {
    actions.getPostsApi({ limit: 10 })
    actions.getCurrentFolder({ id: '1334' })
  }, [])  

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />}>
            {/* <Route path="folders" element={<LeftNavigation />}>
              <Route path=":teamId" element={<RightSide />} />
              <Route path="new" element={<RightSide />} />
              <Route index element={<>s</>} />
            </Route> */}
            <Route path="/folders">
              <Route path="*" element={<Main />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
