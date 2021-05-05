import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification(){
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();
    const navigation = useNavigation();

    async function handleSubmit(){
        if(!name){
            return Alert.alert('Me diz como chamar você 😢');
        }
        try{
            await AsyncStorage.setItem('@plantmanager:user', name);
            navigation.navigate('Confirmation',{
                title: 'Prontinho',
                subTitle: 'Agora vamos começar a cuidar das suas \n plantinhas com muito cuidado.',
                buttonTitle: 'Começar',
                icon: 'smile',
                nextScreen: 'PlantSelect'
            });
        } catch {
            Alert.alert('Não foi possivel salvar o seu nome. 😢');
        }
    }

    function handleInputBlur(){
        setIsFocused(false);
        setIsFilled(!!name)
    }

    function handleInputFocus(){
        setIsFocused(true);
    }

    function handleInputChange(value: string){
        setIsFilled(!!value)
        setName(value)
    }

    return(
        <SafeAreaView style={style.container}>
            <KeyboardAvoidingView 
                style={style.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={style.content}>
                        <View style={style.form}>
                            <View style={style.header}>
                                <Text style={style.emoji}>
                                    { isFilled ? '😎': '😄'}
                                </Text>
                                <Text style={style.title}>
                                    Como podemos {'\n'} 
                                    chamar você?
                                </Text>
                                <TextInput
                                    style={[
                                        style.input,
                                        (isFocused || isFilled) && {borderColor: colors.green}
                                    ]}
                                    placeholder="Digite um nome"
                                    onBlur={handleInputBlur}
                                    onFocus={handleInputFocus}
                                    onChangeText={handleInputChange}
                                />
                                <View style={style.footer}>
                                    <Button 
                                        title="Confirmar"
                                        onPress={handleSubmit} 
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
};

const style = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    content:{
        flex:1,
        width:'100%',
    },
    form:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal: 54,
        alignItems:'center',
    },
    header:{
        alignItems:'center',
        width:'100%'
    },
    title:{
        fontSize: 20,
        textAlign:'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20
    },
    emoji:{
        fontSize:44
    },
    input:{
        borderBottomWidth:1,
        borderColor: colors.gray,
        color: colors.heading,
        width:'100%',
        fontSize: 17,
        lineHeight: 32,
        marginTop: 50,
        padding: 10,
        textAlign: 'center',
        fontFamily: fonts.text
    },
    footer:{
        marginTop: 40,
        width:'100%',
        paddingHorizontal: 20
    }
});