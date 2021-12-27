// import Folder from './components/Folder';
// import File from './components/File';
import Header from './components/Header';
import LeftNavigation from './components/LeftNavigation';
import RightSide from './components/RightSide';
import ContainerMy from './components/Container';
import Main from './pages/Main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';

function App() {
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
