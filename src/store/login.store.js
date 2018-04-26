import {observable, action} from 'mobx';

import {GoogleSignin} from "react-native-google-signin";
import firebase from 'react-native-firebase'

class LoginStore {

    @observable inProgress = false;
    @observable errors = undefined;

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.randomHex = ''+(Math.random()*0xFFFFFF<<0).toString(16).toUpperCase();
    }

    @action login() {
        this.errors = undefined;
        GoogleSignin.signIn()
            .then(data => {
                console.log('------ google in progress -------');
                const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
                return firebase.auth().signInAndRetrieveDataWithCredential(credential);
            })
            .then(action(user => {

                const { uid, displayName } = user.user._user,
                    { userStore } = this.rootStore;

                const structuredUser = {
                    id: uid,
                    displayName,
                    bgColour: this.randomHex,
                };

                userStore.doCreateUser(structuredUser);
                userStore.setUser(structuredUser)

            }))
            .catch(action(err => {
                this.errors = err.response && err.response.body && err.response.body.errors;
                throw err;
            }));
    }
}

export default LoginStore;