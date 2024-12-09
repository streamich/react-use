import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useLanguage } from '../src';
import NewTabStory from './util/NewTabStory';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [lang, setLang] = useLanguage();

  return (
    <NewTabStory>
      <div>
        <div>The document's current language is: {lang}</div>

        <br />

        <button onClick={() => setLang('en-US')}>Change to US English</button>
        <button onClick={() => setLang('es')}>Cambiar a español</button>
      </div>
    </NewTabStory>
  );
};

storiesOf('Sensors/useLanguage', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useLanguage.md')} />)
  .add('Demo', () => <Demo />);
