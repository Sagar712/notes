import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

if (localStorage.getItem('React-App-Script') != null) {
  /*
    Do nothing
  */
}
else {
  localStorage.setItem('React-App-Script', JSON.stringify({
    tasks: {},
    items: {},
    username: ''
  }));
}

if (localStorage.getItem('ScriptDarkMode') == null) {
  localStorage.setItem('ScriptDarkMode', 'OFF')
}
else {
  let dark = localStorage.getItem('ScriptDarkMode')
  if (dark == 'OFF') {
    document.documentElement.setAttribute("data-theme", "root");
  }
  else {
    document.documentElement.setAttribute("data-theme", "dark");
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA

serviceWorkerRegistration.register();
//serviceWorkerRegistration.unregister();


reportWebVitals();