import {configure} from '@storybook/react';
import {setOptions} from '@storybook/addon-options';

setOptions({
  sortStoriesByKind: false,
  showStoriesPanel: true,
  showAddonPanel: true,
  showSearchBox: false,
  addonPanelInRight: true,
  hierarchySeparator: /\//,
  hierarchyRootSeparator: /\|/,
  sidebarAnimations: false,
});

const req = require.context('../src/', true, /.*\.(stories|story)\.(js|jsx|ts|tsx)?$/);

const loadStories = () => {
  req.keys().forEach((filename) => req(filename));
};

configure(loadStories, module);
