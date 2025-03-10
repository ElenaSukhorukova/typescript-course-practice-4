import { useState } from 'react';
import { get } from "./util/http";

function App() {
  useState();
  get('https://jsonplaceholder.typicode.com/posts');

  return <h1>Data Fetching!</h1>;
}

export default App;
