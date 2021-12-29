import { useSelector } from 'react-redux';

import Header from './components/Header';
import Main from './pages/Main';
import Folders from './pages/Folders';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {

  const store = useSelector(store => store);

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Folders />}>
            {/* <Route path="folders" element={<LeftNavigation />}>
              <Route path=":teamId" element={<RightSide />} />
              <Route path="new" element={<RightSide />} />
              <Route index element={<>s</>} />
            </Route> */}
            <Route path="folders" >
              <Route path="*" element={<Main />} />
            </Route>
            <Route path="*" element={<Folders />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
