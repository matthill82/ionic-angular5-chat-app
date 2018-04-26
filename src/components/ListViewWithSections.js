import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    ListView,
    Text,
    View
} from 'react-native';
import moment from 'moment';
import {inject, observer} from "mobx-react/index";
import {compose} from "recompose";

import Input from './Input';

// we need a section header and a row

const Message = ({chat}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{chat.messageText}</Text>
            <Text style={styles.date}>{moment(chat.dateTimeAdded).from(Date.now())}</Text>
        </View>
    )
}

class ListViewWithSections extends Component {
    constructor(props) {
        super(props);

        // const getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
        // const getRowData = (dataBlob, sectionId, rowId) => dataBlob[`${rowId}`];
        //
        // const ds = new ListView.DataSource({
        //     rowHasChanged: (r1, r2) => r1 !== r2,
        //     sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
        // });
        //
        // const { dataBlob, sectionIds, rowIds } = this.formatData(this.props.chatStore.chats);
        //
        // this.state = {
        //     dataSource : ds.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds)
        // }
    }

    formatData(chats) {
        // this is where we need to sort by date

        chats.map((result, chat) => {
            const date = moment(chat.dateTimeAdded).format('DD-MM-YYYY');
            console.log('date', date);
        });
    }

    sendMessage (chat) {
        this.props.chatStore.addChat(chat)
    };

    render() {
        const {chats} = this.props;
        this.formatData(chats);

        return (
            <View style={styles.container}>

            </View>
        );
    }

}

//  renderSectionHeader={(sectionData) => <SectionHeader {...sectionData} />}
//                     renderSeparator={() => <View key={rowId} style={styles.separator} />}
/*

<ListView
                    style={styles.container}
                    dataSource={chats}
                    renderRow={(chat) => <Message key={chat.dateTimeAdded } />}
                    renderFooter={() => <Input styles={styles.input}
                                               submitAction={this.sendMessage.bind(this)}
                                               ref="input"
                                               placeholder="Say something cool ..." />}
                />
 */

export default compose(
    inject('chatStore'),
    observer,
)(ListViewWithSections);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
});
