import React, { Component } from 'react';
import fire from '../../Firebase/Fire';
import './Users.css';
import User from '../Users/User';
import { connect } from 'react-redux';
import { selectUser } from '../../store/actions/index';

class Users extends Component {
    constructor (props) {
        super(props);
        
        this.state = {
          users:[],
        }
      }

componentWillMount = () => {
    let userRef = fire.database().ref("users").orderByKey().limitToLast(100);
    userRef.on('child_added', snapshot => {
      let users = {
          name: snapshot.val().name,
          email: snapshot.val().email,
          workoutsCompleted: snapshot.val().workoutsCompleted,
          achievements: snapshot.val().achievements,
          gender: snapshot.val().gender,
          id: snapshot.key };
          this.setState({users:[users].concat(this.state.users)});
      });
}

onUserSelected = (name, email) => {
  this.props.onSelectUser(name, email);
}
   
  render() {

let users = this.state.users.map(users => {
    return <User
    key={users.id}
    name={users.name}
    email={users.email}
    selectedUserEmail={this.props.selectedUserEmail}
    onUserSelected={this.onUserSelected}
    />
});

    return (
        <div>
        <div className="usersTitle">Users</div>
       <div className="usersWrap">
         {users}  
       </div>
       </div>
    );
}
}

const mapStateToProps = state => {
  return {
    selectedUserName: state.workouts.selectedUserName,
    selectedUserEmail: state.workouts.selectedUserEmail
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectUser: (name, email) => dispatch(selectUser(name, email))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);