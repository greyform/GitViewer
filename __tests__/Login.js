require('react-native');
const React = require('react');
const Login = require('../src/screens/Login');

// Note: test renderer must be required after react-native.
const renderer = require('react-test-renderer');

it('renders correctly', () => {
  const tree = renderer.create(
    'Login'
  );
});

it('renders the Image component', done => {
  const Image = require('Image');
  Image.getSize('path.jpg', (width, height) => {
    const tree = renderer.create(<Image style={{height, width}} />).toJSON();
    expect(tree).toMatchSnapshot();
    done();
  });
});