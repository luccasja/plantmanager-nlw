import React from 'react';
import { 
    StyleSheet,
    Text,
    View 
} from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnviromentButtonProps extends RectButtonProps {
    title: string;
    active?: boolean;
} 

export function EnviromentButton({
    title,
    active = false,
    ... rest
} : EnviromentButtonProps){
    return(
        <RectButton
            style={[
                style.container,
                active && style.containerActive
            ]}
            {... rest}
        >
            <Text style={[
                style.text,
                active && style.textActive
            ]}>
                { title }
            </Text>
        </RectButton>
    )
}

const style = StyleSheet.create({
    container:{
        backgroundColor: colors.shape,
        height: 40,
        width: 76,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginHorizontal:5 
    },
    containerActive:{
        backgroundColor: colors.green_light
    },
    text:{
        color: colors.heading,
        fontFamily: fonts.text
    },
    textActive:{
        color: colors.green_dark,
        fontFamily: fonts.heading,
    }
})