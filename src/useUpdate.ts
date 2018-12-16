import {useState} from 'react';

const useUpdate = () => useState(0)[1] as (() => void);

export default useUpdate;
