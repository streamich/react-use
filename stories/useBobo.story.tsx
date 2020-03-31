import React, { FC } from "react";
import { storiesOf } from "@storybook/react";
import { useBobo } from "../src";
import ShowDocs from "./util/ShowDocs";

const Demo: FC = () => {
  const { spotifyUrl, youTubeUrl } = useBobo();

  return (
    <div>
      <header>
        <h2>
          <span>
            <code>useBobo</code>
          </span>
        </h2>
      </header>
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
    </div>
  );
};

storiesOf("UI|useBobo", module)
  .add("Docs", () => <ShowDocs md={require("../docs/useBobo.md")} />)
  .add("Demo", () => <Demo />);
