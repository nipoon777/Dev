import './App.css';
import Banner from './Components/Banner';
import Favorites from './Components/Favorites';
import Movies from './Components/Movies';
import NavBar from './Components/NavBar';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
    
    <Router>
      <NavBar/>
      <Routes>
          <Route path = '/'>
              <Route path ="" element = {<><Banner/> <Movies/></>}/>
          </Route>
          <Route path = '/favorites' element = {<Favorites/>}/>
      </Routes>

    </Router>
  
  );
}

export default App;
