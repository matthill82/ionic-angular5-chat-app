import React, {Component} from 'react'
import ReactNative, {
    View,
    LayoutAnimation,
    Platform,
    UIManager,
    StatusBar,
    StyleSheet,
    Dimensions,
    ScrollView,
    Text,
} from 'react-native'
import {observer, inject} from 'mobx-react'
import firebase from 'react-native-firebase'
import {compose} from 'recompose';

import Colors from '../constants/colors';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import ListViewWithSections from './ListViewWithSections';
import MessageList from './MessageList'
import Input from './Input'

@observer
@inject('chatStore', 'sessionStore', 'userStore', 'imageStore')
class ChatContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollViewHeight: 0,
            inputHeight: 0
        };
        this.sortChatsByDateTime = this.sortChatsByDateTime.bind(this)
    }

    onScrollViewLayout(event) {
        const layout = event.nativeEvent.layout;

        this.setState({
            scrollViewHeight: layout.height
        });
    };

    updateChatsHeight(event) {
        const layout = event.nativeEvent.layout;

        return {
            height: layout.height
        }
    };

    onInputLayout(event) {
        const layout = event.nativeEvent.layout;

        this.setState({
            inputHeight: layout.height
        });
    };

    scrollToBottom(animate = true) {
        const {scrollViewHeight, inputHeight} = this.state;

        const scrollTo = scrollViewHeight + inputHeight;

        if (scrollTo > 0) {
            this.refs.scroll.scrollToPosition(0, scrollTo, animate)
        }
    }

    _scrollToInput(reactRef) {
        this.refs.scroll.scrollToFocusedInput(ReactNative.findNodeHandle(reactRef));
    }


    sendMessage(chat) {
        return this.props.chatStore.addChat(chat)
    };

    sortChatsByDateTime(chats) {
        return chats.sort((a, b) => {
            return a.dateTimeAdded - b.dateTimeAdded
        });
    }


    render() {
        const {chats} = this.props.chatStore,
            {user} = this.props.userStore,
            {sortChatsByDateTime} = this;

        let chatsSortedByDateTimeAdded = sortChatsByDateTime(chats);

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Chat Room</Text>
                </View>
                <ScrollView
                    style={{backgroundColor: '#ffffff'}}
                    resetScrollToCoords={{x: 0, y: 0}}
                    contentContainerStyle={styles.container}
                    scrollEnabled={false}>
                    <MessageList chats={chatsSortedByDateTimeAdded} user={user}/>
                </ScrollView>
                    <Input
                        styles={styles.input}
                        submitAction={this.sendMessage.bind(this)}
                        ref="input"
                        placeholder="Say something cool ..."
                    />
            </View>
        )
    }
}

export default compose(
    inject('chatStore', 'sessionStore', 'userStore'),
    observer,
)(ChatContainer);

const window = Dimensions.get('window');

const IMAGE_HEIGHT = window.width / 2;
const IMAGE_HEIGHT_SMALL = window.width / 7;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: window.width,
    },
    input: {
        height: 70,
        flex: 1,
        width: window.width - 20,
        backgroundColor: Colors.white,
        marginHorizontal: 10,
        marginVertical: 5,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    header: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.brandLightBlue,
        width: window.width,
    },
    headerText: {
        color: Colors.white,
    }
});
