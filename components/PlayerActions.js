'use strict';

import React, {
	Component, 
    View, 
    ScrollView, 
    Text, 
    Image, 
    Platform, 
    TouchableHighlight, 
    TouchableNativeFeedback
}
from 'react-native';

import styles from '../styles.js';

import CurrentRoll from './CurrentRoll.js';
import DiceList from './DiceList.js'
import DieButton from './DieButton.js';

export default class PlayerActions extends Component{
	constructor(props) {
		super(props);

		this.dice = [];
		this.currentRollIndex = 0;

        let rowNr = 0;
        this.dice[rowNr] = [];
		for(let i = 1; i <= 6; i++){
			this.dice[rowNr].push({ id: i, value: i });
            if(i % 2 == 0 && rowNr < 2){
                rowNr ++;
                this.dice[rowNr] = [];
            }
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
                        />
                <View style={styles.userActionsButtons}>
                    {this.dice.map((items, index) => {
                        return (
                        <View key={index} style={styles.userActionsButtonsRow}>
                            {items.map((item) => {
                                return (
                                <DieButton 
                                    key={item.id} item={item} 
                                    style={styles.userActionsButton}
                                    contentStyle={styles.userActionsButtonImage}
                                    onPress={this._pushDie.bind(this)}/>
                                );
                            })}
                        </View>
                        );
                    })}
                </View>   
                <TouchableElement 
                    style={[styles.action, styles.actionSuccess]}
                    onPress={this._acceptRoll.bind(this)}>
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
        this.props.route.callback(this.state.currentRoll);
        this.props.navigator.pop();
        return;
        
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