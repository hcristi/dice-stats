/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text, 
  View,
  ToastAndroid
} from 'react-native';

import DiceList from './components/DiceList.js'
import UserInfo from './components/UserInfo.js';
import UserActions from './components/UserActions.js';

const styles = require('./styles.js');

class DiceStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyItems: []
    };
  }

  componentDidMount() {
    this.state = {
      historyItems: []
    };
  }

  _pushRoll(roll){
    this.state.historyItems.push(roll);
    this.setState({
      historyItems : this.state.historyItems
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <UserInfo></UserInfo>
        <DiceList items={this.state.historyItems} updatable={true}></DiceList>
        <View style={{flex:1}}/>
        <UserActions pushRoll={this._pushRoll.bind(this)}></UserActions>

      </View>
    );
  }
}
  

AppRegistry.registerComponent('DiceStats', () => DiceStats);
