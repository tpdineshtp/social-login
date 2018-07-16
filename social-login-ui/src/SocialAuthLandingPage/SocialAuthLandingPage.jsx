import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class SocialAuthLandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data : this.props.socialUser
        };
    }
    componentWillMount() {
        const { dispatch } = this.props;
        var params = (new URL(document.location)).searchParams;
        var id = params.get("facebookId");
        dispatch(userActions.getSocialLoginData(id));
        //this.renderMyData();
    }

    renderMyData(){
      var params = (new URL(document.location)).searchParams;
      var id = params.get("facebookId");
        fetch('http://localhost:3000/user/fetch/'+id)
            .then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson);
              this.setState({ data : responseJson })
            })
            .catch((error) => {
              console.error(error);
            });
    }



    render() {
        return (
            <div >
                {this.props.socialUser != null ?
                  <div>
                    <h2> Welcome {this.props.socialUser.first_name} </h2>
                      <img src={'https://graph.facebook.com/'+this.props.socialUser.id+'/picture?type=large&width=150&height=150'} alt="Profile Picture" style={{float: 'left'}}/>
                      <h4 > Your email id is: <br/><b>{this.props.socialUser.email} </b></h4>
                  </div>
                : null}
                <Link style={{marginTop: '88px'}}to="/login" className="btn btn-link">Log out</Link>
            </div>
        );
    }
}

function mapStateToProps(state) {
  const { socialUser } = state.authentication;
  return {
      socialUser
  };
}

const connectedSocialAuthLandingPage = connect(mapStateToProps)(SocialAuthLandingPage);
export { connectedSocialAuthLandingPage as SocialAuthLandingPage };
