'use strict';
import React, {
	Component, Text, View
}
from 'react-native';

const styles = require('../styles.js');

class UserInfo extends Component{
	render() {
		return (
			<View style={styles.userInfo}>
				<Text >
					Cristi
				</Text>
			</View>);
	}
}

module.exports = UserInfo;
