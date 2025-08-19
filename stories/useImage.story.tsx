import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useImage } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const imageSrc = 'https://via.placeholder.com/150';

  const { hasLoaded, hasError } = useImage(imageSrc);

  if (hasError) {
    return null;
  }

  return (
    <div>
      {!hasLoaded && <>Loading...</>}
      {hasLoaded && <img src={imageSrc} />}
    </div>
  );
};

storiesOf('UI|useImage', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useImage.md')} />)
  .add('Demo', () => <Demo />);
