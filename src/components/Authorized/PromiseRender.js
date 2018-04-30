import React from 'react';

export default class PromiseRender extends React.PureComponent {
  state = {
    component: null
  };

  componentDidMount() {}

  static getDerivedStateFromProps(nextProps, prevState) {
    // new Props enter
    this.setRenderComponent(nextProps);
  }

  setRenderComponent = async props => {
    const ok = this.checkIsInstantiation(props.ok);
    const error = this.checkIsInstantiation(props.error);
    return await this.getAsyncComponent(props, ok, error);
  };

  getAsyncComponent = (props, ok, error) => {
    props.promise
      .then(() => ({
        component: ok
      }))
      .catch(() => ({
        component: error
      }));
  };

  checkIsInstantiation = target => {
    if (!React.isValidElement(target)) {
      return target;
    }
    return () => target;
  };

  render() {
    const Component = this.state.component;
    return Component ? (
      <Component {...this.props} />
    ) : (
      <div
        style={{
          width: '100%',
          height: '100%',
          margin: 'auto',
          textAlign: 'center'
        }}
      >
        Loading...
      </div>
    );
  }
}
