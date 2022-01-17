import logo from './logo.svg';
import './App.css';
import Us from './Components/Us';
import Ue from './Components/Ue';
import Ue1 from './Components/Ue1';
import context from './Components/Context';
import {useState} from 'react';
import Navbar from './Components/Navbar';
import Parent from './Components/Parent';
import Parent1 from './Components/Parent1';

function App() {
  const [theme, settheme] = useState(false);
  return (
    <context.Provider value={theme}>
    {/* <Us/> */}
    {/* <Ue/> */}
    {/* <Ue1/> */}
    <button onClick={ () => settheme(!theme)}>Change theme</button>
    <Navbar/>
    <Parent/>
    <Parent1/>
    </context.Provider>
  );
}

export default App;
