 
import React from 'react';
import {
  Text,
  View,
  Button,
  Image,
  StyleSheet, 
  Icon,
  Dimensions, 
  TouchableOpacity,
  SectionList,
  FlatList,
  Header
} from 'react-native';

import { StackNavigator, TabNavigator, } from 'react-navigation';

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
  tab1: {
    flex: 1, //will fill entire screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 50,
  },
  //contains default background, Avatar, Name, username
  headerContainer: { 
    flexDirection: 'row',
    flex: 0.3,
    backgroundColor: 'blue',
  },
});

class HeaderContainer extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ tintColor }) => (
          //<Icon name='search' size={20} color='white' />
           <Image
          source={require('./settings.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
        ),
  }

  /* parent contains all others
    1. holds the app header components
    2.  contains the ScrollableTabView of repo, etc

  */
  render() {
    return (
     <Text style={styles.tabText}>Under Construction...</Text>
    );
  }
}
        /*  */



const SecondScreen = StackNavigator({
  Header: {
    screen: HeaderContainer,
  },
}, {
  navigationOptions: {
    title: 'Settings',
  }
});
export default SecondScreen;
//headerContainer, contains

