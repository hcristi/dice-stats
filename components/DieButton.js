'use strict';

import React, {
	Component, Image, TouchableHighlight 
}
from 'react-native';

const styles = require('../styles.js');

class DieButton extends Component{
	constructor(props) {
		super(props);
	};

	render() {
		return (
			<TouchableHighlight onPress={() => this.props.onPress(this.props.item)} >
				<Image source={this.getImg()} style={styles.diceListDie}/>
			</TouchableHighlight>
			);
	}

	getImg() {
		switch(this.props.item.value){
			case 1:
				return require ('./img/d1.png');
			case 2:
				return require ('./img/d2.png');
			case 3:
				return require ('./img/d3.png');
			case 4:
				return require ('./img/d4.png');
			case 5:
				return require ('./img/d5.png');
			case 6:
				return require ('./img/d6.png');
			}
	}
}

module.exports = DieButton;