import React, {Component} from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import firebase from "react-native-firebase"

const withAuthorization = (condition,) => (Component) => {
    class WithAuthorization extends Component {
        componentWillMount() {
            firebase.auth().onAuthStateChanged(authUser => {
                if (!condition(authUser)) {
                    this.props.sessionStore.setAuthUser(authUser);
                }
            });
        }

        render() {
            return this.props.sessionStore.authUser ? <Component /> : null;
        }
    }

    return compose(
        inject('sessionStore'),
        observer,
    )(WithAuthorization);
};

export default withAuthorization;