import React, { Component } from 'react';
import './User.css';

class User extends Component {
    constructor (props) {
        super(props);
        
        this.state = {
        
        }
      }
   
  render() {

    return (
       <div className="userWrap" onClick={() => this.props.onUserSelected(this.props.name, this.props.email)}
       className={this.props.selectedUserEmail === this.props.email ? "userContainerSelected" : "userContainer"}>
          <div>{this.props.name}</div>
          <div>{this.props.email}</div>
       </div>
    );
}
}

export default User;