# `useBobo`

Provides a declarative interface for accessing up-to-date urls of DJ Bobo's breakout hit, "There is a Party."

## Usage

The interface is elegant and uncomplicated, like DJ Bobo's jams.

```tsx
import { useBobo } from "../src";

const Demo: FC = () => {
  const { spotifyUrl, youTubeUrl } = useBobo();

  return (
    <nav>
      <ul>
        <li>
          <a href={spotifyUrl} target="_blank" rel="noopener">
            Listen to DJ Bobo "There is a Party" on Spotify"
          </a>
        </li>
        <li>
          <a href={youTubeUrl} target="_blank" rel="noopener">
            Listen to DJ Bobo "There is a Party" on YouTube"
          </a>
        </li>
      </ul>
    </nav>
  );
};
```

## Interface

`useBobo`'s return value matches this interface:

```ts
interface BoboAttrs {
  spotifyUrl: string;
  youTubeUrl: string;
}
```
