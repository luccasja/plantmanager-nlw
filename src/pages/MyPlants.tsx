import React, { useEffect, useState } from 'react';
import { 
    Image, 
    StyleSheet, 
    View,
    Text, 
    FlatList,
    Alert
} from 'react-native';
import { Header } from '../components/Header';
import { PlantProps, loadPlant, removePlant } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { pt } from 'date-fns/locale';
import { Load } from '../components/Load';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import waterDropImg from '../assets/waterdrop.png';

export function MyPlants(){
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWaterd, setNextWaterd] = useState<string>();

    function handleRemove(plant: PlantProps){
        Alert.alert('Remover',`Deseja remover a planta ${plant.name}?`,[
            {
                text: 'Não 🙏🏼',
                style: 'cancel'
            },
            {
                text: 'Sim 😢',
                onPress: async () => {
                    try {
                        await removePlant(plant.id);
                        setMyPlants((oldData) => 
                            oldData.filter((item)=> item.id !== plant.id)
                        );
                    } catch (error) {
                        Alert.alert('Não foi possivel remover! 😢');
                    }
                }
            }
        ])
    }

    useEffect(()=>{
        async function loadStoreData(){
            const plantsStoraged = await loadPlant();

            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                {locale: pt}
            );

            setNextWaterd(
                `Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime}.`
            );

            setMyPlants(plantsStoraged);
            setLoading(false);
        }

        loadStoreData();
    },[]);

    useEffect(()=>{

    },[]);

    if(loading)
        return <Load/>;

    return (
        <View style={style.container}>
            <Header/>

            <View style={style.spotlight}>
                <Image
                    source={waterDropImg}
                    style={style.spotlightImage}
                />
                <Text style={style.spotlightText}>
                    {nextWaterd}
                </Text>
            </View>

            <View style={style.plants}>
                <Text style={style.plantsTitle}>
                    Proximas regadas
                </Text>
                <FlatList
                    data={myPlants}
                    keyExtractor={(item)=> String(item.id)}
                    renderItem={({ item })=>(
                        <PlantCardSecondary 
                            data={item}
                            handleRemove={()=> {handleRemove(item)}}
                        />
                    )}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ flex: 1}}
                />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    spotlight:{
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    spotlightImage:{
        width: 60,
        height: 60,
    },
    spotlightText:{
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
    },
    plants:{
        flex: 1,
        width: '100%'
    },
    plantsTitle:{
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    }
})