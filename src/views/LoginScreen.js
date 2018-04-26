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

class LoginScreen extends Component {
    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }

    }

    componentDidUpdate() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    }

    render() {
        const {appName1, appName2} = this.props.sessionStore,
            {userId} = this.props.userStore;

        if (!userId) {
            return (
                <View style={styles.container}>
                    <BackgroundImage imgSource={require('../assets/images/bk.png')}/>
                    <View style={styles.rowcontainer}>
                        <Text style={styles.welcome1}>{appName1}</Text>
                        <Text style={styles.welcome2}>{appName2}</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <GoogleSignUp/>
                    </View>
                </View>
            )
        }
        return null;
    }
}

export default compose(
    observer,
    inject('sessionStore', 'userStore'),
)(LoginScreen)

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
})
