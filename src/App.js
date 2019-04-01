import React, { Component } from 'react';
import './App.css';
import Gym from './Components/Gym';
import fire from './Firebase/Fire';
import Login from './Login/Login';
import Spinner from './Components/Spinner/Spinner';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:{

      },
      loading:true,
    }
  }

  componentDidMount() {
    this.authListener();
    document.body.style.background = "#f2f2f2";
    document.body.style.minWidth = "1215px";
    document.body.style.paddingRight ="15px";
    document.title = "Alto Gym"
  }
  
  authListener() {
  fire.auth().onAuthStateChanged((user) => {
    if (user) {
      this.setState({user});
      this.setState({loading: false});
    } else {
      this.setState({user: null});
      this.setState({loading: false});
    }
  });
  }


  render() {

    if (this.state.loading) {
      return (
        <Spinner/>
      )}

    return (
      <div className="App">
      { (this.state.user && this.state.user.email==="altoturtas@icloud.com") ? <Gym/> : <Login/> }
      </div>
    );
  }
}

export default App;

