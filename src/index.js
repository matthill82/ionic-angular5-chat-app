import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    ActivityIndicator,
    AsyncStorage,
} from 'react-native';

import {observer, inject} from 'mobx-react'
import {GoogleSignin} from 'react-native-google-signin';

import {createRootNavigator} from './router';
// import {isSignedIn, USER_KEY, onSignOut} from './auth';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


@inject('sessionStore', 'userStore') @observer
class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            signedIn: false,
            checkedSignIn: false,
            hasToken: false
        };
    }

    /**
     * When the App component mounts, we listen for any authentication
     * state changes in Firebase.
     * Once subscribed, the 'user' parameter will either be null
     * (logged out) or an Object (logged in)
     */
    componentWillMount() {
        AsyncStorage.getItem(USER_KEY).then((token) => {
            if(token !== null) {
                this.setState({ hasToken: token !== null, signedIn: true, checkedSignIn: true })
            }
        });

        this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
            if (user !== null) {
                this.props.userStore.isUserSet = true;
            }
        });
    }

    async _setupGoogleSignin() {
        try {
            await GoogleSignin.hasPlayServices({autoResolve: true});
            await GoogleSignin.configure({
                webClientId: '680708007687-jb5jdh39qt4p8eo47nmonl8fjaepht5t.apps.googleusercontent.com',
                offlineAccess: false,
            });
        } catch (err) {
            console.log("Play services error", err.code, err.message);
        }
    }

    componentDidMount() {
        this._setupGoogleSignin();
    }

    componentWillUnmount() {
        this.authSubscription();
    }

    render() {

        const {signedIn} = this.state;

        const Layout = createRootNavigator(signedIn);
        return <Layout/>;
    }
}

export default Index;
