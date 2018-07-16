import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class SocialAuthLandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data : null
        };
    }
    componentWillMount() {
        this.renderMyData();
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
      console.log(this.state.data);
        return (
            <div >
                {this.state.data != null ?
                  <div>
                    <h2> Welcome {this.state.data.first_name} </h2>
                      <img src={'https://graph.facebook.com/'+this.state.data.id+'/picture?type=large&width=150&height=150'} alt="Profile Picture" style={{float: 'left'}}/>
                      <h4 > Your email id is: <br/><b>{this.state.data.email} </b></h4>
                  </div>
                : null}
                <Link style={{marginTop: '88px'}}to="/login" className="btn btn-link">Log out</Link>
            </div>
        );
    }
}

function mapStateToProps(state) {
 return {}
}

const connectedSocialAuthLandingPage = connect(mapStateToProps)(SocialAuthLandingPage);
export { connectedSocialAuthLandingPage as SocialAuthLandingPage };
