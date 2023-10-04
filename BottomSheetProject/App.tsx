import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useRef} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import BottomSheet, {BottomSheetMethods} from './src/components/BottomSheet';

type Props = {};

const App = (props: Props) => {
  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  const pressHandler = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);
  // no longer needed
  /* const closeHandler = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []); */
  // Now let's handle if there's children
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaView style={styles.container}>
          <Button title="Blank" onPress={pressHandler} />
          {/* <Button title="Close" onPress={closeHandler} /> */}
          <BottomSheet
            ref={bottomSheetRef}
            backgroundColor="white"
            snapTo="60%"
          />
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
