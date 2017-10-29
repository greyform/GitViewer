import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, 
  Button, 
  Image
} from 'react-native';
import { DrawerNavigator} from 'react-navigation';

import FollowingScreen from './screens/Following';
import FollowerScreen from './screens/Follower';
import Repository from './screens/Repo';
import Profile from './screens/Profile';

// Define our main drawer navigation

const FirstScreen = DrawerNavigator({
    Profile: { 
      screen: Profile 
    },
    Repository: {
      screen: Repository
    },
    Following: {
      screen: FollowingScreen
    },
    Followers: {
      screen: FollowerScreen
    }
},);




/*const FirstScreen= DrawerNavigator({
  Profile: {
    screen: Profile,
    title: 'Home',
    path: 'profile/:user'
  },
  Repositories: {
    screen: Repository,
    title: 'Repositories'
  },
  Following: {
    screen: FollowingScreen
  },
  Follower: {
    screen: FollowerScreen
  }
},
);*/



export default FirstScreen;