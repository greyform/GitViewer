 
import React from 'react';
import {
  Text,
  View,
  Button,
  Image,
  StyleSheet, 
  Dimensions, 
  TouchableOpacity,
  ScrollView,
  ActionSheetIOS,
  NavigationActions
} from 'react-native';

import ImageHeader from './ImageHeader'
import { StackNavigator } from 'react-navigation';
import Repository from './Repo'
import FollowingScreen from './Following'
import FollowerScreen from './Follower'

const profileData = require('realm');

const ProfileSchema = {
  name: 'Profile',
  primaryKey: 'id',
  properties: {
    id: 'int',
    login: 'string',
    name: 'string',
    avatar_url: 'string',
    email: 'string?',
    bio: 'string?',
    website: 'string?'
  }
}

var w = Dimensions.get('window').width;
var h = Dimensions.get('window').height;
var dim = 0;
if (w > h) {
  dim = h*0.12;
} else {
  dim = w*0.25;
}


var BUTTONS = [
  'Follow',
  'Unfollow',
  'Cancel',
];

var COLORS = [
  '#f1c40f',
  'white',
];

var METHODS = [
  'PUT',
  'DELETE',
];


var DESTRUCTIVE_INDEX = 1;
var CANCEL_INDEX = 2;

class ActionSheet extends React.Component {
  state = {
    clicked: 'none',
    color: 'white',
  }

  showActionSheet = () => { 
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
    },
    (buttonIndex) => {
     if (buttonIndex != 2) {// unfollow
        this.setState({ clicked: BUTTONS[buttonIndex], color: COLORS[buttonIndex]});
        this.request(buttonIndex);
      }
    });
  }

  request = (buttonIndex) => {
    console.log("PROFILE-FOLLOW-REQUEST", this.props);
      this.props.manager.makeRequest('github', `/user/following/${this.props.name}`, {
        method: METHODS[buttonIndex],
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
      <View>
        <TouchableOpacity onPress={this.showActionSheet} >
          <Image 
            source={require('./../images/following.png')} 
            style={{width: 25, height: 25, tintColor: this.state.color, position: 'absolute', right: 90, top: 55}}/>
        </TouchableOpacity>
        
      </View>
    );
  }
}
/*<Text>
          Clicked button: {this.state.clicked}
        </Text>*/        






class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  logout = () => {
      this.props.navigation.state.params.manager.deauthorize('github')
      .then(resp => {console.log(resp)})
      .catch(err => console.log(err));


      
    this.props.navigation.dispatch({ 
          type: 'Navigation/NAVIGATE',
          routeName: 'App',
          action: {
            type: 'Navigation/NAVIGATE',
            routeName: 'Login',
          }
      })
  }


  render() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.header}>
         
            <Image style={styles.userImage} source={{url: this.props.avatar_url}} resizeMode='contain' />
            <Text style={styles.realName}>{this.props.name}</Text>
            <Text style={styles.userName}>{this.props.login}</Text>

        </View>
        <Button title='logout' onPress={() => this.logout()} />
       <ActionSheet manager={this.props.navigation.state.params.manager} name={this.props.login}/>
      </View>
      
    );
  }
}

class Bar extends React.Component {
  constructor(props) {
    super(props);
    console.log("BAR-CONSTRUCT", this.props)
  }

  render() {
    return (
        <View style={styles.bar}>
          <View style={[styles.barItem, styles.barseparator]}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Following', this.props.navigation.state.params)}>
            <Text style={styles.barTop}>{this.props.following}</Text>
            <Text style={styles.barBottom}>Following</Text> 
            </TouchableOpacity>
          </View>

          <View style={styles.barItem}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Follower', this.props.navigation.state.params)}>
            <Text style={styles.barTop}>{this.props.followers}</Text>
            <Text style={styles.barBottom}>Followers</Text> 
            </TouchableOpacity>
          </View>

        </View> 
    );
  }
}


class Separator extends React.Component {
  render() {
    return (
      <View style={{
        height: 1,
        width: "100%",
        backgroundColor: "#CED0CE",
        marginTop: '3%',
        marginBottom: "3%",
      }}
      />
    );
  }
}


class Content extends React.Component {
  constructor(props){
    super(props);
    data = props.data;
  };

