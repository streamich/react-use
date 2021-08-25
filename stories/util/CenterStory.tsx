import * as React from 'react';

export const CenterStory = ({ children }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: '400px',
      margin: '40px auto',
    }}>
    <div style={{ width: '100%' }}>{children}</div>
  </div>
);
