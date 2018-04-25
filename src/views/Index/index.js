import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
// import queryString from 'query-string';

@connect(({ router }) => ({ router }), { push })
class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShow: true
    };
  }

  onClick = ev => {
    ev.stopPropagation();
    ev.preventDefault();
    // const params = {
    //   userId: '123',
    //   age: 12
    // };
    this.props.push({
      pathname: 'network',
      // search: queryString.stringify(params)
      search: ''
    });
  };

  render() {
    const style = { background: 'white', height: '2300px' };
    return (
      <div style={style}>
        <button onClick={ev => this.onClick(ev)}>
          indexClick
        </button>
      </div>
    );
  }
}

export default Index;
