import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    Platform
} from 'react-native';
import firebase from 'react-native-firebase';
import {inject, observer} from "mobx-react/index";

import RNFetchBlob from 'react-native-fetch-blob'
import ImagePicker from 'react-native-image-picker';
import {RNCamera} from 'react-native-camera';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        flex: 4,
        height: 30,
        paddingHorizontal: 8,
        fontSize: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
    },
    button: {
        flex: 0,
        height: 30,
    },
    upload: {
        textAlign: 'center',
        color: '#333333',
        padding: 10,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: 'gray'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});

const options = {
    title: 'Select Avatar',
    customButtons: [
        {name: 'fb', title: 'Choose Photo'},
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

@observer
@inject('imageStore', 'sessionStore')
class ImageChoice extends Component {
    constructor(props) {
        super(props);
        state = {};
        this._pickImage = this._pickImage.bind(this);
    }

    uploadImage(uri, mime = 'image/jpg') {

        const Blob = RNFetchBlob.polyfill.Blob;
        const fs = RNFetchBlob.fs;
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;

        return new Promise((resolve, reject) => {
            const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
            const sessionId = new Date().getTime();
            let uploadBlob = null;
            const imageRef = firebase.storage().ref();

            fs.readFile(uploadUri, 'base64')
                .then((data) => {
                    return Blob.build(data, {type: `${mime};BASE64`})
                })
                .then((blob) => {
                    uploadBlob = blob;
                    return imageRef.put(blob, {contentType: mime})
                })
                .then(() => {
                    uploadBlob.close();
                    return imageRef.getDownloadURL()
                })
                .then((url) => {
                    resolve(url)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }


    _pickImage() {

        ImagePicker.launchCamera({}, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // let source = { uri: response.uri };
                // this.setState({image_uri: response.uri})

                // You can also display the image using data:
                // let image_uri = { uri: 'data:image/jpeg;base64,' + response.data };

                this.uploadImage(response.uri)
                    .then(url => {
                        alert('uploaded');
                        this.setState({image_uri: url})
                    })
                    .catch(error => console.log(error))
            }
        });

    }

    render() {
        return (<View> <RNCamera
            ref={ref => {
                this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        /> <Button style={{width: 100, height: 70, flex: 0}}
                   onPress={() => this._pickImage()} title="Add Image"
                   color="#841584"
                   accessibilityLabel="Learn more about this purple button"/>
        </View>);
    }
}


export default ImageChoice;