import './App.css';
import Login from './components/forms/Login';
import Sidebar from './components/Sidebar';
import Home from './components/pages/Home';
import Screeners from './components/pages/Screeners';
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Clients from './components/pages/Clients';



function App() {
  const [user, setUser] = useState(null);
  
  return (
    !user ?
     <Router>   
        <Sidebar />
        <div className="home__container">
          <Switch>  
                <Route exact path="/home">
                    <Home />
                </Route>
                <Route exact path="/screeners">
                    <Screeners />
                </Route>
                <Route exact path="/clients">
                    <Clients />
                </Route>
                
                <Route exact path="/logout">
                    <Login />
                </Route>
          </Switch> 
        </div>
    </Router> : <Login />
  );
}

export default App;
