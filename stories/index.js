import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MyComponent, { PureMyComponent } from '../src/components/MyComponent';

storiesOf('MyComponent', module)
  .add('with text', () => (
    <MyComponent/>
  ));