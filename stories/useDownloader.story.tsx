import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useDownloader } from '../src';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const { size, elapsed, percentage, download, cancel, error, isInProgress } = useDownloader();

  const fileUrl =
    'https://upload.wikimedia.org/wikipedia/commons/4/4d/%D0%93%D0%BE%D0%B2%D0%B5%D1%80%D0%BB%D0%B0_%D1%96_%D0%9F%D0%B5%D1%82%D1%80%D0%BE%D1%81_%D0%B2_%D0%BF%D1%80%D0%BE%D0%BC%D1%96%D0%BD%D1%8F%D1%85_%D0%B2%D1%80%D0%B0%D0%BD%D1%96%D1%88%D0%BD%D1%8C%D0%BE%D0%B3%D0%BE_%D1%81%D0%BE%D0%BD%D1%86%D1%8F.jpg';
  const filename = 'beautiful-carpathia.jpg';

  return (
    <div className="App">
      <p>Download is in {isInProgress ? 'in progress' : 'stopped'}</p>
      <button onClick={() => download(fileUrl, filename)}>Click to download the file</button>
      <button onClick={() => cancel()}>Cancel the download</button>
      <p>Download size in bytes {size}</p>
      <label htmlFor="file">Downloading progress:</label>
      <progress id="file" value={percentage} max="100" />
      <p>Elapsed time in seconds {elapsed}</p>
      {error && <p>possible error {JSON.stringify(error)}</p>}
    </div>
  );
};

storiesOf('Miscellaneous/useDownloader', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useDownloader.md')} />)
  .add('Demo', () => <Demo />);
