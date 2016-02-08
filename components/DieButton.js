'use strict';

import React, {
	View, Component, Image, TouchableHighlight 
}
from 'react-native';

import styles from '../styles.js';

export default class DieButton extends Component{
    static get propTypes() {
		return {
			style: View.propTypes.style,
            contentStyle: Image.propTypes.style
		};
	}
	constructor(props) {
		super(props);
	};

	render() {
        let TouchableElement = TouchableHighlight;
        // if (Platform.OS === 'android') {
        //     TouchableElement = TouchableNativeFeedback;
        // }
        
		return (
			<TouchableElement
                style={this.props.style} 
                onPress={() => this.props.onPress(this.props.item)} >
				<Image 
                    style={this.props.contentStyle}
                    source={DieButton.GetImg(this.props.item.value)} />
			</TouchableElement>
			);
	}

	static GetImg(number) {
		switch(number){
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