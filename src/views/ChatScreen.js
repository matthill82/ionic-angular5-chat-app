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
import { compose } from 'recompose';

import ChatContainer from "../components/ChatContainer";
import withAuthorization from '../components/withAuthorization';

class ChatScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.chatStore.loadChats();

        const { userStore, sessionStore } = this.props;

        userStore.onceGetUser(sessionStore.authUid).then(snapshot =>
            userStore.setUser(snapshot.val())
        );
    }

    sendMessage (chat) {
        this.props.chatStore.addChat(chat)
    }

    render() {
        const { chats } = this.props.chatStore;
            return (
                <View style={styles.container}>
                    <StatusBar backgroundColor="blue"
                               barStyle="light-content"
                               hidden={false}/>
                    <View style={styles.rowcontainer}>
                        <ChatContainer chats={chats} />
                    </View>
                </View>
            )
    }
}

const authCondition = (authUser) => !!authUser;

export default compose(
    withAuthorization(authCondition),
    inject('chatStore', 'sessionStore', 'userStore'),
    observer,
)(ChatScreen)

const styles = StyleSheet.create({});
