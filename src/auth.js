import {AsyncStorage} from 'react-native';
import {GoogleSignin} from "react-native-google-signin";
import firebase from "react-native-firebase";

export const USER_KEY = '@UserTokenStore:userKey';
export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const onSignIn = () => GoogleSignin.signIn()
    .then(data => {
        console.log('------ google in progress -------');
        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
        return firebase.auth().signInAndRetrieveDataWithCredential(credential);
    }).catch(err => {
        this.errors = err.response && err.response.body && err.response.body.errors;
        console.log(err);
    });

export const isSignedIn = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(USER_KEY)
            .then(res => {
                if (res !== null) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch(err => reject(err));
    });
};