import React, {Component} from 'react';
import {
    Text,
    Image,
    View,
    FlatList,
    StyleSheet,
    ListView,
    RefreshControl,
} from 'react-native';

import moment from 'moment';
import {inject, observer} from "mobx-react";
import {compose} from "recompose";

import Input from './Input';

const styles = StyleSheet.create({
    container: {
        padding: 12,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
    date: {
        fontSize: 10,
        color: '#8E8E8E'
    },
    left: {
        backgroundColor: '#011D3F',
        color: '#ffffff',
        padding: 15
    },
    right: {
        backgroundColor: '#1868C5',
        color: '#ffffff',
        padding: 15
    }
});

@observer
@inject('userStore')
class Message extends Component {

    render() {

        const {chat, userStore} = this.props;

        const rightContainer = (<View style={styles.rightContainer}>
            {chat.messageText ?
                <Text style={styles.right}>{chat.messageText}</Text> : null}
            {chat.photoUrl ? <Image
                style={{width: 100, height: 100, margin: 5}}
                source={{uri: chat.photoUrl}}
            /> : null}
            <Text style={styles.date}>{moment(chat.dateTimeAdded).from(Date.now())}</Text>
        </View>);

        const leftContainer = (<View style={styles.leftContainer}>
            {chat.messageText ?
                <Text style={styles.left}>{chat.messageText}</Text> : null}
            {chat.photoUrl ? <Image
                style={{width: 100, height: 100, margin: 5}}
                source={{uri: chat.photoUrl}}
            /> : null}
            <Text style={styles.date}>{moment(chat.dateTimeAdded).from(Date.now())}</Text>
        </View>);

        const messages = (userStore.user.displayName === chat.user.displayName) ? rightContainer : leftContainer;

        return (
            <View style={styles.container}>
                {messages}
            </View>
        )
    }

};

@observer
@inject('userStore')
export default class MessageList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {chats, onLayout} = this.props;

        return (<FlatList data={chats}
                          renderItem={(chat) => <Message key={chat.item}
                                                         chat={chat.item}/>}
                          onLayout={onLayout}
                          renderSeparator={(sectionId, rowId) =>
                              <View key={rowId}
                                    style={styles.separator}/>}
            />
        );
    }
}
