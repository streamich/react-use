import {useCallback} from 'react';

type UseMonetization = {
  state: 'stopped' | 'pending' | 'started';
  setWallet: (walletAddress: string) => void;
  removeWallet: () => void;
}

export function useMonetization(): UseMonetization {

  const setWallet = useCallback((newWallet) => {
    const tag: (Element & { content: string; name: string }) | null = document.querySelector('meta[name="monetization"]');
    if (!!tag) {
      tag.content = newWallet
    } else {
      const newTag = document.createElement('meta');
      newTag.name = 'monetization';
      newTag.content = newWallet;
      document.head.appendChild(newTag);
    }
  }, [])

  const removeWallet = useCallback(() => {
    const tag: (Element & { content: string; name: string }) | null = document.querySelector('meta[name="monetization"]');
    if(!!tag) {
      tag.remove()
    }
  }, []);
  return {
    state: document['monetization'] ? document['monetization'].state : 'Not enabled in browser',
    setWallet,
    removeWallet,
  };
}

