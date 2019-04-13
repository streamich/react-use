import * as React from 'react';

const NewTabStory = ({ children }) => {
  if (window.location === window.parent.location) {
    return children;
  }

  return (
    <p>
      This story should be{' '}
      <a href={window.location.href} target="_blank" title="Open in new tab">
        opened in a new tab
      </a>
      .
    </p>
  );
};

export default NewTabStory;
