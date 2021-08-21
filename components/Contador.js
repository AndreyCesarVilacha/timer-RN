import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { StatusBar } from 'expo-status-bar';
//expo install expo-linear-gradient
import { LinearGradient } from 'expo-linear-gradient';
//expo install expo-av
import { Audio } from 'expo-av';

export default function Contador(props){

    var done = false;

    useEffect(()=>{
        const timer = setInterval(()=>{

            props.setarSegundos(props.segundos-1);

            if(props.segundos <= 0){
                if(props.minutos > 0){
                    props.setarMinutos(minutos-1);
                    props.setarSegundos(59);
                }else{
                    if(!done){
                        done = true;
                        props.setarEstado('selecionar');
                        props.setarMinutos(0);
                        props.setarSegundos(1);
                        playSound();
                    }
                }
            }

        }, 1000)

        return () => clearInterval(timer)
    });

    async function playSound(){
        const soundObject = new Audio.Sound();
        try{
            var alarme;
            props.alarmes.map(function(val){
                if(val.selecionado){
                    alarme = val.file;
                }
            });
            await soundObject.loadAsync(alarme);
            await soundObject.playAsync();

            //await soundObject.unloadAsync();
        } catch(error){

        }
    }

    function resetar(){
        props.setarEstado('leitura');
        props.setarMinutos(0);
        props.setarSegundos(1);
    }

    function formatarNumero(number){
        var finalNumber = "";
        if(number < 10){
            finalNumber = "0"+number;
        } else{
            finalNumber = number;
        }

        return finalNumber;
    }

    var segundos = formatarNumero(props.segundos);
    var minutos = formatarNumero(props.minutos);

    return(
        <View style={styles.container}>
            <StatusBar style="auto" />
            <LinearGradient 
                colors= {['rgba(50,50,50,0.7)', 'rgba(0,0,0,0.9)']}
                style={{
                    position: 'absolute',
                    left:0,
                    right: 0,
                    top: 0,
                    height: '100%',
                  }}/>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.textContado}>{minutos} : </Text>
                <Text style={styles.textContado}>{segundos}</Text>
            </View>

        <TouchableOpacity onPress={() => resetar()} style={styles.btnEncerrar}>
            <Text style={{textAlign:'center', marginTop: '40%', fontWeight:'bold', color:'white'}}>Resetar</Text>
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContado:{
        color: 'white',
        fontSize:40,
    },
    btnEncerrar:{
        backgroundColor: 'rgb(80,80,80)',
        width:100,
        height:100,
        borderRadius: 50,
        marginTop: 40,
        borderColor: 'white',
        borderWidth: 2,
    }
})