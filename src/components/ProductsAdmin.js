import React, {useState, useEffect} from 'react';
import GetProducts from './GetProducts';
import { View, Text, TouchableOpacity, Image} from 'react-native';
import { StyleSheet} from 'react-native';
import { Card } from '@rneui/themed';
import { LogBox } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {Icon} from '@rneui/themed';

const ProductsAdmin = ({navigation}) => {

    const [products, setProducts] = useState([]);

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    useEffect(() => {
        GetProducts().then((products) => {
            setProducts(products);
        });
    }, []);

    return (
        <View style = {styles.screen}>
            <View style = {styles.products}>
                <ScrollView>
                    {products.map((product) => {
                        return (
                            <Card key = {product.id} style = {styles.card}>
                                <View style = {styles.cardContent}>
                                    <View style = {styles.cardImage}>
                                        <Image source = {{uri: product.imageURL}} style = {styles.image}/>
                                    </View>
                                    <View style = {styles.cardText}>
                                        <Text style = {styles.cardTitle}>{product.values.name}</Text>
                                    </View>
                                    <View style = {styles.cardButton}>
                                        <TouchableOpacity style = {styles.button2} onPress = {() => console.log("Pressed")}>
                                            <Icon name = "edit" size = {30} color = "black"/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style = {styles.button2} onPress = {() => console.log("Pressed")}>
                                            <Icon type='feather' name = "trash" size = {30} color = "black"/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Card>
                        )
                    })}
                </ScrollView>
            </View>
            <View style = {styles.box1}>
                <TouchableOpacity onPress={() => navigation.navigate("Create Product", {navigation:navigation})}
                style = {styles.button}>
                    <Text style = {styles.textButton}>Crear producto</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
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
    },
    card:{
        width: "90%",
        marginHorizontal: "5%",
        marginVertical: "2%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button:{
        width: "50%",
        height: 40,
        justifyContent: "center",
        backgroundColor: "black",
        borderRadius: 10,
    },
    products:{
        flex: 1,
        justifyContent: "flex-start",
        width: "100%",
    },
    textButton:{
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "white"
    },
    box1:{
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        height: 50,
    },
    cardContent:{
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    cardImage:{
        width: "5%",
        height: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    image:{
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    cardTitle:{
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "right",
    },
    cardButton:{
        width: "10%",
        height: 40,
        justifyContent: "center",
        alignItems: "right",
        flexDirection: "row",
    },
    button2:{
        width: "110%",
        height: 40,
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 10,
    },
    cardText:{
        width: "40%",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default ProductsAdmin;