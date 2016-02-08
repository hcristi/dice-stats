'use strict';
import React, {
  Component,
  StyleSheet,
  View,
  Text, 
  TouchableHighlight
} from 'react-native';

import DiceList from '../components/DiceList.js'
import PlayerInfo from '../components/PlayerInfo.js';
import PlayerActions from '../components/PlayerActions.js';
import CustomChart from '../components/CustomChart.js';

import styles from '../styles.js';

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyItems: [],
      sparseItems: []
    };
    this.historyIndex = 0;
  }

  componentDidMount() {
    // this.state = {
    //   historyItems: [],
    //   sparseItems: []
    // };
  }

  render() {
    let TouchableElement = TouchableHighlight;
    // if (Platform.OS === 'android') {
    //     TouchableElement = TouchableNativeFeedback;
    // }
    return (
      <View style={styles.container}>
        <PlayerInfo></PlayerInfo>
        <DiceList items={this.state.historyItems} updatable={true} 
            onDiePress={this._removeFromHistory.bind(this)}></DiceList>
        <CustomChart style={{flex:1}} data={this.state.sparseItems}/>
        <TouchableElement 
            style={[styles.action, styles.actionSuccess]} 
            onPress={this._newRoll.bind(this)}>
            <Text style={styles.actionText}>
                New Roll
            </Text>
        </TouchableElement>

      </View>
    );
  }

    _newRoll(){
        this.props.navigator.push({
            name: 'PlayerActions',
            callback: this._pushRoll.bind(this)
        });    
    }
  
  _pushRoll(roll){
    roll.forEach(
      item => {
        item.id = this.historyIndex++;
        this.state.sparseItems.push(item);
      });
    
    this.state.historyItems.push(roll);
    this.setState({
      historyItems : this.state.historyItems,
      sparseItems: this.state.sparseItems
    });
  }

  _removeFromHistory(item){
    let itemIndex = -1;
    let rollIndex = this.state.historyItems.findIndex(roll => {
        itemIndex = roll.findIndex(el => el.id === item.id);
        return itemIndex >= 0;
    });

    let sparseIndex = this.state.sparseItems.findIndex(el => el.id === item.id);
    if(sparseIndex >= 0){
        this.state.sparseItems.splice(sparseIndex, 1);
    }
    if(itemIndex >= 0 && rollIndex >= 0 ){
        this.state.historyItems[rollIndex].splice(itemIndex, 1);
        if(this.state.historyItems[rollIndex].length === 0)
          this.state.historyItems.splice(rollIndex, 1);
    }
    
    if(itemIndex + rollIndex >= 0 || sparseIndex >= 0){
        this.setState({
          historyItems: this.state.historyItems,
          sparseItems: this.state.sparseItems
        });
    }
  }
}
