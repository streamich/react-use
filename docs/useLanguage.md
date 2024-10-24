# `useLanguage`

React state hook that tracks the document's `lang` attribute.

## Usage

```jsx
import { useLanguage } from 'react-use';

const Demo = () => {
  const [lang, setLang] = useLanguage();

  return (
    <div>
      <div>
        The document's current language is: {lang}
      </div>

      <br />

      <button onClick={() => setLang("en-US") }>Change to US English</button>
      <button onClick={() => setLang("es") }>Cambiar a español</button>
    </div>
  );
};
```
