# `useDownloader`

Creates a download handler function with its progress information and cancel ability.

## Usage

```tsx
import React from "react";
import { useDownloader } from "react-use";

export default function App() {
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
      <label for="file">Downloading progress:</label>
      <progress id="file" value={percentage} max="100" />
      <p>Elapsed time in seconds {elapsed}</p>
      {error && <p>possible error {JSON.stringify(error)}</p>}
    </div>
  );
}
```


## Reference

`useDownloader()` returns:

- An object with the following keys:

| key          | description                      | arguments                               |
| ------------ | -------------------------------- | --------------------------------------- |
| size         | size in bytes                    | n/a                                     |
| elapsed      | elapsed time in seconds          | n/a                                     |
| percentage   | percentage in string             | n/a                                     |
| download     | download function handler        | (downloadUrl: string, filename: string) |
| cancel       | cancel function handler          | n/a                                     |
| error        | error object from the request    | n/a                                     |
| isInProgress | boolean denoting download status | n/a                                     |

```tsx
const {
    size,
    elapsed,
    percentage,
    download,
    cancel,
    error,
    isInProgress
  } = useDownloader();
```
