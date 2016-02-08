'use strict';
import React, {
	Component, Text, View
}
from 'react-native';

import styles from '../styles.js';

export default class PlayerInfo extends Component{
	render() {
		return ( 
			<View style={styles.userInfo}>
				<Text style={styles.userInfoName}>Cristi</Text>
			</View>
			);
	}
}