import './App.css';
import {BrowserRouter as Router, Route,Routes} from "react-router-dom";
import Join from "./components/Join/Join.js";
import Chat from "./components/Chat/chat.js";
function App() {

  return (
    <div className="App">
     <Router>
      <Routes>
     <Route exact path="/" Component={Join}/>
     <Route exact path="/chat" Component={Chat}/>
     </Routes>
     </Router>
    </div>
  );
}

export default App;
