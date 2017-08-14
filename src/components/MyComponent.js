import React, { PureComponent, Component } from 'react';
import r from 'ramda';
import reactCSS from 'reactcss';
import { compose, withProps, withHandlers, withState, setDisplayName, setPropTypes } from 'recompose';

const B = (props) => (
  <p>{React.cloneElement(props.text, {
    b: 'World!',
  })}</p>
);

const stylesheet = (props) => reactCSS({
  default: {
    root: {
      backgroundColor: 'red',
    },

    text: {
      fontSize: 24,
    }
  },
  primary: {
    root: {
      backgroundColor: 'green',
    },
  },
  secondary: {
    root: {
      backgroundColor: 'pink',
    }
  }
}, {
  primary: props.kind === 'primary',
  secondary: props.kind === 'secondary',
});

const PureC = (props) => (
  <button
    style={props.styles.root}
    onClick={props.onClick}
  >
    <span style={props.styles.text}>Login</span>
  </button>
);

const enhance = compose(
  setPropTypes({
    // onClick: PropTypes.func.isRequired,
  }),
  withProps((props) => ({
    styles: stylesheet(props),
  })),
);

const C = enhance(PureC);

const D = (props) => (
  <div>{props.a} + {props.b}</div>
);

export const PureMyComponent = (props) => (
  <div>
    <B text={(<D a="Hello"/>)}/>
    <C
      kind={props.buttonKind}
      onClick={props.onLoginClick}
    />
  </div>
);

const enhanceMyComponent = compose(
  setDisplayName('MyComponent'),
  withState(
    'buttonKind',
    'setButtonKind',
    'primary',
  ),
  withState(
    'enabled',
    'setEnabled',
    false,
  ),
  withHandlers({
    onLoginClick: (props) => (e) => {
      props.setEnabled(true);
    }
  }),
);

export default enhanceMyComponent(PureMyComponent);

// ReactDOM.render(<MyComponent/>, document.getElementById('root'));