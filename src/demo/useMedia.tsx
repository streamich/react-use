const {execute} = require('puppet-master');

execute({
  func: ({React, demo}: any) => {
    demo(<div>hello</div>);
  },
  debug: true,
  args: [],
  module: __dirname + '/chrome.ts',
}).catch(console.error);