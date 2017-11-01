require('react-native');
const React = require('react');
const Profile = require('../src/screens/Profile');
const ProfilePage = require('../src/screens/Profile');
// Note: test renderer must be required after react-native.
const renderer = require('react-test-renderer');

it('renders correctly', () => {
  const tree = renderer.create(
    'Profile'
  );
});

it('renders correctly ProfilePage', () => {
  const tree = renderer.create(
    'ProfilePage'
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly HeaderPage', () => {
  const tree = renderer.create(
    'Header'
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly Content', () => {
  const tree = renderer.create(
    'Content'
  ).toJSON();
  expect(tree).toMatchSnapshot();
});


it('renders correctly Bar', () => {
  const tree = renderer.create(
    'Content'
  ).toJSON();
  expect(tree).toMatchSnapshot();
});







/*jest.mock('../src/screens/', () => {
  const mockComponent = require('react-native/jest/mockComponent');
  return mockComponent('path/to/MyNativeComponent');
});*/