  render() {
    return (
      <ScrollView>
         <View style={styles.contentContainer}>

           <View style={styles.sectionContainer}>
            <Text style={styles.listHeader}>Bio</Text>
            <Text style={styles.listDescrip}>{this.props.data.bio}</Text>
           </View>

           <Separator />

           <View style={styles.sectionContainer}>
            <Text style={styles.listHeader}>Website</Text>
            <Text>{this.props.data.html_url}</Text>
           </View>
              
          <Separator />

           <View style={styles.sectionContainer}>
            <Text style={styles.listHeader}>Email</Text>
            <Text>{this.props.data.email}</Text>
           </View>
           
          <Separator />

          <View style={styles.sectionContainer}>
            <Text style={styles.listHeader}>Public Repos</Text>
            <TouchableOpacity style={styles.listItem} onPress={() => this.props.navigation.navigate('Repositories', this.props.navigation.state.params)}>
            <Text>{this.props.data.public_repos}</Text>
            </TouchableOpacity>
          </View>
            
          <Separator />

          <View style={styles.sectionContainer}>
            <Text style={styles.listHeader}>Joined Date</Text>
            <Text>{this.props.data.created_at}</Text>
          </View>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    //backgroundColor: '#2c3e50'
  },
  icon: {
    width: 25,
    height: 25,
  },
  realName: {
    fontSize: 24,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
  userName: {
    color: '#FFF', 
    fontSize: 20,
    textAlign: 'center',
  },
  userImage: {
    width: dim,
    height: dim,
    borderRadius: 20,
  },
  headerContainer: {
    width: null, 
    alignSelf: 'stretch',
    //Dimensions.get('window').width,
    //flex: 1,
    height: h * 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c3e50'
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    //backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bar: {
    borderTopColor: '#CED0CE',
    borderTopWidth: 2,
    borderBottomColor: '#CED0CE',
    borderBottomWidth: 2,
    backgroundColor: 'rgba(255,255,255, 0.8)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  barItem: {
    flex: 1,
    padding: 5,
    alignItems: 'center',

  },
  barseparator: {
    borderRightWidth: 2,
    borderColor: '#CED0CE',
  },
  barTop: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  barBottom: {
    //color: 'white',
    fontSize: 14,
  },
  contentContainer: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-between', 
    alignItems: 'stretch',
 },
  listHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    //color: 'rgba(0, 122, 254, 1.0)',
  },
  listDescrip: { 
    fontSize: 13,
    marginRight: 20,
    flexWrap: 'wrap',
  }
});



class ProfilePage extends React.Component {
  constructor(props) {
    super(props);  
    params = props.navigation.state.params || {}
  }
  
  state = {
    data: [],
  }

  createProfile = async (params) => {
    params.manager.makeRequest('github', params.name)
    .then(resp => {
          profileData.open({schema: [ProfileSchema], path: '/Users/Grace/GitViewer/src/storage/profileData.realm'})
          .then(realm => 
          realm.write(() => {
                    const myrepo = realm.create('Profile', {
                      id: resp.data.id,
                      login: resp.data.login,
                      avatar_url: resp.data.avatar_url,
                      name: resp.data.name,
                      email: resp.data.email,
                      bio: resp.data.bio,
                      website: resp.data.html_url
                    });
          }) //realm.write
          );
        }
      );
  }

  componentDidMount() {
    profileData.open({schema: [ProfileSchema], path: '/Users/Grace/GitViewer/src/storage/profileData.realm'})
    .then(realm => { 
      console.log("NAME-PROFILE", params.name);
      let pastData = realm.objects('Profile'); 
      if (pastData.length == 0) {
        this.fetchData(params)
        this.createProfile(params)
      } else {
        this.fetchData(params)
        //this.createRepo(params)
        //this.setState({data: pastData, imgSrc: resp.data[0].owner.avatar_url, owner: resp.data[0].owner.login});
      }
    }).catch(error => {
      console.log(error);
    });
  }
  fetchData = async (params) => {
    if (params.name == null)
      params.name = '/user'
    params.manager.makeRequest('github', params.name)
    .then(resp => {
        this.setState({data: resp.data});
        console.log('Data -> ', resp); })
    .catch(err => console.log(err));
  }
  render() {
    return (
      <View style={styles.container}>
        <HeaderContainer 
          avatar_url={this.state.data.avatar_url} 
          name={this.state.data.name}
          login={this.state.data.login} {...this.props}/>
        <Bar 
          followers={this.state.data.followers}
          following={this.state.data.following} 
          {...this.props}/>

        <Content data={this.state.data} {...this.props}/>

      </View>
    );
  }
}

const Profile = StackNavigator({
  ProfilePage: {
    screen: ProfilePage,
    path: 'user/:name',
    //headerMode: 'float',
    /*navigationOptions: ({navigation}) => ({
      headerStyle: {
        height: 80,
      },
      title: `${navigation.state.params.name}'s Profile`,
    }),*/
  },
  Repositories: {
    screen: Repository,
    headerMode: 'float',
    navigationOptions: ({navigation}) => ({
      headerStyle: {
        height: 65,
      },
      title: 'Repository' //`${navigation.state.params.name.toUpperCase()}'s Repository'`,
    }),
  },
  Follower: {
    screen: FollowerScreen,
    headerMode: 'float',
    navigationOptions: ({navigation}) => ({
      headerStyle: {
        height: 65,
      },
      title: 'Followers', ////`${navigation.state.params.name}'s Profile'`,
    }),
  },
  Following: {
    screen: FollowingScreen,
    headerMode: 'float',
    navigationOptions: ({navigation}) => ({
      headerStyle: {
        height: 65,
      },
      title: 'Following', ////`${navigation.state.params.name}'s Profile'`,
    }),
  }
},);

Profile.navigationOptions = ({navigation, screenProps}) => {
    const params = navigation.state.params || {};   // You can get the params here as navigation.state.params.paramsKey
    //console.log("CompareScreen product_id:", params.manager);
}


export default Profile;


