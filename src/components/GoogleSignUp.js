import React, {Component} from 'react'
import {
    View,
    Text,
    TextInput,
    BackHandler,
    TouchableOpacity,
    LayoutAnimation,
    Platform,
    UIManager,
    StyleSheet,
} from 'react-native'
import { inject, observer } from 'mobx-react';
import * as Animatable from 'react-native-animatable'
import { GoogleSigninButton } from "react-native-google-signin";

import Colors from "../constants/colors";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
        paddingBottom: 20,
        width: 312,
        height: 50
    },
    title: {
        fontSize: 25,
        marginBottom: 10,
        color: Colors.white,
        backgroundColor: 'transparent',
    },
    errMsg: {
        width: 280,
        textAlign: 'center',
        alignSelf: 'center',
        color: '#fff',
        marginBottom: 10,
        fontSize: 14,
        backgroundColor: 'transparent',
    },
    inputContainer: {
        backgroundColor: 'transparent',
        borderRadius: 5
    },
    inputField: {
        width: 280,
        height: 40,
        paddingLeft: 15,
        paddingRight: 15,
        color: '#fff'
    },
    btnContainers: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 280
    },
    forgotBtnContainer: {
        height: 40,
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    forgotBtn: {
        fontSize: 12,
        color: '#fff',
    },
    submitBtnContainer: {
        height: 40,
        backgroundColor: 'transparent',
        borderRadius: 5,
    },
    submitBtn: {
        fontWeight: '800',
        fontSize: 20
    }
})

@observer @inject('loginStore')
class GoogleSignUp extends Component {
    constructor(props) {
        super(props);
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
        this.state = {
            init: true,
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('backBtnPressed', this._handleBackBtnPress)
    }

    componentDidUpdate() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('backBtnPressed', this._handleBackBtnPress)
    }

    render() {
        const animation = this.state.init ? 'bounceInUp' : 'bounceOutDown';
        return (
            <Animatable.View
                animation={animation}
                delay={0}
                style={styles.container}
                onAnimationEnd={this._handleAnimEnd}>
                <View style={[styles.inputContainer, {marginBottom: 10}]}>
                    <View style={styles.btnContainers}>
                        <View style={styles.submitBtnContainer}>
                            <GoogleSigninButton
                                style={{width: 312, height: 48}}
                                size={GoogleSigninButton.Size.Button}
                                color={GoogleSigninButton.Color.Dark}
                                onPress={this._handleLogIn.bind(this)}/>
                        </View>
                    </View>
                </View>
            </Animatable.View>
        )
    }

    _handleLogIn = () => {
        this.props.loginStore.login()
    }

    _handleAnimEnd = () => {}
}

export default GoogleSignUp;