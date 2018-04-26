import { observable, action, computed } from 'mobx';
import firebase from 'react-native-firebase'

class UserStore {

    @observable user = {};

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action setUser(user) {
        console.log('------- setting user from -------', user)
        this.user = user;
    };

    @action doCreateUser(user){
        return firebase.database().ref(`room1/users/${user.id}`).set({
            bgColour: user.bgColour,
            displayName: user.displayName,
            id: user.id,
        });
    }

    @action onceGetUser(id) {
        return firebase.database().ref(`room1/users/${id}`).once('value');
    }

    @action setCurrentUser() {
        console.log('------- set current user -------')
        this.currentUser = true;
    }

    @action setBgColour(bgColour) {
        console.log('------- set bgColour -------', bgColour)
        this.user.bgColour = bgColour;
    }

    @computed get userDisplayName() {
        return this.user.displayName;
    }

    @computed get userId() {
        return this.user.id;
    }

    @computed get displayNameInitials() {
        let initials = this.userDisplayName.match(/\b\w/g) || [];
        return initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    }

}

export default UserStore;