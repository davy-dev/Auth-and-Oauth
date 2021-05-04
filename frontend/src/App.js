import {Link,Route, Switch}from "react-router-dom"
import Access from "./Access"
import Home from "./Home"
import Register from "./Register"
import SignIn from "./SignIn"
import "./styles/App.css"


function App() {
  return (
    <div className="App">
      <ul>
        <li><Link to="/signup">S'incrire </Link></li>
        <li><Link to="/signin">Se connecter </Link></li> 
      </ul>
     
 
    <Switch>
      
      <Route path="/" exact >
        <Home />
      </Route>
      
      <Route path="/signup">
      <Register/>
      </Route>

      <Route path="/signin">
        <SignIn/>
      </Route>

      <Route path="/access">
      <Access />
      </Route>

    </Switch>
    </div>
  );
}

export default App;
