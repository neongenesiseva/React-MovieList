import React from 'react'
import {BrowserRouter as Router,
        Route,
        Link} from 'react-router-dom'
import App from './App'
import About from './about'

class Routing extends React.Component{
  render(){
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
          <Route exact path="/" component={App}/>
          <Route path="/about" component={About}/>
        </div>
      </Router>
    )
  }
}

export default Routing;
