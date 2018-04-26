import React, {Component} from 'react';
import {View, TextInput, StyleSheet, Dimensions, Button} from 'react-native'
import {inject, observer} from "mobx-react/index";
import ImageChoice from './ImageChoice'

const window = Dimensions.get('window');

const styles = StyleSheet.create({});

@observer
@inject('userStore')
class Input extends Component {
    state = {
        text: null
    };

    onChangeText = text => this.setState({text: text});

    onSubmitEditing = () => {
        this.props.submitAction(this.state.text, this.props.userStore.user);

        if (!this.props.noclear) {
            this.setState({
                text: null
            });
        }
    };

    onFocus = (event) => {
        if (this.props.onFocus) {
            this.props.onFocus(this.refs.input);
        }
    };

    onBlur = () => {
        if (this.props.submitOnBlur) {
            this.onSubmitEditing();
        }
    };

    onLayout = (event) => {
        if (this.props.onLayout) {
            this.props.onLayout(event);
        }
    };

    render() {
        return (
            <View style={{ justifyContent: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap' }}>
                <TextInput
                    style={this.props.styles}
                    placeholder={this.props.placeholder}
                    onChangeText={this.onChangeText}
                    onSubmitEditing={this.onSubmitEditing}
                    onLayout={this.onLayout}
                    value={this.state.text}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    ref="input"/>
                <ImageChoice />
            </View>
        )
    }
}

export default Input;