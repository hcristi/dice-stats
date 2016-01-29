'use strict';
import React, {
	Component, Text, ScrollView, View
}
from 'react-native';

const styles = require('../styles.js');
const DieButton = require('./DieButton.js');

class DiceList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: props.items || []
		};
		this.dieIndex = '';
	};

	componentWillReceiveProps(nextProps) {
		this.dieIndex = '';
		this.setState({
			items: nextProps.items || []
		});
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		if(!this.props.updatable)
			return false;

		return true;
	}

	componentDidUpdate() {
		this.scrollView.refs.InnerScrollView.measure((x,y,w,h) => this.scrollView.scrollTo(h,w));
	}

	render() {
		return (
			<View style={styles.diceList}>
				<ScrollView 
					horizontal={true}
					style={styles.diceScrollView}
					ref={(c) => this.scrollView = c}>
					{this.state.items.map(this._renderDie, this)}
				</ScrollView>
			</View>
		);	
	}

	_renderDie(item, index) {
		if(item.constructor === Array){
			this.dieIndex = index;
			return(
					<View key={index}>
						{item.map(this._renderDie, this)}
						<View style={styles.separatorV}></View>
					</View>
				);
		}

		let ind = this.dieIndex + '.' + index;

		return(
			<DieButton key={ind} number={item} onPress={this.props.onDiePress}></DieButton>
			);
	}
}

module.exports = DiceList;