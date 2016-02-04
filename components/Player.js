'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text, 
  View,
  ToastAndroid
} from 'react-native';

import DiceList from '../components/DiceList.js'
import PlayerInfo from '../components/PlayerInfo.js';
import PlayerActions from '../components/PlayerActions.js';
import CustomChart from '../components/CustomChart.js';

const styles = require('../styles.js');

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyItems: []
    };
    this.historyIndex = 0;
  }

  componentDidMount() {
    this.state = {
      historyItems: [],
      sparseItems: []
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <PlayerInfo></PlayerInfo>
        <DiceList items={this.state.historyItems} updatable={true} 
            onDiePress={this._removeFromHistory.bind(this)}></DiceList>
        <CustomChart style={{flex:1}} data={this.state.sparseItems} a={22}/>
        <CustomChart style={{flex:1}} data={this.state.sparseItems}/>
        <PlayerActions pushRoll={this._pushRoll.bind(this)}></PlayerActions>

      </View>
    );
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
