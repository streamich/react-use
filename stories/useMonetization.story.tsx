import {storiesOf} from '@storybook/react';
import * as React from 'react';
import {useMonetization} from '../src';
import NewTabStory from './util/NewTabStory';
import ShowDocs from './util/ShowDocs';
import {CenterStory} from './util/CenterStory';

const Demo = () => {
  const {state, setWallet, removeWallet} = useMonetization();
  const [name, setName] = React.useState<string>('');
  const [metaCreated, setMeta] = React.useState<boolean>(false);

  return <React.Fragment>
    <NewTabStory>
      {metaCreated ?
        <React.Fragment>
          <CenterStory>See developers console / Elements tab to see added meta tag </CenterStory>
          <CenterStory>
            <button onClick={
              () => {
                removeWallet();
                setMeta(false);
              }
            }>remove wallet
            </button>
          </CenterStory>
        </React.Fragment> :
        <React.Fragment>
          <CenterStory>Set new wallet</CenterStory>
          <CenterStory><input type='text' value={name}
                              onChange={(e) => setName(e.target.value)}/></CenterStory>
          <CenterStory>
            <button onClick={() => {
              setWallet(name);
              setMeta(true)
            }}>Set Wallt
            </button>
          </CenterStory>
        </React.Fragment>
      }
      <CenterStory>{`the status of the monetization on the page is: ${state}`}</CenterStory>
    </NewTabStory>
  </React.Fragment>
};

storiesOf('Side effects/useMonetization', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useMonetization.md')}/>)
  .add('Demo', () => <Demo/>);
