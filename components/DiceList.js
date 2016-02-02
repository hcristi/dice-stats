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
		this.rollIndex = 0;
	};

	componentWillReceiveProps(nextProps) {
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
					style={styles.diceListScroll}
					ref={(c) => this.scrollView = c}>
					{this.state.items.map(this._renderDie, this)}
				</ScrollView>
			</View>
		);	
	}

	_renderDie(item, index) {
        let result = [];
        
		if(item.constructor === Array){
            item.map((val, ind) => {
                result.push(this._renderDie(val,ind));                
            }, this);
            
            if(index !== this.state.items.length - 1)
	            result.push(<View style={styles.separatorV}/>);

            return result;
		}
		return(
			<DieButton key={item.id} item={item} onPress={this.props.onDiePress}></DieButton>
			);
	}
}

module.exports = DiceList;