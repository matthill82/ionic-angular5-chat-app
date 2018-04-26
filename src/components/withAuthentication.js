import React from 'react';
import { inject } from 'mobx-react';
import firebase from 'react-native-firebase';

const withAuthentication = (Component) => {
    class WithAuthentication extends React.Component {
        componentWillMount() {
            const { sessionStore } = this.props;

            firebase.auth().onAuthStateChanged(authUser => {
                console.log('authUser from withAuthentication', authUser)
                authUser
                    ? sessionStore.setAuthUser(authUser._user)
                    : sessionStore.setAuthUser(null);
            });
        }

        render() {
            return (
                <Component />
            );
        }
    }

    return inject('sessionStore')(WithAuthentication);
}

export default withAuthentication;