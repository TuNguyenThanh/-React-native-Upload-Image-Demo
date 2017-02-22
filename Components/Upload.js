import React ,{Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Platform,
  Image,
  Alert
} from 'react-native'
import ImagePicker from 'react-native-image-picker';
var FileUpload = require('NativeModules').FileUpload;

export default class Upload extends Component {
  constructor(props){
    super(props);
    this.state = {
      avatarSource: null,
      imgBase64: '',
    }
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        var source, temp;
        // You can display the image using either:
        //source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        temp = response.data;

        //Or:
        if (Platform.OS === 'android') {
          source = {uri: response.uri, isStatic: true};
        } else {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        }

        this.setState({
          avatarSource: source,
          imgBase64: temp,
        });
      }
    });
  }

  upload(){
    console.log("click");
    var obj = {
        uploadUrl: 'http://pttkht.esy.es/uphinhanh.php',
        method: 'POST', // default 'POST',support 'POST' and 'PUT'
        headers: {
          'Accept': 'application/json',
        },
        fields: {
          'img': this.state.imgBase64,
        },
        files: [

        ]

    };
    FileUpload.upload(obj, function(err, result) {
      console.log('upload:', err, result);
      if (err == null){
        Alert.alert(
          'Thong Bao',
          'Upload thanh cong',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]
        )
      }else{
        Alert.alert(
          'Thong Bao',
          err,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]
        )
      }

    })
  }

  render() {
    return (
        <View style={styles.container}>
          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
            { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
              <Image style={styles.avatar} source={this.state.avatarSource} />
            }
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{backgroundColor:'yellow', width:60, height:20,marginTop:20,justifyContent: 'center',
          alignItems: 'center'}} onPress={this.upload.bind(this)}>
            <Text>Upload</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{backgroundColor:'yellow',width:60, height:20, marginTop:20,justifyContent: 'center',
          alignItems: 'center'}} onPress={this.props.cancel}>
            <Text>Cancel</Text>
          </TouchableOpacity>

        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  }

});
