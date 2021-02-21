# snoken

The name "snoken" is Swedish for "the snake", or specifically one type of snake that is common in Sweden.

This package is a take on the classic snake game from back in the early days of mobile game development.

![alt text](https://github.com/dannemanne/snoken/blob/main/preview.png?raw=true)

## Local Development

Make sure you have npx installed locally, then create a new dummy react app (not in Snoken project folder).

```bash
npx create-react-app snoken-dummy

cd snoken-dummy

npm link /path/to/snoken

cd /path/to/snoken

npm link /path/to/snoken-dummy/node_modules/react
```

The above will create a new React app that you can use to test package components during development. The last step with linking to the react package will prevent more than one instance of React and ReactDOM to be used, which would cause issues with hooks.

Once that is done, simply go to the new snoken-dummy folder and open the file src/App.js and import the Snoken component and add it to the App body.

```js
import './App.css';

import Snoken from "snoken";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Snoken />
      </header>
    </div>
  );
}

export default App;
```