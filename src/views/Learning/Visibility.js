import React, { PureComponent } from 'react';

class Visibility extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isHiden: false
    };
  }

  handleClick = ev => {
    ev.stopPropagation();
    ev.preventDefault();
    this.setState({
      isHiden: !this.state.isHiden
    });
  };

  render() {
    return (
      <div>
        <button onClick={ev => this.handleClick(ev)}>显示/隐藏</button>
        <div
          style={{
            width: '300px',
            height: '200px',
            background: 'blue',
            visibility: this.state.isHiden ? 'hidden' : 'initial',
            transition: 'all 1s'
          }}
        />
      </div>
    );
  }
}

export default Visibility;
