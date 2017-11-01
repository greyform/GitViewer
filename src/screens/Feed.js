import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, 
  Button, 
  Image
} from 'react-native';


export default class Feed extends React.Component {
	constructor(props) {
		super(props);
		params = props.navigation.state.params || {}
	}
	state = {
		data: []
	}

	componentDidMount() {
        this.fetchData(params);
  	}

  	fetchData = async (params) => {
	    params.manager.makeRequest('github', 'gnotif')
	    .then(resp => {
	        this.setState({data: resp.data, imgSrc: resp.data[0].owner.avatar_url, owner: resp.data[0].owner.login});
	        })
	    .catch(err => console.log(err));
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>under construction</Text>
			</View>
		);
	}
}



const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	}
})