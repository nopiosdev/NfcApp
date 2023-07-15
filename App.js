import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import ScanPopup from './Components/ScanPopup';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
export default function App() {
  const [scan, setScan] = useState(false);
  const [data, setData] = useState('');

  return (
    <>
      <View style={styles.wrapper}>
        <StatusBar />
        <TouchableOpacity onPress={() => setScan(true)}>
          <Text style={{ marginBottom: 10 }}>Start Scan</Text>
          {data ?
              <Text style={styles.key}>{data}</Text>
            : null
          }
        </TouchableOpacity>
      </View>
      <ScanPopup
        open={scan}
        setData={setData}
        handleClose={() => setScan(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  key: {
    fontWeight: 'bold',
    marginTop: 1
  },
  value: {
    fontWeight: 400,
  }
});
