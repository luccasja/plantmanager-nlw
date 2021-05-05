import React, { useEffect, useState } from 'react';
import { 
    Image, 
    StyleSheet, 
    Text, 
    View 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import userImg from '../assets/lucas.jpeg';
import fonts from '../styles/fonts';
import colors from '../styles/colors';

export function Header(){
    const [userName, setUserName] = useState<string>();
    
    useEffect(()=>{
        async function loadStorageUserName(){
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setUserName(user || '');
        }

        loadStorageUserName();
    },[userName])

    return(
        <View style={style.container}>
            <View>
                <Text style={style.greeting}>Olá,</Text>
                <Text style={style.userName}>
                    {userName}
                </Text>
            </View>
            <Image source={userImg} style={style.image}/>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
    },
    image:{
        width:70,
        height:70,
        borderRadius:35
    },
    greeting:{
        fontSize:32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName:{
        fontSize:32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    }
})