require('react-native');
const React = require('react');
const App = require('../App');

// Note: test renderer must be required after react-native.
const renderer = require('react-test-renderer');

it('renders correctly', () => {
  const tree = renderer.create(
    'App'
  );
});
