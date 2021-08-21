import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { StatusBar } from 'expo-status-bar';
//expo install expo-linear-gradient
import { LinearGradient } from 'expo-linear-gradient';

export default function Contador(props){
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
                <Text style={styles.textContado}>{props.minutos} : </Text>
                <Text style={styles.textContado}>{props.segundos}</Text>
            </View>

        <TouchableOpacity onPress={()=>props.setarEstado('selecionar')} style={styles.btnEncerrar}>
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