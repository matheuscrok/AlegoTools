import { HashRouter as Router, Route } from 'react-router-dom';
import './App.scss';

import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

import Home from '../pages/home/Home';
import Programs from '../pages/programs/Programs';
import System from '../pages/system/System';
import Drivers from '../pages/drivers/Drivers';

function App() {
  return (
    <Router>
      <div className="app">
        <div className="app__container-top">
          <Navbar />

          <div className="app__page-rendered">
            <Route path='/' exact component={Home} />
            <Route path='/programs' exact component={Programs} />
            <Route path='/drivers' exact component={Drivers} />
            <Route path='/system' exact component={System} />
          </div>
        </div>

        <div className="app__container-bottom">
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
