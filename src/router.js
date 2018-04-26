
import React from 'react';
import { Platform, StatusBar } from 'react-native';
import {
    StackNavigator,
    TabNavigator,
    SwitchNavigator
} from 'react-navigation';
import { FontAwesome } from 'react-native-vector-icons';

import SignIn from './views/SignIn';
import Home from './views/Home';

const headerStyle = {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
};

export const SignedOut = StackNavigator({
    SignIn: {
        screen: SignIn
    }
});

export const SignedIn = TabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: 'Chat',
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome name='chat' size={30} color={tintColor} />
                )
            }
        }
    },
    {
        tabBarOptions: {
            style: {
                paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
            }
        }
    }
);

export const createRootNavigator = (signedIn = false) => {
    return SwitchNavigator(
        {
            SignedIn: {
                screen: SignedIn
            },
            SignedOut: {
                screen: SignedOut
            }
        },
        {
            initialRouteName: signedIn ? 'SignedIn' : 'SignedOut',
            headerMode: 'none',
            mode: 'modal',
            navigationOptions: {
                headerVisible: false,
            }
        }
    );
};