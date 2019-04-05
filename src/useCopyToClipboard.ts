import {useState, useEffect} from 'react';
import * as clipboard from "clipboard-polyfill"

const copyDefault = (text) => {
  console.log('run');
  const element = document.createElement('textarea'); // create textarea HTML element
  element.value = text;                               // add the text to be copied to the element
  document.body.appendChild(element);                 // add element to DOM
  element.select();                                   // select the text
  document.execCommand('copy');                       // execute copy command
  document.body.removeChild(element);                 // remove element from DOM
};


const useCopyToClipboard = (timeout = undefined, copy = copyDefault) => {

  const [success, setSuccess] = useState(false);

  const copyToClipboard = (text) => {

    if (typeof text == "string" || typeof text == "number" ) {
      copy(text);
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
