const Realm = require('realm');
console.log("REALM", Realm);
/*const ProfileSchema = {
  name: 'Profile',
  primaryKey: 'id',
  properties: {
    id: 'int',
    login:  'string',
    name: 'string',
    avatar_url: 'string',
    bio: 'string',
    email: 'string',
    followers: 'Profile[]',
    following: 'Profile[]',
    repos: 'Repository[]'
  }
};*/
 

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

const FollowerSchema = {
  name: 'Follower',
  primaryKey: 'id',
  properties: {
    id: 'int',
    login: 'string',
    name: 'string',
    avatar_url: 'string',
  }
};


const FollowingSchema = {
  name: 'Following',
  primaryKey: 'id',
  properties: {
    id: 'int',
    login: 'string',
    name: 'string',
    avatar_url: 'string',
  }
};

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
  }
}

//import Realm from 'realm'
//const Realm = require('realm');
// Initialize a Realm with Car and Person models
Realm.open({schema: [ProfileSchema, FollowerSchema, FollowingSchema, RepoSchema], path: '/Users/Grace/GitViewer/src/storage/default.realm'});
/*You will be storing:
List of repositories
Followers list
Following list
Your personal information (name, Github username, etc.)
*/

export default Realm;