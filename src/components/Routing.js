import React from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';

import ChatScreen from "../views/ChatScreen";
import LoginScreen from '../views/LoginScreen';

const Routing = ({ sessionStore }) =>
    sessionStore.authUser
            ? <RoutingAuth />
            : <RoutingNonAuth />;

const RoutingAuth = () => <ChatScreen/>;

const RoutingNonAuth = () => <LoginScreen />;

export default compose(
    inject('sessionStore'),
    observer,
)(Routing);