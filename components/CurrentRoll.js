'use strict';

import React, {
	Component, View, ScrollView, Text, Image, TouchableHighlight 
}
from 'react-native';

const styles = require('../styles.js');

const DieButton = require('./DieButton.js');

class CurrentRoll extends Component{
	render() {
		return (
			<View>
				<Text>Current Roll:</Text>
				<TouchableHighlight onPress={this.props.acceptRoll}>
					<Text style={styles.actionText}>
						Accept Roll
					</Text>
				</TouchableHighlight>
			</View>
			);
	}

	renderDie(item, index){
		return(
			<DieButton key={index} number={item} onPress={this.pushRoll.bind(this)}></DieButton>
			);
	}
}

module.exports = CurrentRoll;