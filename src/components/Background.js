import React, {Component} from 'react'
import {
    ImageBackground,
    Text,
    StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    }
})

export default class BackgroundImage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (<ImageBackground
                style={styles.backgroundContainer}
                source={this.props.imgSource}
             />
        )
    }
}
