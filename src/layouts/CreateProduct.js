import React from 'react';
import { View, Text} from 'react-native';
import { StyleSheet} from 'react-native';
import CreateProductForm from '../components/CreateProductForm';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const CreateProduct = ({navigation}) => {
    return (
        <View style = {styles.screen}>
            <View style = {styles.banner}>
                <Text style = {styles.title}>Producto</Text>
            </View>
            <View>
                <KeyboardAwareScrollView
                enableOnAndroid={true}
                extraHeight={0.01}
                enableAutomaticScroll = {true}>
                    <CreateProductForm navigation={navigation}/>
                </KeyboardAwareScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        justifyContent: "flex-start",
        width: "100%",
        height: "100%"
    },
    title:{
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    banner:{
        backgroundColor: "white",
        width: "100%",
        height: 40,
        justifyContent: "center"
    }
});

export default CreateProduct