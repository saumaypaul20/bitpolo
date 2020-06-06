import React, { useEffect, useState } from 'react';
import Signin from './src/pages/Signin/Signin';
import Routes from './src/Routes/Routes';
import Storage from './src/utils/storage.utils';

const App= () => {
  const [login, setLogin] = useState(null)

  useEffect(() => {
    let user =Storage.get("login")
     
    if(user){
        setLogin(true)
    }else{
      setLogin(false)
    }
  }, [])

  return (
    login !== null ? <Routes login={login}/> : null
  );

};

export default App;
