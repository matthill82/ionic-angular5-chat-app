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
} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {inject, observer} from 'mobx-react';
import {compose} from 'recompose';

import ChatContainer from "../components/ChatContainer";
import withAuthorization from '../components/withAuthorization';


class Home extends Component {
    constructor(props) {
        super(props);
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
    }

    componentDidUpdate() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    }

    componentDidMount() {

        const {userStore, sessionStore} = this.props;

        userStore.onceGetUser(sessionStore.authUid).then(snapshot =>
            userStore.setUser(snapshot.val())
        );
    }

    sendMessage(chat) {
        this.props.chatStore.addChat(chat)
    }

    render() {
        return (
            <View style={styles.container}>
                <ChatContainer/>
            </View>
        )
    }
}

// const authCondition = (authUser) => !!authUser;

export default compose(
    observer,
    // withAuthorization(authCondition),
    inject('chatStore', 'sessionStore', 'userStore'),
)(Home)

const styles = StyleSheet.create({
    container : {}
});
