import {
  StyleSheet,
  Dimensions
} from 'react-native';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  icon: {
    width: 15,
    height: 15,
    position: 'absolute',
    right: 50,
  },
  tab1: {
    flex: 1,
    width: width,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 20,
    flexWrap: 'wrap'
  },
  avatar: {
    width: 45, 
    height: 45, 
    borderRadius: 25
  },
  listItem: {
    flexDirection: 'row', 
    justifyContent: 'flex-start',
    alignItems: 'flex-start', 
    width: width,
    //marginTop: 10,
    marginLeft: 10,
    marginRight: 20
  },
  listContainer: {
    marginLeft: 10,
    flexWrap: 'wrap',
    //backgroundColor: 'black',
    width: width*0.7
  },
  listHeader: {
    fontSize: 15,
    //fontWeight: 'bold',
    //color: 'rgba(0, 122, 254, 1.0)',
  },
  listDescrip: { 
    fontSize: 13,
    marginRight: 20,
    flexWrap: 'wrap',
  },
  separator: {
    height: 1,
    width: Dimensions.get('window').width * 0.86,
    backgroundColor: "#CED0CE",
    marginLeft: "8%",
    //marginRight: '3%',
    marginTop: '3%',
    marginBottom: "3%",
  }
});

export default styles;