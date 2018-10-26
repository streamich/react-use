import {configure} from '@storybook/react';

const req = require.context('../src/stories/', true, /.*\.(stories|story)\.(js|jsx|ts|tsx)?$/);

const loadStories = () => {
  req.keys().forEach((filename) => req(filename));
};

configure(loadStories, module);
