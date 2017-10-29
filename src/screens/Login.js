 
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  Linking,
  Button, 
  LinkingIOS
} from 'react-native';
import OAuthManager from 'react-native-oauth';
import { StackNavigator, NavigationActions } from 'react-navigation';

const config =  {
  github: {
	client_id: 'a073278c3e852db231c2',
    client_secret: '4539e21cee1e225fd05c3b56a3a84d3042704480'
  }
}

  /*	const resetAction = NavigationActions.reset({
	  index: 0,
	  actions: [
	    NavigationActions.navigate({ 
	    	routeName: 'Main', 
	    })
	  ]
	});*/
/*
const manager = new OAuthManager('gitviewer')
manager.configure(config);

		manager.authorize('github')
  .then(resp => console.log(resp))
  .catch(err => console.log(err));

  const userTimelineUrl = 'https://api.github.com/users/greyform';
manager
  .makeRequest('twitter', userTimelineUrl)
  .then(resp => {
    console.log('Data ->', resp.data);
  });*/

export default class Login extends Component {
	constructor() {
		super();
		this.resp = null;
	}

  componentWillMount() {
    const config = {
      github: {
        client_id: 'a073278c3e852db231c2',
        client_secret: '4539e21cee1e225fd05c3b56a3a84d3042704480'
      }
    }
    this.manager = new OAuthManager('gitviewer')
    this.manager.configure(config);
     //console.log(this.manager);
  }
  login = () => {

  	this.manager.authorize('github', {scopes: 'user,public_repo'})
  		.then(resp => {this.resp = resp; console.log(this.resp)})
  		//.then(this.request)
  		.catch(err => console.log(err));

  	const resetAction = NavigationActions.reset({
	  index: 0,
	  actions: [
	    NavigationActions.navigate({ 
	    	routeName: 'Main', 
	    	params: {
	    		manager: this.manager,
	    		name: '/user'
	    	},
	    })
	  ]
	});
	  	
  	this.props.navigation.dispatch(resetAction);

	/*	try {
		
	      let response = await fetch('https://api.github.com/users/greyform');
	      let json = await response.json();
	    } catch(error) {
	      console.error(error);
	    }*/
  	}

  	logout = () => {
  		this.manager.deauthorize('github')
  		.then(resp => {this.resp = resp; console.log(this.resp)})
  		.catch(err => console.log(err));
  	}

  	request = () => {
  		this.manager.makeRequest('github', '/user/starred/hwu63/CS296-Streaming-Video', {
  			method: 'DELETE',
  			headers: { 
  				'Content-Length': 0
  			}
  		})
	    .then(resp => {
	      console.log('Data -> ', resp); })
	    .catch(err => console.log(err));
  	}


	render() {
		return (
			<KeyboardAvoidingView behavior='padding' style={styles.container}>
				<StatusBar
					barStyle='light-content'
				/>
				<View style={styles.logoContainer}>
					<Image 
						style={styles.logo}
						source={require('../images/octocat.png')} 
					/>
					<Text style={styles.head}>GitViewer</Text>
					<Text style={styles.title}>An app made for Github using React Native</Text>
				</View>

				<View style={{padding: 20, marginBottom: 60}}>
					<TouchableOpacity style={styles.buttonContainer} onPress={() => this.login()}>
						<Text style={styles.buttonText}>LOGIN</Text>
					</TouchableOpacity>
				</View>
				
				<Button title='logout' onPress={() => this.logout()} />
			</KeyboardAvoidingView>
		);
	}
}
/*<Button title='request' onPress={() => this.request()} />*/

class LoginForm extends Component {
	render() {
		return (
			<View style={{padding: 20}}>
				<TextInput 
					placeholder='username or email'
					placeholderTextColor='rgba(255, 255, 255, 0.7)'
					keyboardType='email-address'
					style={styles.input}
				/>
				<TextInput 
					placeholder='password'
					placeholderTextColor='rgba(255, 255, 255, 0.7)'
					secureTextEntry
					style={styles.input}
				/>

				<TouchableOpacity style={styles.buttonContainer}>
					<Text style={styles.buttonText}>LOGIN</Text>
				</TouchableOpacity>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		//justifyContent: 'center',
		//alignItems: 'center',
		backgroundColor: '#2c3e50'
	},
	logoContainer: {
		alignItems: 'center',
		flexGrow: 1,
		justifyContent: 'center'
	},
	logo: {
		width: 100,
		height: 100
	},
	title: {
		color: 'white',
		marginTop: 10,
		textAlign: 'center',
		opacity: 0.9,
		fontSize: 15
	},
	head: {
		color: 'white',
		marginTop: 10,
		textAlign: 'center',
		opacity: 0.9,
		fontSize: 20,
	},
	input: {
		height: 40,
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
		marginBottom: 20,
		color: 'white',
		paddingHorizontal: 10
	},
	buttonContainer: {
		backgroundColor: '#bdc3c7',
		paddingVertical: 15,
	},
	buttonText: {
		textAlign: 'center',
		fontWeight: '700',
	}
})