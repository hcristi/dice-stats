/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';

import React, {
    AppRegistry,
    Component,
    Text,
    TouchableHighlight,
    Navigator
} from 'react-native'

import Player from './components/Player.js'

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
            return null;
            return (
                <Text>{route.name}</Text>       
            );
        }
    };
 
    render() {
        return (
            <Navigator
                initialRoute={{name: 'Player', component: Player}}
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
        if (route.component) {
            return React.createElement(route.component, { navigator });
        }  
    }
}

AppRegistry.registerComponent('DiceStats', () => DiceStats);
