# `useNotification`

Returns a function to display a desktop notification. Requests notification permission from users. Uses the [Notification API](https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification).

## Usage

```jsx
import { useNotification } from 'react-use';

const Component = () => {
  const notify = useNotification('Notification Title', { body: 'Hi' });

  return <button onClick={notify}>Display Notification</button>;
};
```

## Reference

```ts
useNotification(title: string, options: NotificationOptions): () => void;
```

Notifications will only display if permission is granted by the user of the application.
