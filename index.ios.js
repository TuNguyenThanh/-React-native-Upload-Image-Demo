/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Platform,
  Image,
  Alert,
  Navigator
} from 'react-native';

import ListPhoto from './Components/ListPhoto.js';
import Upload from './Components/Upload.js';


export default class demo07 extends Component {
  renderScene(route, navigator){
    switch (route.name) {
      case "list":return (
        <View style={styles.bg}>
          <ListPhoto
          upload={()=>{navigator.push({name:"upload"})}}
          pop="1"
           />
        </View>
      );

      case "upload":return (
        <View style={styles.bgUp}>
          <Upload cancel={()=>{navigator.pop()}} />
        </View>
      );
      default:
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{name:"list"}}
        renderScene={(this.renderScene)}
      />
    );
  }

}

const styles = StyleSheet.create({
  bg:{
    flex:1,
    backgroundColor:'red',
  },

  bgUp:{
    flex:1,
    backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

AppRegistry.registerComponent('demo07', () => demo07);
