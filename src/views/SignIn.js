import React, {Component} from 'react'
import {
    View,
    TouchableOpacity,
    LayoutAnimation,
    Platform,
    UIManager,
    StatusBar,
    StyleSheet,
    Image,
    Text,
    AsyncStorage,
} from 'react-native'
import {inject, observer} from 'mobx-react/native';
import {compose} from 'recompose';

import {getColor} from '../config'

import BackgroundImage from '../components/Background'
import GoogleSignUp from '../components/GoogleSignUp'
import {onSignIn, USER_KEY} from "../auth";

class SignIn extends Component {
    static navigationOptions = {
        headerMode: 'none'
    };

    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }

        this.signIn = this.signIn.bind(this);
        this.randomHex = ''+(Math.random()*0xFFFFFF<<0).toString(16).toUpperCase();
    }

    saveToken(value) {
        console.log(value);
        const {userStore} = this.props.rootStore;
        userStore.setUser(value);
    }

    signIn() {
        this.props.loginStore.login(this.props.navigation);
    }

    render() {
        const {appName1, appName2} = this.props.sessionStore;

        return (
            <View style={styles.container}>
                <BackgroundImage imgSource={require('../assets/images/bk.png')}/>
                <View style={styles.rowcontainer}>
                    <Text style={styles.welcome1}>{appName1}</Text>
                    <Text style={styles.welcome2}>{appName2}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <GoogleSignUp signIn={this.signIn}/>
                </View>
            </View>
        )
    }
}

export default compose(
    observer,
    inject('sessionStore', 'loginStore'),
)(SignIn)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowcontainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome1: {
        flex: 1,
        top: 115,
        left: -20,
        fontSize: 50,
        color: '#FFFFFF',
    },
    welcome2: {
        flex: 1,
        top: -30,
        left: 10,
        fontSize: 50,
        color: '#FFFFFF',
    }
});
