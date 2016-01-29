'use strict';

import React, {
	Component, View, ScrollView, Text, Image, TouchableHighlight 
}
from 'react-native';

const styles = require('../styles.js');

const DieButton = require('./DieButton.js');

import CurrentRoll from './CurrentRoll.js';
import DiceList from './DiceList.js'

class UserActions extends Component{
	constructor(props) {
		super(props);
		this.dice = [1, 2, 3, 4, 5, 6];
		this.state = {
			newRoll: false,
			currentRoll: []
		};
	};

	render() {
		if(this.state.newRoll)
			return (
				<View >
					<Text>Current Roll:</Text>
					<DiceList 
	        			items={this.state.currentRoll} 
	        			updatable={true}
	        				>
	   				</DiceList>
	   				<TouchableHighlight  
						style={[styles.action, styles.actionSuccess]}
						onPress={this._acceptRoll.bind(this)}>
						<Text style={styles.actionText}>
							Accept Roll
						</Text>
					</TouchableHighlight>
	        		<DiceList 
	        			items={this.dice} 
	        			onDiePress={this._pushDie.bind(this)}
	        			updatable={false}
	        				>
	   				</DiceList>
				</View>
			);

		return(
			<View>
				<TouchableHighlight  
					style={[styles.action, styles.actionSuccess]}
					onPress={this._newRoll.bind(this)}>
					<Text style={styles.actionText}>
						New Roll
					</Text>
				</TouchableHighlight>
			</View>
			);
	}

	_newRoll() {
		this.setState({
			newRoll: true
		});
	}

	_pushDie(itemPressed) {
		this.state.currentRoll.push(itemPressed);
		this.setState({
			currentRoll: this.state.currentRoll
		});
	}

	_acceptRoll() {
		this.props.pushRoll(this.state.currentRoll);

		this.setState({
			newRoll: false,
			currentRoll: []
		});
	}
}

module.exports = UserActions;
