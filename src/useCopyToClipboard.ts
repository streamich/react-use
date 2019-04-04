import {useState, useEffect} from 'react';

const useCopyToClipboard = (timeout = null) => {

  const [success, setSuccess] = useState(false);

  const copyToClipboard = (text) => {

    if (typeof text == "string" || typeof text == "number" ) {
      const element = document.createElement('textarea');
      element.value = text;
      document.body.appendChild(element);
      element.select();
      document.execCommand('copy');
      document.body.removeChild(element);
      setSuccess(true);
    }

    else {
      setSuccess(false);
      console.error(`Cannot copy typeof ${typeof text} to clipboard, must be a valid string or number.`);
    }
  }

  useEffect( () => {
    // if timeout given, set success to false
    if (timeout) {
      if (success) setTimeout( () => setSuccess(false), timeout);
    }
  }, [success])

  return [success, copyToClipboard];
}

export default useCopyToClipboard;
