import { Platform } from 'react-native';
import { GoogleSignin } from "react-native-google-signin";
import { firebaseApp } from '../firebase';

export const updateChatsHeight = (event) => {
    const layout = event.nativeEvent.layout;

    return {
        type: 'UPDATE_CHATS_HEIGHT',
        height: layout.height
    }
};

/**
 * @desc setUserName
 * @param name
 * @return {{type: string, name: *}}
 */
export const setUserNameAndAvatarColour = (displayName, colour) => ({
    type: 'SET_USER_NAME',
    displayName,
    colour,
});

export const setUserColor = (color) => ({
    type: 'SET_USER_COLOR',
    color,
});

export const startAuthorizing = () => ({
    type: 'USER_START_AUTHORIZING'
});

export const userAuthorized = () => ({
    type: 'USER_AUTHORIZED'
});

export const userToken = (token) => ({
    type: 'USER_TOKEN',
    token,
})

export const userNoExist = () => ({
    type: 'USER_NO_EXIST'
})

export const login = () => {
    return (dispatch) => {
        dispatch(startAuthorizing());

        const randomHex = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        console.log('dFIRST-------------')

        GoogleSignin.signIn()
            .then((data) => {
                console.log('dgdrhjtjhdfg')
                // Create a new Firebase credential with the token
                const credential = firebaseApp.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
                // Login with the credential
                return firebaseApp.auth().signInAndRetrieveDataWithCredential(credential);
            })
            .then((user) => {
                // If you need to do anything with the user, do it here
                // The user will be logged in automatically by the
                // `onAuthStateChanged` listener we set up in App.js earlier
                dispatch(userAuthorized());
                dispatch(fetchChats());
                startChatting(dispatch);
            })
            .catch((error) => {
                const {code, chat} = error;
                // For details of error codes, see the docs
                // The chat contains the default Firebase string
                // representation of the error
            });
    }
}

export const checkUserExists = (user) => {
    return (dispatch) => {
        dispatch(startAuthorizing());
        if (user === null) {
            dispatch(userNoExist())
        } else {
            dispatch(userAuthorized());
            startChatting(dispatch);
        }
    }
}

/**
 * fetchChats
 * @return {Function}
 */
export const fetchChats = () => {
    return function (dispatch) {
        dispatch(startFetchingChats());

        firebase.database()
            .ref('room1')
            .orderByKey()
            .limitToLast(20)
            .on('value', (snapshot) => {
                // gets around Redux panicking about actions in reducers
                setTimeout(() => {
                    const chatsFromFirebase = snapshot.val() || [];
                    console.log('chats from firebase', chatsFromFirebase)
                    dispatch(receiveChats(chatsFromFirebase))
                }, 0);
            });
    }
};

export const startFetchingChats = () => ({
    type: 'START_FETCHING_CHATS'
});

/**
 * @desc receiveChats
 * @param chats
 * @return {Function}
 */
export const receiveChats = (chatsFromFirebase) => {
    return (dispatch) => {
        Object.values(chatsFromFirebase.chats).forEach(chat => {
            console.log('Object.values(msg)', chat);
            dispatch(addChat(chat))
        });

        dispatch(receivedChats());
    }
};

export const receivedChats = () => ({
    type: 'RECEIVED_CHATS',
    receivedAt: Date.now()
});

export const addChat = (item) => ({
    type: 'ADD_CHAT',
    ...item,
});

export const sendChat = (text, user) => {
    return (dispatch) => {

        const user1 = firebase.auth().currentUser;
        user1.providerData.forEach(function (profile) {
            console.log("Sign-in provider: " + profile.providerId);
            console.log("  Provider-specific UID: " + profile.uid);
            console.log("  Name: " + profile.displayName);
            console.log("  Email: " + profile.email);
            console.log("  Photo URL: " + profile.photoURL);
        });

        /*let msg = {
            chatText: text,
            dateTimeAdded: Date.now(),
            user: {
                name: user.name,
            }
        };

        const newMsgRef = firebase.database()
            .ref('room1/chats')
            .push();
        msg.id = newMsgRef.key;
        newMsgRef.set(msg);*/

        dispatch(addChat(msg));
    };
};

/**
 * Final action to call
 * @param dispatch
 */
const startChatting = (dispatch) => {
    dispatch(userAuthorized());
    dispatch(fetchChats());
}

