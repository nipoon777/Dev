import './App.css';
import AuthProvider from './Context/AuthProvider';
import SignUp from './Components/SignUp';
function App() {
  return (
    <AuthProvider>
 
      <SignUp/>       {/* <h1>Hello</h1> */}

    </AuthProvider>
  
  );
}

export default App;
