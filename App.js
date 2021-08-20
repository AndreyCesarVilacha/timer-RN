import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
//expo install @react-native-picker/picker
import {Picker} from '@react-native-picker/picker';

export default function App() {

  const [segundos, setSegundos] = useState(0);
  const [minutos, setMinutos] = useState(0);

  const [alarmeSound, setAlarmeSound] = useState([
    {
      selecionado: true,
      som: 'alarme 1',
      file: 'alarm1.mp3',
    },
    {
      selecionado: false,
      som: 'alarme 2',
      file: 'alarm2.mp3',
    },
  ]);

  const [selectedLanguage, setSelectedLanguage] = useState();

  var numeros = [];
  for(var i = 1; i <= 60; i++){
    numeros.push(i);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.textoSelcione}>Selecione o seu Tempo: </Text>
      <View style={styles.timeContainer}>
        <Text style={{color:'white'}}>Min:</Text>
        <Picker
          selectedValue={minutos}
          style={{height: 50, width: 100, color:'white'}}
          onValueChange={(itemValue, itemIndex) =>
          setMinutos(itemValue)
          }>
            {
              numeros.map((val)=>{
                return (<Picker.Item label={val.toString()} value={val.toString()} />)
              })
            }
        </Picker>
        <Text style={{color:'white'}}>Seg:</Text>
        <Picker
          selectedValue={segundos}
          style={{height: 50, width: 100, color:'white'}}
          onValueChange={(itemValue, itemIndex) =>
          setSegundos(itemValue)
          }>
            <Picker.Item label='0' value='0'/>
            {
              numeros.map((val)=>{
                return (<Picker.Item label={val.toString()} value={val.toString()} />)
              })
            }
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(85,55,175)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoSelcione: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  timeContainer: {
    flexDirection:"row",
  }
});
