'use strict';
import React, {
  StyleSheet
}
from 'react-native';

const constants = require('./constants.js');

const styles = StyleSheet.create({
  diceList: {
    height: 50
  },
  userInfo: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    borderWidth: 1,
    borderColor: 'blue'
  },
  diceScrollView:{
    flexDirection: 'row'
  },
  diceScrollView_die: {
    height: 50,
    width: 50,
    resizeMode: 'contain'
  },

  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },


  separatorV:{
    height: 50,
    width: 1,
    borderWidth: 1,
    borderColor: '#eee'
  },

  actionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  action: {
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  actionSuccess:{
    backgroundColor: constants.actionSuccessColor
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = styles;