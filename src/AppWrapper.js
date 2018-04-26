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

import firebase from "react-native-firebase";
import { observer, inject } from 'mobx-react'
import withAuthentication from './components/withAuthentication'

import LoginScreen from './views/LoginScreen';
import ChatScreen from "./views/ChatScreen";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

@inject('sessionStore', 'userStore')
@observer
class AppWrapper extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * When the App component mounts, we listen for any authentication
     * state changes in Firebase.
     * Once subscribed, the 'user' parameter will either be null
     * (logged out) or an Object (logged in)
     */
    componentWillMount() {
        if (this.props.userStore.userId) {
            this.props.userStore.setCurrentUser();
        }

        this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
            if (user !== null) {
                this.props.userStore.setCurrentUser();
            }
        });
    }

    componentDidMount() {}

    /**
     * Don't forget to stop listening for authentication state changes
     * when the component unmounts.
     */
    componentWillUnmount() {
        this.authSubscription();
    }

    render() {
        return (
            <View style={styles.container}>
                { !this.props.userStore.currentUser && <LoginScreen currentUser={this.props.userStore.currentUser} /> }
                <ChatScreen currentUser={this.props.userStore.currentUser}  />
            </View>
        );
    }
}

export default withAuthentication(AppWrapper);
