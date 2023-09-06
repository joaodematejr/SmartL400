import React from 'react';
import {
  Alert,
  Image,
  NativeModules,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import imgBase64 from './base64';

function App(): JSX.Element {
  const {Positivo} = NativeModules;

  function showMsg() {
    Positivo.show('Classe Java' as String);
  }

  function handlePrint() {
    Positivo.printImg(imgBase64 as String)
      .then((response: any) => {
        Alert.alert('Print', response);
      })
      .catch((error: any) => {
        Alert.alert('Error', JSON.stringify(error));
      });
  }

  function handleGetFirmwareVersion() {
    Positivo.getFirmwareVersion()
      .then((response: any) => {
        Alert.alert('Versão do Firmware', response);
      })
      .catch((error: any) => {
        Alert.alert('Error', JSON.stringify(error));
      });
  }

  function handlePrintText() {
    Positivo.printText()
      .then((response: any) => {
        Alert.alert('Print Text', response);
      })
      .catch((error: any) => {
        Alert.alert('Error', JSON.stringify(error));
      });
  }

  function handleCheckPrint() {
    Positivo.checkPrint()
      .then((response: any) => {
        if (response) {
          Alert.alert('Check Print', 'Retorno True');
        } else {
          Alert.alert('Check Print', 'Retorno False');
        }
      })
      .catch((error: any) => {
        Alert.alert('Error', JSON.stringify(error));
      });
  }

  function handleCheckPaper() {
    Positivo.checkPaper()
      .then((response: any) => {
        if (response) {
          Alert.alert('Check Paper', 'Retorno True');
        } else {
          Alert.alert('Check Paper', 'Retorno False');
        }
      })
      .catch((error: any) => {
        Alert.alert('Error', JSON.stringify(error));
      });
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => showMsg()}>
          <Text>Testar Comunicação com Nativo</Text>
        </TouchableOpacity>

        <Image
          style={styles.img}
          source={{
            uri: `data:image/jpg;base64,${imgBase64}`,
          }}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => handlePrintText()}>
        <Text>Print Texto</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handlePrint()}>
        <Text>Imprimir Imagem</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleGetFirmwareVersion()}>
        <Text>GetFirmwareVersion</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleCheckPrint()}>
        <Text>Check Print</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleCheckPaper()}>
        <Text>Check Papel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 15,
  },
  buttonRed: {
    alignItems: 'center',
    backgroundColor: '#F44336',
    padding: 15,
  },
  buttonGreen: {
    alignItems: 'center',
    backgroundColor: '#00E676',
    padding: 15,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  img: {
    width: 500,
    height: 500,
    resizeMode: 'contain',
  },
});

export default App;
