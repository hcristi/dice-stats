'use strict';
import React, {
	Component, Text, View
}
from 'react-native';

const styles = require('../styles.js');

export default class PlayerInfo extends Component{
	render() {
		return ( 
			<View style={styles.userInfo}>
				<Text style={styles.userInfoName}>Cristi</Text>
			</View>
			);
	}
}