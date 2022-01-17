import logo from './logo.svg';
import './App.css';
import Firebaseauth from './Components/Firebaseauth';
import Firestore from './Components/Firestore';
import FireStorage from './Components/FireStorage';

function App() {
  return (
    <>
      <Firebaseauth/>
      {/* <Firestore/> */}
      <FireStorage/>
    </>
  );
}

export default App;


