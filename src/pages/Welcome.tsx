import React from 'react';
import {
    View, 
    Text, 
    Image, 
    TouchableOpacity, 
    StyleSheet, 
    SafeAreaView,
    Dimensions
} from 'react-native';
import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import {Feather} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

export function Welcome(){
    const navigation = useNavigation();

    function handleStart(){
        navigation.navigate('UserIdentification');
    }

    return(
        <SafeAreaView style={style.container}>
            <View style={style.wrapper}>
                <Text style={style.title}>
                    Gerencie {'\n'}
                    suas plantas de{'\n'} 
                    forma fácil
                </Text>
                <Image 
                    source={wateringImg} 
                    style={style.image}
                    resizeMode='contain'
                />
                <Text style={style.subtitle}>
                    Não esqueça mais de regar suas {'\n '}
                    plantas. Nós cuidamos de lembrar você sempre que precisar.
                </Text>
                <TouchableOpacity 
                    style={style.button} 
                    activeOpacity={0.7}
                    onPress={handleStart}
                >
                    <Feather 
                        name='chevron-right'
                        style={style.buttonIcon}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
    },
    wrapper:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-around',
        paddingHorizontal: 20
    },
    title:{
        fontFamily: fonts.heading,
        fontSize:28,
        fontWeight:'bold',
        textAlign:'center',
        color: colors.heading,
        marginTop:38,
        lineHeight:34
    },
    subtitle:{
        fontFamily: fonts.text,
        textAlign:'center',
        fontSize:18,
        paddingHorizontal: 20,
        color: colors.heading
    },
    button:{
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56
    },
    image:{
        height: Dimensions.get('window').width * 0.7
    },
    buttonIcon:{
        fontSize: 32,
        color: colors.white
    }
})