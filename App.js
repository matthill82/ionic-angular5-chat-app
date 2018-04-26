/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {AsyncStorage} from 'react-native'

import { Provider, observer } from 'mobx-react/native';
import { GoogleSignin } from 'react-native-google-signin';

import stores from './src/store';
import AppWrapper from "./src/AppWrapper";

@observer
class App extends Component {
    componentDidMount() {
        this._setupGoogleSignin();
    }

    async _setupGoogleSignin() {
        try {
            await GoogleSignin.hasPlayServices({autoResolve: true});
            await GoogleSignin.configure({
                webClientId: '680708007687-jb5jdh39qt4p8eo47nmonl8fjaepht5t.apps.googleusercontent.com',
                offlineAccess: false,
            });
        } catch (err) {
            console.log("Play services error", err.code, err.message);
        }
    }

    render() {
        return (
            <Provider { ...stores }>
                <AppWrapper />
            </Provider>
        );
    }
}

export default App;