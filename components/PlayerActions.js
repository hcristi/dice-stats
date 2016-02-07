'use strict';

import React, {
	Component, View, ScrollView, Text, Image, Platform, TouchableHighlight, TouchableNativeFeedback
}
from 'react-native';

const styles = require('../styles.js');

const DieButton = require('./DieButton.js');

import CurrentRoll from './CurrentRoll.js';
import DiceList from './DiceList.js'

export default class PlayerActions extends Component{
	constructor(props) {
		super(props);

		this.dice = [];
		this.currentRollIndex = 0;

		for(let i = 1; i <= 6; i++){
			this.dice.push({ id: i, value: i });
		}

		this.state = {
			newRoll: false,
			currentRoll: []
		};
	};

	render() {
        let TouchableElement = TouchableHighlight;
        // if (Platform.OS === 'android') {
        //     TouchableElement = TouchableNativeFeedback;
        // }
        return (
            <View style={{flex:1}}>
                <Text>Current Roll:</Text>
                <DiceList 
                    items={this.state.currentRoll} 
                    onDiePress={this._removeDie.bind(this)}
                    updatable={true}
                        >
                </DiceList>
                <View style={styles.userActionsButtons}>
                    <View style={styles.userActionButtonsRow}>
                        <TouchableElement style={styles.userActionsButton}>
                            <Image source={ require('./img/d1.png')} style={styles.userActionButtonImage} />     
                        </TouchableElement>
                        <TouchableElement style={styles.userActionsButton}>
                            <Image source={ require('./img/d1.png')} style={styles.userActionButtonImage} />     
                        </TouchableElement>
                    </View>
                </View>   
                <TouchableElement style={[styles.action, styles.actionSuccess]}>
                    <Text style={styles.actionText}>
                        Done
                    </Text>
                </TouchableElement>
                    
            </View>
        );
	}

	_newRoll() {
		this.setState({
			newRoll: true
		});
	}

	_pushDie(itemPressed) {
		let item = {};
		Object.assign(item, itemPressed, { id: this.currentRollIndex++ });

		this.state.currentRoll.push(item);
		this.setState({
			currentRoll: this.state.currentRoll
		});
	}

    _removeDie(itemPressed){
		let ind = this.state.currentRoll.findIndex(el => el.id === itemPressed.id);

		ind >=0 && this.state.currentRoll.splice(ind, 1);

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
		this.currentRollIndex = 0;
	}
}