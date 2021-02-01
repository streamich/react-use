import * as React from 'react';

const h = React.createElement;

const ShowDocs = (props) => {
  return h(
    'div',
    {},
    h('div', {
      style: {
        padding: '0 20px',
      },
      dangerouslySetInnerHTML: {
        __html: props.md.default,
      },
    }),
    h('style', {
      dangerouslySetInnerHTML: {
        __html: `
@import url(https://fonts.googleapis.com/css?family=Merriweather:300italic,300);

h1, h1 code, h2, h2 code, h3, h3 code, h4, h4 code {
  color: #333;
}

html {
  font-size: 16px;
  max-width: 700px;
  margin: auto;
}

body {
  color: #444;
  font-family: 'Merriweather', Georgia, serif;
  max-width: 700px;
  margin: auto;
}

/* === A bit of a gross hack so we can have bleeding divs/blockquotes. */

div {
  width: 100%;
}

div img {
  width: 100%;
}

blockquote p {
  font-size: 1.5rem;
  font-style: italic;
  margin: 1rem auto 1rem;
  max-width: 48rem;
}

li {
  margin-left: 2rem;
}

/* Counteract the specificity of the gross *:not() chain. */
h1 {
  padding: 1m 0 !important;
}
/*  === End gross hack */

p {
  color: #555;
  height: auto;
  line-height: 1.45;
}

pre, code {
  font-family: Menlo, Monaco, "Courier New", monospace;
  color: #42b983;
}

pre, pre code {
  color: #000;
}

pre {
  background-color: #fafafa;
  font-size: .8rem;
  overflow-x: scroll;
  padding: 1.125em;
}

a, a pre, a code,
a:visited {
  color: #3498db;
}

a:hover,
a:focus,
a:active {
  color: #2980b9;
}
        `,
      },
    })
  );
};

export default ShowDocs;
