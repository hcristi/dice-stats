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
    this.historyIndex = 0;
  }

  componentDidMount() {
    this.state = {
      historyItems: []
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <UserInfo></UserInfo>
        <DiceList items={this.state.historyItems} updatable={true} onDiePress={this._removeFromHistory.bind(this)}></DiceList>
        <View style={{flex:1}}/>
        <UserActions pushRoll={this._pushRoll.bind(this)}></UserActions>

      </View>
    );
  }

  _pushRoll(roll){
    roll.forEach(item => item.id = this.historyIndex++);
    
    this.state.historyItems.push(roll);
    this.setState({
      historyItems : this.state.historyItems
    });
  }

  _removeFromHistory(item){
    let itemIndex = -1;
    let rollIndex = this.state.historyItems.findIndex(roll => {
        itemIndex = roll.findIndex(el => el.id === item.id);
        return itemIndex >= 0;
    });

    if(itemIndex >= 0 && rollIndex >= 0 ){
        this.state.historyItems[rollIndex].splice(itemIndex, 1);
        if(this.state.historyItems[rollIndex].length === 0)
          this.state.historyItems.splice(rollIndex,1);

        this.setState({
          historyItems : this.state.historyItems
        });
    }
  }
}

AppRegistry.registerComponent('DiceStats', () => DiceStats);
