import React, { useEffect, useState } from 'react';
import Signin from './src/pages/Signin/Signin';
import Routes from './src/Routes/Routes';
import Storage from './src/utils/storage.utils';

const App= () => {
  const [login, setLogin] = useState(false)
  useEffect(() => {
    if(Storage.get("login")){
        setLogin(true)
    }
  }, [])
  return (
   <Routes login={login}/>
  );
};

export default App;
