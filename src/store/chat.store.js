import {observable, action, computed} from 'mobx';

import {GoogleSignin} from "react-native-google-signin";
import firebase from "react-native-firebase";

class ChatStore {

    @observable inProgress = false;
    @observable errors = undefined;

    @observable isCreatingChat = false;
    @observable isLoadingChats = false;
    @observable chatErrors = undefined;
    @observable chats = [];

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action loadChats() {

        console.log('------- fetching chats -------');

        this.isLoadingChats = true;
        this.chatErrors = undefined;

        firebase.database()
            .ref('room1/chats')
            .orderByChild('dateTimeAdded')
            .on('value',snapshot => {
                this.chats = Object.values(snapshot.val());
                this.isLoadingChats = false;
            }, action((err) => this.chatErrors = `Error receiving data from Firebase + ${err}`));
    }

    @action addChat(chat) {

        const chatObject = {
            messageText: chat,
            dateTimeAdded: Date.now(),
            user: {
                ...this.rootStore.userStore.user
            },
        };

        console.log('------- pushing new chats -------', chatObject)

        this.chats.push(chatObject);

        console.log('------- getting chats from this.chats -------', this.chats);

        firebase.database()
            .ref('room1/chats')
            .push()
            .set(chatObject);
    }

    @computed get chatsByDateTime() {
        return this.chats.sort((a, b) => {
            return a.dateTimeAdded - b.dateTimeAdded
        });
    }

    @computed get createNewObjectByDate() {
        // lets implement something here??
    }

}

export default ChatStore;
