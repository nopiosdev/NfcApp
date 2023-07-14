import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
// import NfcManager, { NfcTech } from 'react-native-nfc-manager';
export default function App() {
  const readNdef = async () => {
    // NfcManager.start();
    // try {
    //   // register for the NFC tag with NDEF in it
    //   await NfcManager.requestTechnology(NfcTech.Ndef);
    //   // the resolved tag object will contain `ndefMessage` property
    //   const tag = await NfcManager.getTag();
    //   console.warn('Tag found', tag);
    // } catch (ex) {
    //   console.warn('Oops!', ex);
    // } finally {
    //   // stop the nfc scanning
    //   NfcManager.cancelTechnologyRequest();
    // }
  }
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={readNdef}>
        <Text>Scan a Tag</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
