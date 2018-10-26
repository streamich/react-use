const {execute} = require('puppet-master');

export const render = (func: (payload: {React: any, demo: any, lib: any}) => any) => {
  execute({
    func,
    debug: true,
    args: [],
    module: __dirname + '/chrome.ts',
  }).catch(console.error);
};
