import {observable, action, computed} from 'mobx';

class SessionStore {

    @observable appName1 = 'Welcome to';
    @observable appName2 = 'Badhri Chat';
    @observable authUser = null; // contains { uid from auth }
    @observable appLoaded = false;

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action setAppLoaded(isLoaded) {
        this.appLoaded = isLoaded;
    }

    @action setAuthUser(authUser) {
        console.log('--------- setting the authUser ----------', authUser)
        this.authUser = authUser;
    }

    @computed get authUid() {
        return this.authUser.uid;
    }

}

export default SessionStore;