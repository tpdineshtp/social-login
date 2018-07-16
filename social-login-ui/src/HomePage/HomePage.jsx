import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { userActions } from '../_actions';

class HomePage extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          userUpdate: {
              password: this.props.user.password,
              email: this.props.user.email,
              id: this.props.user._id,
              picture: this.props.user.profilePic
          },
          submitted: false
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
      const { name, value } = event.target;
      const { userUpdate } = this.state;
      this.setState({
          userUpdate: {
              ...userUpdate,
              [name]: value
          }
      });
  }

  handleSubmit(event) {
      event.preventDefault();

      const { userUpdate, submitted} = this.state;
      const { dispatch } = this.props;
      debugger;
      if(typeof this.uploadInput !== 'undefined' && this.uploadInput.value.length  && submitted){
        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('filename', userUpdate.email);

        fetch('http://localhost:3000/file/upload', {
          method: 'POST',
          body: data,
        }).then((response) => {
          response.json().then((body) => {
            console.log(body)
          });
        });

      }
    //  delete userUpdate.picture;
      if (userUpdate.email && userUpdate.password && submitted) {
          dispatch(userActions.update(userUpdate));
      }
      this.setState({ submitted: true });
  }

    render() {
      var src;
        if(this.state.userUpdate.picture){
          src="http://localhost:3000/api/controllers/images/"+this.props.user.email+".jpg"
        }
        const { userUpdate, submitted } = this.state;
        const { user, users } = this.props
        console.log(user);
        return (
          <div>
            {this.state.userUpdate.picture ?
            <div className="col-md-3">
            <img style={{width: '175px'}} src={src} alt="img" />
            </div> : null }
            <div className="col-md-6">
            <h3> Welcome {user.userName}!</h3>
            <h4> your email id is <span className="label label-primary">{user.email}</span></h4>
            <form name="form" onSubmit={this.handleSubmit}>
              {this.state.submitted ?  <div>
                <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control" name="email" value={userUpdate.email} onChange={this.handleChange} />
                </div>
                <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" value={userUpdate.password} onChange={this.handleChange} />
                </div>
                {!this.state.userUpdate.picture ?
                <div className="form-group">
                    <label htmlFor="password">Update profile picture</label>
                    <input ref={(ref) => { this.uploadInput = ref; }} type="file" />

                </div>
                : null }
                </div>
                                  : null }
                <div className="form-group">
                    <button className="btn btn-primary">Update</button>
                    <Link to="/login" className="btn btn-link">Log out</Link>
              </div>
            </form>
            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
