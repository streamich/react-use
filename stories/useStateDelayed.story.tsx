import React, { useEffect, useState } from "react";
import { storiesOf } from "@storybook/react";
import ShowDocs from './util/ShowDocs';
import useStateDelayed from "../src/useStateDelayed";

const EXAMPLE_BRANCHES_LIST = [
  'main',
  'stage',
  'dev'
];

const Demo = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useStateDelayed(() => {
    // find default branch
    const commonBranch = branches.find(branch => branch === 'master' || branch === 'main');
    if (commonBranch) return commonBranch;
    return branches[0];
  }, !!branches.length, 'Loading...');

  useEffect(() => {
    const handle = setTimeout(() => {
      setBranches(EXAMPLE_BRANCHES_LIST)
    }, 1000);

    return () => {
      handle && clearTimeout(handle);
    }
  }, []);

  return (
    <div>
      <p>Selected branch: {selectedBranch}</p>
      <select onChange={e => setSelectedBranch(e.target.value)}>
        {branches.map(branch => <option key={branch} value={branch}>{branch}</option>)}
      </select>
    </div>
  )
}

storiesOf('State|useStateDelayed', module)
  .add('Docs', () => <ShowDocs md={require('../docs/useStateDelayed.md')} />)
  .add('Demo', () => <Demo />);