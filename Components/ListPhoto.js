import React ,{Component} from 'react'
import {
  Text,
  View,
  ListView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert
} from 'react-native'
var {height, width} = Dimensions.get('window');

export default class ListPhoto extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2})
    };
  }

  createRow(item){
    return(
      <View style={styles.item}>
        <Image
          style={{width: 150, height: 128}}
          source={{uri: item.link}}
        />
      </View>
    );
  }

  render(){
    return(
      <View style={styles.bg}>
        <TouchableOpacity style={styles.up}
        onPress={this.props.upload}>
          <Text style={styles.text}>Up Image</Text>
        </TouchableOpacity>

        <ListView style={{height:500,width:width ,
          marginTop:10}}
          contentContainerStyle={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this.createRow.bind(this)}
        />

      </View>
    );
  }

  componentDidMount(){
    fetch("http://pttkht.esy.es/getAllPhoto.php")
    .then((response)=> response.json())
    .then((responseJson) => {
      mang = responseJson
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(mang)
      });
    })
    .catch((error)=> {
      console.error(error);
    });
  };

  // componentWillReceiveProps(){
  //   Alert.alert(
  //     'Alert Title',
  //     this.props.pop,
  //     [
  //       {text: 'OK', onPress: () => console.log('OK Pressed')},
  //     ]
  //   )
  // }
}

const styles = StyleSheet.create({
  bg:{
    flex:1,
    backgroundColor:'yellow',
    alignItems:'center'
  },

  up:{
    marginTop:64,
    backgroundColor:'red',
    width:100,
    height:40,
    alignItems:'center',

  },

  text:{
    marginTop:10,
    justifyContent:'center',
    color:'white',
    fontWeight:'bold'
  },

  list: {
    justifyContent:'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },

  item: {
      borderWidth:1,
      borderColor:'red',
      margin: 10,
      width: 150,
      height:128,
      justifyContent:'center',
      alignItems:'center'
  }
});
