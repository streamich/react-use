import {configure} from '@storybook/react';

const req = require.context('../src/__stories__/', true, /.*\.(stories|story)\.(js|jsx|ts|tsx)?$/);

const loadStories = () => {
  req.keys().forEach((filename) => req(filename));
};

configure(loadStories, module);
