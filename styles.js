'use strict';
import React, {
  StyleSheet
}
from 'react-native';

const constants = require('./constants.js');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
  },
  
  userInfo: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 44
  },
  userInfoName: {
    color: '#444',
    fontSize: 16,
    fontWeight: "500"
  },


  userActionsButtons: {
    flexDirection: 'row'
  },
  userActionsAccept: {
    flex:2
  },
  userActionsCancel: {
    flex:1
  },

  diceList: {
    height: 50
  },
  diceListScroll:{
    flexDirection: 'row'
  },
  diceListDie: {
    height: 50,
    width: 50,
    resizeMode: 'contain'
  },


  separatorV:{
    height: 50,
    width: 5,
    borderWidth: 0,
    // borderColor: '#fff',
    backgroundColor: 'red'
  },


  action: {
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  actionSuccess:{
    backgroundColor: constants.actionSuccessColor
  },
  actionCancel:{
    backgroundColor: constants.actionCancelColor
  }
});

module.exports = styles;