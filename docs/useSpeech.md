# `useSpeech`

React UI hook that synthesizes human voice that speaks a given string.


## Usage

```jsx
import {useSpeech} from 'react-use';

const voices = window.speechSynthesis.getVoices();

const Demo = () => {
  const state = useSpeech('Hello world!', { rate: 0.8, pitch: 0.5, voice: voices[0] });

  return (
    <pre>
      {JSON.stringify(state, null, 2)}
    </pre>  
  );
};
```
