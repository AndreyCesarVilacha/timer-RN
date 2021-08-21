import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { LogBox, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { disableExpoCliLogging } from 'expo/build/logs/Logs';
//expo install @react-native-picker/picker
import {Picker} from '@react-native-picker/picker';
//expo install expo-linear-gradient
import { LinearGradient } from 'expo-linear-gradient';
//Componentes personalizados
import Contador from './components/Contador';

export default function App() {

  LogBox.ignoreAllLogs(disableExpoCliLogging);
  const [estado, setEstado] = useState('selecionar');
  const [segundos, setSegundos] = useState(0);
  const [minutos, setMinutos] = useState(1);

  const [alarmeSound, setAlarmeSound] = useState([
    {
      id:1,
      selecionado: true,
      som: 'alarme 1',
      file: 'alarm1.mp3',
    },
    {
      id:2,
      selecionado: false,
      som: 'alarme 2',
      file: 'alarm2.mp3',
    },
    {
      id:3,
      selecionado: false,
      som: 'alarme 3',
      file: 'alarm3.mp3',
    },
  ]);

  const [selectedLanguage, setSelectedLanguage] = useState();

  var numeros = [];
  for(var i = 1; i <= 60; i++){
    numeros.push(i);
  }

  function setarAlarmeSound(id){
    let alarmesTemp = alarmeSound.map(function(val){
      if(id != val.id){
        val.selecionado = false;
      } else{
        val.selecionado = true;
      }
      return val;
    });
    setAlarmeSound(alarmesTemp);
  }

  if(estado =='selecionar'){
  return (    
    <View style={styles.container}>
      <StatusBar style="auto" />
      <LinearGradient
        //Gradiente de fundo
        colors={['rgba(50,50,50,0.7)', 'rgba(0,0,0,0.9)']}
        style={{
          position: 'absolute',
          left:0,
          right: 0,
          top: 0,
          height: '100%',
        }}/>
      {/*Área de selecionar o tempo */} 
      <Text style={styles.textoSelcione}>Selecione o seu Tempo: </Text>
      <View style={styles.timeContainer}>
        <Text style={{color:'white', paddingTop:16}}>Min:</Text>
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
        <Text style={{color:'white', paddingTop:16}}>Seg:</Text>
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

      {/*Área de escolher alarme */}  
      <View style={{flexDirection:'row', flexWrap:'wrap'}}>
        {
          alarmeSound.map(function(val){
            if(val.selecionado){
              return(
                <TouchableOpacity 
                  style={styles.btnSelecionado}
                  onPress={() => setarAlarmeSound(val.id)} >
                  <Text style={{color: 'white', fontWeight: 'bold'}}>{val.som}</Text>
                </TouchableOpacity>
              );
            } else {
              return(
                <TouchableOpacity onPress={() => setarAlarmeSound(val.id)} style={styles.btnEscolher} >
                  <Text style={{color: 'white', fontWeight: 'bold'}}>{val.som}</Text>
                </TouchableOpacity>
              );
            }
          })
        }
      </View>

      <TouchableOpacity onPress={()=>setEstado('iniciar')} style={styles.btnIniciar}>
        <Text style={{textAlign:'center', marginTop: '40%', fontWeight:'bold', color:'white'}}>Iniciar</Text>
      </TouchableOpacity>

    </View>
  );
  } else if(estado == 'iniciar'){

    return(
      <Contador setarEstado={setEstado} minutos={minutos}  segundos={segundos}/>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'rgb(85,55,175)',
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
  },
  btnEscolher:{
    margin: 6,
    paddingVertical: 15,
    paddingHorizontal: 65,
    backgroundColor: 'rgb(80,80,80)',
    borderRadius: 30,
  },
  btnSelecionado:{
    margin: 6,
    paddingVertical: 15,
    paddingHorizontal: 65,
    backgroundColor: 'rgba(80,80,80,0.25)',
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 1.5,
  },
  btnIniciar: {
    backgroundColor: 'rgb(80,80,80)',
    width:100,
    height:100,
    borderRadius: 50,
    marginTop: 40,
    borderColor: 'white',
    borderWidth: 2,
  }
});
