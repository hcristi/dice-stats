/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';

import React, {
    AppRegistry,
    BackAndroid,
    Component,
    Text,
    TouchableHighlight,
    Navigator
} from 'react-native'

import Player from './components/Player.js'
import PlayerActions from './components/PlayerActions.js'

let _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

class DiceStats extends Component {
    static NavigationBarRouteMapper = {
        LeftButton: (route, navigator, index, navState) => {
            return
                null;
        },
        RightButton: (route, navigator, index, navState) => {
            return
                null;
        },
        Title: (route, navigator, index, navState) => {
            return 
                null;
            return (
                <Text>{route.name}</Text>       
            );
        }
    };
 
    render() {
        return (
            <Navigator
                initialRoute={{name: 'Player'}}
                renderScene={this._renderScene}
                navigationBar={
                    <Navigator.NavigationBar
                        style={{height: 30}} 
                        routeMapper={DiceStats.NavigationBarRouteMapper}
                    />}
            />
        );
    }
       
    _renderScene(route, navigator) {
        _navigator = navigator;
        
        switch(route.name){
            case 'Player':
                route.component = Player
                break;
            case 'PlayerActions':
                route.component = PlayerActions
                break;
        }
        
        let passProps = { navigator, route };
        if(route.props)
            Object.assign(passProps, route.props);
        
        if (route.component) {
            return React.createElement(route.component, passProps);
        }  
    }
}

AppRegistry.registerComponent('DiceStats', () => DiceStats);
