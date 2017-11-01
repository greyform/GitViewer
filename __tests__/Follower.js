require('react-native');
const React = require('react');
const Follower = require('../src/screens/Follower');

// Note: test renderer must be required after react-native.
const renderer = require('react-test-renderer');

it('renders correctly', () => {
  const tree = renderer.create(
    'Follower'
  );
});

// These serve as integration tests for the jest-react-native preset.
it('renders the FlatList component', () => {
  const FlatList = require('FlatList');
  const tree = renderer
    .create(<FlatList />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the Image component', done => {
  const Image = require('Image');
  Image.getSize('path.jpg', (width, height) => {
    const tree = renderer.create(<Image style={{height, width}} />).toJSON();
    expect(tree).toMatchSnapshot();
    done();
  });
});
