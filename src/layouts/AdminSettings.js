import React, {useState} from "react"
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native'
import FBConnection from "../contexts/FBConnection";
import {collection, updateDoc, doc, addDoc} from "firebase/firestore";

const AdminSettings = ({navigation}) => {
    const [editView, setEditView] = useState(false);
    const [info, setInfo] = useState({
        name :"Oscar",
        email :"oscar@gmail.com",
        lastName :"Valdés"
    });

    const id = "Wei8t7Ee8FR2YdQsNqF6n95mrCv1";

    /* const nav2Cart = () => {
        navigation.navigate("Cart");
    } */

    const handleSave = async () => {
        alert("name: " + info.name + ", lastName: " + info.lastName);
        await updateDoc(doc(FBConnection.db, "BAMXmanager"), info);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Tu información</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.fieldBox}>
                    <Text style={styles.fieldLabel}>Nombre</Text>
                    <View style={[styles.fieldValueBox, editView && {backgroundColor: "rgb(220, 220, 220)"}]}>
                        {editView ?
                            <TextInput style={styles.fieldValue} value={info.name} onChangeText={(text) => setInfo(prev => ({...prev, name: text}))}></TextInput> :
                            <Text style={styles.fieldValue}>{info.name}</Text>
                        }
                    </View>
                </View>
                <View style={styles.fieldBox}>
                    <Text style={styles.fieldLabel}>Apellido</Text>
                    <View style={[styles.fieldValueBox, editView && {backgroundColor: "rgb(220, 220, 220)"}]}>
                        {editView ?
                            <TextInput style={styles.fieldValue} value={info.lastName} onChangeText={(text) => setInfo(prev => ({...prev, lastName: text}))}></TextInput> :
                            <Text style={styles.fieldValue}>{info.lastName}</Text>
                        }
                    </View>
                </View>
                <View style={styles.fieldBox}>
                    <Text style={styles.fieldLabel}>Correo</Text>
                    <View style={[styles.fieldValueBox, editView && {backgroundColor: "rgb(220, 220, 220)"}]}>
                        {editView ?
                            <TextInput style={styles.fieldValue} value={info.email} onChangeText={(text) => setInfo(prev => ({...prev, email: text}))}></TextInput> :
                            <Text style={styles.fieldValue}>{info.email}</Text>
                        }
                    </View>
                </View>
            </View>
            <View style={styles.footer}>
                {editView ?
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity style={[styles.button, {backgroundColor: "rgb(96, 218, 104)"}]} onPress={() => handleSave()}>
                            <Text style={styles.buttonLabel}>Guardar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, {backgroundColor: "rgb(255, 93, 93)"}]} onPress={() => setEditView(false)}>
                            <Text style={styles.buttonLabel}>Cancelar</Text>
                        </TouchableOpacity>
                    </View> :
                    <TouchableOpacity style={[styles.button, {backgroundColor: "rgb(19, 99, 223)"}]} onPress={() => setEditView(true)}>
                        <Text style={styles.buttonLabel}>Editar</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { // Whole layout
        flex: 1
    },
    header: { // Header section with back button, title and filter
        height: "6%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(251, 249, 250)"
    },
    title: { // Title text
        textAlign: "center",
        fontSize: 20,
        fontWeight: "700",
        color: "rgb(224, 31, 81)"
    },
    body: {
        width: "100%",
        flex: 1
    },
    fieldBox: {
        width: "100%",
        marginTop: 10
    },
    fieldLabel: {
        width: "100%",
        fontSize: 16,
        fontWeight: "500",
        marginLeft: 20,
        marginBottom: 3
    },
    fieldValueBox: {
        marginHorizontal: 10,
        backgroundColor: "rgb(200, 200, 200)",
        paddingLeft: 10,
        borderRadius: 15,
        height: 25,
        justifyContent: "center"
    },
    fieldValue: {
        width: "100%",
        fontSize: 16,
        fontWeight: "500",
        color: "rgb(97, 88, 88)",
    },
    footer: {
        height: "10%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 10,
        backgroundColor: "rgb(251, 249, 250)"
    },
    buttonGroup: {
        flexDirection: "row"
    },
    button: { // Proceed button
        textAlign: "center",
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 10,
        marginHorizontal: 10,
        marginBottom: 6,
        borderColor: "rgb(220, 220, 220)",
        borderWidth: 2,
        backgroundColor: "oldlace"
    },
    buttonLabel: { // Button text label
        fontSize: 20,
        fontWeight: "bold",
        color: "rgb(255, 255, 255)",
    }
});

export default AdminSettings;