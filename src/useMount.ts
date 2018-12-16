import {useEffect} from 'react';

const useMount = (mount) => useEffect(mount, []);

export default useMount;
