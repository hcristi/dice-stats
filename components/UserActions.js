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
	        			onDiePress={this._removeDie.bind(this)}
	        			updatable={true}
	        				>
	   				</DiceList>
	   				<View style={styles.userActionsButtons}>
	   					<TouchableHighlight
							style={[styles.action, styles.actionCancel, styles.userActionsCancel]}
							onPress={this._closeRoll.bind(this)}>
							<Text style={styles.actionText}>
								Cancel
							</Text>
						</TouchableHighlight>
		        		<TouchableHighlight
							style={[styles.action, styles.actionSuccess, styles.userActionsAccept]}
							onPress={this._acceptRoll.bind(this)}>
							<Text style={styles.actionText}>
								Accept Roll
							</Text>
						</TouchableHighlight>
	   				</View>
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

    _removeDie(itemPressed, indexOfItem){
        this.state.currentRoll.splice(indexOfItem, 1);
        this.setState({
			currentRoll: this.state.currentRoll
		});
    }

	_acceptRoll() {
        if(this.state.currentRoll.length > 0)
		  this.props.pushRoll(this.state.currentRoll);

		this._closeRoll();
	}

	_closeRoll(){
		this.setState({
			newRoll: false,
			currentRoll: []
		});
	}
}

module.exports = UserActions;
