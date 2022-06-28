import React, { useState, useEffect, useCallback } from 'react';
import AppContainer from '../src/AppContainer';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';


export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = useCallback(async () => {
    try {
      await Font.loadAsync({
       // RedHatDisplay_400Regular: require('./assets/fonts/RedHatDisplay-Regular.ttf'),
        //RedHatDisplay_700Bold: require('./assets/fonts/RedHatDisplay-Bold.ttf')
      });
      setFontsLoaded(true);
    } catch(error) {
      console.error(error);
    }
  }, [])
  
  useEffect(() => {
    loadFonts();
  }, [loadFonts]);

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return <AppContainer />;
}
