import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HomePage extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          userUpdate: {
              password: this.props.user.password,
              email: this.props.user.email,
              id: this.props.user._id
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
      if (userUpdate.email && userUpdate.password && submitted) {
          dispatch(userActions.update(userUpdate));
      }
      this.setState({ submitted: true });
  }

    render() {
        const { userUpdate, submitted } = this.state;
        const { user, users } = this.props
        console.log(user);
        return (
            <div className="col-md-6 col-md-offset-3">
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
                </div> </div>
                                  : null }
                <div className="form-group">
                    <button className="btn btn-primary">Update</button>
                    <Link to="/login" className="btn btn-link">Log out</Link>
              </div>
            </form>
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
