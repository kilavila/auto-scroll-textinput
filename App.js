// https://stackoverflow.com/questions/29310553/is-it-possible-to-keep-a-scrollview-scrolled-to-the-bottom
// https://reactnative.dev/docs/keyboardavoidingview
// https://stackoverflow.com/questions/46318606/ios-keyboard-covers-the-input-which-is-located-in-the-bottom-of-the-screen

// Make a ref for the scrollView
// Use onContentSizeChange to scroll to end
// KeyboardAvoidingView will push the page content above the keyboard

import React, { useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [myText, setMyText] = useState('');

  const scrollViewRef = useRef();

  return (
    <KeyboardAvoidingView style={styles.container}
                          behavior={Platform.OS === 'ios' ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

        <View style={{flex: 1}}>
          <SafeAreaView style={{flex: 1, width: '100%'}}>
            <ScrollView style={{flex: 1, padding: 20}}
                        ref={scrollViewRef}
                        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            >
              <TextInput style={styles.input}
                        placeholder='Lorem ipsum...'
                        placeholderTextColor='hsl(0, 0%, 75%)'
                        multiline={true}
                        onChangeText={(value) => setMyText(value)}
                        value={myText}
              />
            </ScrollView>
          </SafeAreaView>

          <StatusBar style="dark" />
        </View>

      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 2,
    borderColor: 'hsl(0, 0%, 75%)',
    borderRadius: 10,
    fontSize: 30
  }
});
