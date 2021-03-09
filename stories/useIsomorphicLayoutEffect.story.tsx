import { storiesOf } from '@storybook/react';
import * as React from 'react';
import ShowDocs from './util/ShowDocs';

storiesOf('Lifecycle/useIsomorphicLayoutEffect', module).add('Docs', () => (
  <ShowDocs md={require('../docs/useIsomorphicLayoutEffect.md')} />
));
