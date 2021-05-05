import React, { useState } from 'react';
import { 
    Alert,
    Image,
    Platform, 
    ScrollView, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View 
} from 'react-native';
import DateTimerPicker, { Event } from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/core';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { PlantProps, savePlant } from '../libs/storage';
import { Button } from '../components/Button';
import { SvgFromUri } from 'react-native-svg';
import { format, isBefore } from 'date-fns';
import waterDropImg from '../assets/waterdrop.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params{
    plant: PlantProps
}

export function PlantSave(){
    const navigation = useNavigation();
    const [selectedDateTime, setSelectedDateTime] = useState(new Date);
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');

    const route = useRoute();
    const { plant } = route.params as Params;

    function handleChangeTime(event: Event, dateTime: Date | undefined){
        if(Platform.OS == 'android'){
            setShowDatePicker(oldState => !oldState);
        }

        if(dateTime && isBefore(dateTime, new Date())){
            setSelectedDateTime(new Date());
            return Alert.alert('Escolha uma hora no futuro! ⏰');
        }

        if(dateTime){
            setSelectedDateTime(dateTime);
        }
    }

    function handleOpenDatetimeForAndroid(){
        setShowDatePicker(oldState => !oldState);
    }

    async function handleSave(){
        try{
            await savePlant({
                ... plant,
                dateTimeNotification: selectedDateTime
            });

            navigation.navigate('Confirmation',{
                title: 'Tudo certo',
                subTitle: 'Fique tranquilo que sempre vamos \nlembrar você de cuidar da sua plantinha \ncom bastante amor.',
                buttonTitle: 'Muito obrigado :D',
                icon: 'hug',
                nextScreen: 'MyPlants'
            });
        } catch {
            Alert.alert('Não foi possivel salvar. 😢');
        }
    }

    return(
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={style.container}
        >
            <View style={style.container}>
                <View style={style.plantInfo}>
                    <SvgFromUri
                        uri={plant.photo}
                        height={150}
                        width={150}
                    />
                    <Text style={style.plantName}>
                        { plant.name }
                    </Text>
                    <Text style={style.plantAbout}>
                        { plant.about }
                    </Text>
                </View>

                <View style={style.controller}>
                    <View style={style.tipContainer}>
                        <Image 
                            source={waterDropImg}
                            style={style.tipImage}
                        />
                        <Text style={style.tipText}>
                            {plant.water_tips}
                        </Text>
                    </View>

                    <Text style={style.alertLabel}>
                        Escolha um melhor horário para ser lembrado:
                    </Text>
                    {showDatePicker && 
                    <DateTimerPicker
                        value={selectedDateTime}
                        mode="time"
                        display="spinner"
                        onChange={handleChangeTime}
                    />}
                    {
                        Platform.OS == 'android' && (
                            <TouchableOpacity 
                                style={style.dateTimePicketButton}
                                onPress={handleOpenDatetimeForAndroid}
                            >
                                <Text style={style.dateTimePicketText}>
                                    {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                                </Text>
                            </TouchableOpacity>
                        ) 
                    }
                    <Button
                        title="Cadastrar planta"
                        onPress={handleSave}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape,
    },
    plantInfo:{
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape,
    },
    controller:{
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20,
    },
    plantName:{
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15,
    },
    plantAbout:{
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10
    },
    tipContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60
    },
    tipImage:{
        width: 56,
        height: 56
    },
    tipText:{
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17, 
        textAlign: 'justify'
    },
    alertLabel:{
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5
    },
    dateTimePicketButton:{
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,
    },
    dateTimePicketText:{
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    }
})