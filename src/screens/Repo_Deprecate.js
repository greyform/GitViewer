 
import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  Image,
  StyleSheet,
  FlatList,
  SectionList,
  Linking,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import styles from './Style';
import Realm from './../storage/schemaExample';


/*var Client = require("./../react-native-github-api/lib/index");
var github = new Client({
    debug: true,
});*/
var COLORS = [
  'grey', //not stared
  '#f1c40f',
]

var txt = '\u2605';

const repoData = require('realm');

const RepoSchema = {
  name: 'Repository',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    owner: 'string',
    description: 'string',
    avatar_url: 'string',
  }
};




class Repository extends React.Component {
  constructor(props) {
    super(props);
    params = props.navigation.state.params || {};
  }
  state = {
    data: [],
    imgSrc: "",
    owner: "",
    star: 0,
  }


  createRepo = async (params) => {
    params.manager.makeRequest('github', `${params.name}/repos`)
    .then(resp => resp.data.forEach(
        function(item, index, array) {
          console.log("DATA", item);
          if (item.description == null)
            item.description = 'No Description';
          repoData.open({schema: [RepoSchema], path: '/Users/Grace/GitViewer/src/storage/repoData.realm'})
          .then(realm => 
          realm.write(() => {
            const myrepo = realm.create('Repository', {
              id: item.id,
              name: item.name,
              owner: item.owner.login,
              description: item.description
              avatar_url: item.avatar_url
            });
          }) //realm.write
          )
        }
      ));

 /* saveData = (data) => {
    AsyncStorage.setItem(data.name, data);
  }


  createRepo = async (params) => {
    params.manager.makeRequest('github', `${params.name}/repos`)
    .then(resp => resp.data.forEach(
        function(item, index, array) {
          console.log("DATA", index);
          this.saveData(item);
        }
      ));*/

  /*createObject = (data) => {
    const myrepo = realm.create('Repository', {
          id: this.state.data.id,
          name: this.state.data.name,
          owner: this.state.owner.login,
          description: this.state.data.description,
          avatar_url: this.state.data.avatar_url
        });
  }*/
 /* repoData.open({schema: [RepoSchema], path: '/Users/Grace/GitViewer/src/storage/repoData.realm'})
    .then(realm => { 
      console.log("DATA", realm);
      this.state.data.forEach(
        function(item, index, array) {
          console.log("DATA", item);
        /*realm.write((item) => {
          console.log("DATA", item);
          const myrepo = realm.create('Repository', {
            id: item.id,
            name: item.name,
            ownerId: item.owner.id,
            description: item.description
          });

        }) //realm.write
        }
      )
      
    });*/
  }

  componentDidMount() {

    this.fetchData(params)
    this.createRepo(params)
    

  /*.then(realm => {
    // Create Realm objects and write to local storage
    realm.write(() => {
      const myCar = realm.create('Car', {
        make: 'Honda',
        model: 'Civic',
        miles: 1000,
      });
      myCar.miles += 20; // Update a property value
    });
*/

  }

  fetchData = async (params) => {
    params.manager.makeRequest('github', `${params.name}/repos`)
    .then(resp => {
        this.setState({data: resp.data, imgSrc: resp.data[0].owner.avatar_url, owner: resp.data[0].owner.login});
        })
    .catch(err => console.log(err));
  }
  handleClick = (url) => {
    console.log('handleClick')
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  request = (owner, name, method) => {
    console.log("PROFILE-FOLLOW-REQUEST", owner);
    console.log("PROFILE-FOLLOW-REQUEST", `/user/starred/${owner}/${name}`);
      params.manager.makeRequest('github', `/user/starred/${owner}/${name}`, {
        method: method,
        headers: { 
          'Content-Length': 0
        }
      })
      .then(resp => {
        console.log('Data -> ', resp); })
      .catch(err => console.log(err));
  }


  toggleStar = (owner, name) => {
    console.log("PROFILE-FOLLOW-REQUEST", owner);
    console.log("PROFILE-FOLLOW-REQUEST", this.state.star);
    if (this.state.star == 0) {
      console.log("PROFILE-FOLLOW-REQUEST", `PUT /user/starred/${owner}/${name}`);
      this.setState({data: this.state.data, imgSrc: this.state.imgSrc, owner: this.state.owner, star: 1});
      this.request(owner, name, 'PUT');
      
    } else {
      console.log("PROFILE-FOLLOW-REQUEST", `DELETE /user/starred/${owner}/${name}`);
      this.request(owner, name, 'DELETE');
      this.setState({star: 0});
    }
    console.log("PROFILE-FOLLOW-REQUEST", this.state.star);
  };

  renderSeparator = () => {
    return (
      <View
        style={styles.separator}
      />
    );
  };
 
  render() {
    return (
      <View style={styles.tab1}>
        <FlatList data={this.state.data} 
        keyExtractor={(x,i) =>i}
        renderItem={({item}) => 
              
              <View style={styles.listItem}>
                <TouchableOpacity style={styles.listItem} onPress={() => this.handleClick(item.html_url)}>
                  <Image style={styles.avatar} source={{uri: item.owner.avatar_url}} />
                  <View style={styles.listContainer}>
                    <Text style={styles.listHeader}>{item.name}</Text>
                    <Text style={styles.listDescrip}>{item.description}</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.toggleStar(item.owner.login, item.name)} >
                  <Image style={[styles.icon, {tintColor: COLORS[this.state.star]}]} source={require('./../images/star.png')} />
                  <Text style={{fontSize: 12, color: COLORS[this.state.star], position: 'absolute',
    right: 50, top: 20}}>star/unstar</Text>
                </TouchableOpacity>
              </View>
              
        }
        ItemSeparatorComponent={this.renderSeparator}
        />
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
        <Text style={{fontSize: 15, margin: 10}}>Owned by {this.state.owner}</Text>
        </TouchableOpacity>

      </View>
    );
  }
}


/* <Image style={[styles.icon, {tintColor: COLORS[this.state.star]}]} source={require('./../images/star.png')} />*/
export default Repository;
