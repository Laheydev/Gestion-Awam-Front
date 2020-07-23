import React, { Component } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import 'react-dropdown/style.css';
import './App.css';
import './theme-forest/css/theme.css';
import './theme-forest/css/theme_color_skins.css';


class App extends Component {


  render() {
    return (
      <div className="container-fluid">
        <Sidebar />
      </div>
    );
  }
}

export default App;
