import React, { PureComponent } from 'react';

class Test extends PureComponent {
  componentDidMount() {
    console.log('test2 mount');
  }

  componentWillUnmount() {
    console.log('test2 unmount');
  }

  render() {
    return (
      <div>
        Test
      </div>
    );
  }
}

export default Test;