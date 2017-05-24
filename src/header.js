import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

class Header extends Component {

    render() {
        return (
            <Link to="/">
            <div className="container">
            <div className="App">
              <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Welcome to React</h2>
              </div>
            </div>
            </div>
            </Link>
        );
    }
}

export default Header;
