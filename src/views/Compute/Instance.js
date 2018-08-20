import React, { PureComponent } from 'react';

class Instance extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      reg: '',
      str: ''
    };
  }

  handleChange = ev => {
    ev.preventDefault();
    const value = ev.target.value;
    const name = ev.target.name;
    this.setState({
      [name]: value
    });
  };

  handleClick = ev => {
    ev.preventDefault();
    const { str, reg } = this.state;
    const re = new RegExp(reg);
    if (str && reg) {
      alert(`字符串：${str}
正则：${reg}
结果：${re.test(str)}`);
    } else {
      alert('请输入需验证的字符串以及正则表达式');
    }
  };

  render() {
    return (
      <div>
        <input
          type="text"
          name="str"
          placeholder="字符串"
          value={this.state.str}
          onChange={ev => this.handleChange(ev)}
        />
        <input
          type="text"
          name="reg"
          placeholder="正则表达式"
          value={this.state.reg}
          onChange={ev => this.handleChange(ev)}
        />
        <button onClick={ev => this.handleClick(ev)}>验证</button>
      </div>
    );
  }
}

export default Instance;
