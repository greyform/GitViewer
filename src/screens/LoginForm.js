 
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


export default class LoginForm extends Component {
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