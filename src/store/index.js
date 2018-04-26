import UserStore from './user.store'
import SessionStore from './session.store'
import LoginStore from './login.store'
import ChatStore from './chat.store'
import ImageStore from './image.store'

class RootStore {
    constructor() {
        this.sessionStore = new SessionStore(this);
        this.userStore = new UserStore(this);
        this.loginStore = new LoginStore(this);
        this.chatStore = new ChatStore(this);
        this.imageStore = new ImageStore(this);
    }
}

const rootStore = new RootStore();
export default rootStore;