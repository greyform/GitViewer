 
import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  Image,
  FlatList,
  Linking,
  TouchableOpacity
} from 'react-native';

import { StackNavigator} from 'react-navigation';
import styles from './Style'




const followerData = require('realm');

const FollowerSchema = {
  name: 'Follower',
  primaryKey: 'id',
  properties: {
    id: 'int',
    login: 'string',
    //name: 'string',
    avatar_url: 'string',
  }
};


class FollowerScreen extends React.Component {
  constructor(props) {
    super(props);
    params = props.navigation.state.params || {};
  }
  state = {
    data: [],
  }

  createFollower = async (params) => {
    params.manager.makeRequest('github', `${params.name}/followers`)
    .then(resp => resp.data.forEach(
        function(item, index, array) {
          followerData.open({schema: [FollowerSchema], path: '/Users/Grace/GitViewer/src/storage/followerData.realm'})
          .then(realm => 
          realm.write(() => {
            const myrepo = realm.create('Follower', {
              id: item.id,
              //name: item.name,
              login: item.login,
              avatar_url: item.avatar_url
            });
          }) //realm.write
          )
        }
      ));
  }



  componentDidMount() {
    followerData.open({schema: [FollowerSchema], path: '/Users/Grace/GitViewer/src/storage/followerData.realm'})
    .then(realm => { 
      let pastData = realm.objects('Follower'); 
      if (pastData.length == 0) {
        this.fetchData(params)
        this.createFollower(params)
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
    params.manager.makeRequest('github', `${params.name}/followers`)
    .then(resp => {
        this.setState({data: resp.data});
        })
    .catch(err => console.log(err));
  }

  handleClick = (user) => {
    this.props.navigation.navigate('ProfilePage', {
      manager: this.props.navigation.state.params.manager,
      name: `/users/${user}`
    });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginTop: '3%',
          marginBottom: "3%",
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.tab1}>
        <FlatList data={this.state.data} 
        keyExtractor={(x,i) =>i}
        renderItem={({item}) => 
              <TouchableOpacity style={styles.listItem} onPress={() => this.handleClick(item.login)}>
                <Image style={styles.avatar} source={{uri: item.avatar_url}} />
                <View style={styles.listContainer}>
                  <Text style={styles.listHeader}>{item.login}</Text>
                 <Text style={styles.listDescrip}>{item.id}</Text>
                </View>
              </TouchableOpacity>
        }
        ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}


export default FollowerScreen;




