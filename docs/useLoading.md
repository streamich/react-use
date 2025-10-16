# `useLoading`

React state hook that control loading states

## Usage

```jsx
import {useToggle} from 'react-use';

const Demo = () => {
  const [state, startLoading, stopLoading] = useLoading(["page", "submit"]);
 /* or const [state, startLoading,stopLoading] = useLoading({
      page: false,
      submit: false
    })

    or const [state, startLoading,stopLoading] = useLoading("page") // for single loading
 */
  return (
    <div>
      <div>{JSON.stringify(state, null, 2)}</div>
      <button onClick={() => { startLoading('page')}}>Start <b>page</b> loading</button>
      <button onClick={() => { stopLoading('page')}}>Stop <b>page</b> loading</button>

      <button onClick={() => { startLoading('submit')}}>Start <b>submit</b> loading</button>
      <button onClick={() => { stopLoading('submit')}}>Stop <b>submit</b> loading</button>
    </div>
  );
};

```
