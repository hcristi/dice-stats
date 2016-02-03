'use strict';

import React, {
	Component,
	View,
	Text,
	Animated,
	StyleSheet
} from 'react-native'

export default class CustomChart extends Component{
	static get propTypes() {
		return {
			style: View.propTypes.style
		};
	}

	constructor(props){
		super(props);
		

		this.state = {
			max: null,
			data: props.data || []
		}

		//props
		this.xLabels = [];
		this.yData = [];
		this.totalItems = this.state.data.length;
		this.shouldCompute = true;
	}

	componentWillReceiveProps(nextProps) {
		this.state.data = nextProps.data || [];
		this.shouldCompute = true;
		this.setState({
			data: this.state.data
		})
	}

	render() {
		this._computeData();

		return (
			<View style={[this.props.style, styles.container]} 
					onLayout={this._onLayout.bind(this)}>
				{this.yData.map(this._renderChartItem, this)}
			</View>
			);
	}

	_onLayout(obj) {
		let max = {
			width: obj.nativeEvent.layout.width,
			height: obj.nativeEvent.layout.height
		};

		if(	this.state.max === null ||
		 	this.state.max.width !== max.width || 
		 	this.state.max.height !== max.height){
			
			this.setState({
				max
			});
		}
	}

	_renderChartItem(item, index) {
		let barSize = 1;
		if(this.state.max)
			barSize = (item.getYPercent() / 100 * (this.state.max.height - 50)) || 1;

		return (
			<View style={styles.item} key={item.getX()}>
	          <View style={styles.data}>
	            	<Text style={styles.dataNumber}>{item.getYPercent()}%</Text>
              		<View style={[styles.bar, styles.assists, {height: barSize}]} />
	          		<Text style={styles.dataNumber}>{item.getXLabel()}</Text>
	          </View>
	        </View>
        );
	}

	_computeData() {
		if(this.state.max == null || !this.shouldCompute)
			return;

		this.yData = [];
		let shouldSort = false;

		if(this.xLabels.length)
			for (var i = 0; i < this.xLabels.length; i++) {
				if(this.yData.findIndex(x => x.getX() == this.xLabels[i]) < 0)
					this.yData.push(new CustomChartItem(
						this.xLabels[i],
						this.xLabels[i]));
			}
				
		this.state.data.forEach(dataItem => { 
			let item = this.yData.find(x => x.getX() == dataItem.value);
			if(!item){
				item = new CustomChartItem(dataItem.value, dataItem.value);
				this.yData.push(item);
				shouldSort = true;
			}
	
			item.addY(1);
		})

		this.yData.forEach(item => item.calcYPercentage(this.state.data.length));
		this.yData.sort((a,b) => a.getX() - b.getX());
		this.shouldCompute = false;
	}
}

class CustomChartItem {
	constructor(xlabel, xValue){
		this.xLabel = xlabel;
		this.X = xValue;
		this.yPercent = 0;
		this.Y = 0;
	}

	getXLabel() {
		return this.xLabel;
	}

	getX() {
		return this.X;
	}

	getY() {
		return this.Y;
	}

	setY(value) {
		this.Y = value;
	}

	getYPercent () {		
		return this.yPercent;
	}

	addY(value){
		this.Y += value;
	}

	calcYPercentage(source) {
		this.yPercent = Math.round((this.Y * 100 / source) * 10) / 10;
	}

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 6,
    justifyContent : 'space-around'
  },
  item: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    color: '#CBCBCB',
    fontSize: 12,
    top: 2

  },
  data: {
    flex: 1,
    flexDirection: 'column',
    justifyContent : 'flex-end'
  },
  dataNumber: {
    color: '#CBCBCB',
    fontSize: 12
  },
  bar: {
    alignSelf: 'center',
    borderRadius: 5,
    width: 8,
    marginRight: 5
  },
  assists: {
    backgroundColor: '#FCBD24'
  },
})