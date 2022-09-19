import {useState} from 'react'
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {Input, Icon, Button, Image } from "@rneui/themed";
import { Formik } from 'formik';
import * as Yup from 'yup';
import DatePicker from './DatePicker';

const RegisterCCForm = () => {
    const [schedule, setSchedule] = useState(
        {
            Lunes:"",
            Martes:"",
            Miércoles:"",
            Jueves:"",
            Viernes:"",
            Sabado:"",
            Domingo:""
        });

    const registerSchema = Yup.object().shape({
        name:Yup.
            string().
            required("Nombre Requerido"),
        email:Yup.
            string().
            email("Email no valido").
            required("Email requerido"),
        direction:Yup.
            string().
            required("Direccion Requeida"),
        longitude:Yup.
            string().
            required("Coordenadas Requeridas").
            matches(/^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})?$/, "Coordenada no Válida"),
        latitude:Yup.
            string().
            required("Coordenadas Requeridas").
            matches(/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/, "Coordenada no Válida")
    })


  return (
    <ScrollView contentContainerStyle={styles.screen}>
        <Formik
            initialValues={{
                name:"",
                email:"",
                direction:"",
                longitude:"",
                latitude:""
            }}
            onSubmit={(values, {resetForm}) => {
                console.log(values)
            }}
            validationSchema={registerSchema}
        >
            {({errors, touched, handleChange, handleSubmit, values}) => {
                return(
                    <View style={styles.form}>
                        <Input
                            placeholder="Nombre"
                            leftIcon={<Icon type="feather" name="user"/>}
                            onChangeText={handleChange("name")}
                            errorMessage={errors.name && touched.name ? errors.name : ""}
                            value={values.name}
                        />
                        <Input
                            placeholder="Email"
                            leftIcon={<Icon type="material" name="mail"/>}
                            onChangeText={handleChange("email")}
                            errorMessage={errors.email && touched.email ? errors.email : ""}
                            value={values.email}
                        />

                        <View style={{width:"100%", height:"40%"}}>
                            <Text style={styles.text}>Horario de Atención</Text>
                            <ScrollView style={styles.ScrollView}>
                                <DatePicker day="Lunes" setSchedule={setSchedule} schedule={schedule}/>
                                <DatePicker day="Martes" setSchedule={setSchedule} schedule={schedule}/>
                                <DatePicker day="Miércoles" setSchedule={setSchedule} schedule={schedule}/>
                                <DatePicker day="Jueves" setSchedule={setSchedule} schedule={schedule}/>
                                <DatePicker day="Viernes" setSchedule={setSchedule} schedule={schedule}/>
                                <DatePicker day="Sabado" setSchedule={setSchedule} schedule={schedule}/>
                                <DatePicker day="Domingo" setSchedule={setSchedule} schedule={schedule}/>
                            </ScrollView>
                        </View>

                        <Text style={styles.text}>Dirección</Text>
                        <Input
                            placeholder="Longitud"
                            leftIcon={<Icon type="material" name="mail"/>}
                            onChangeText={handleChange("longitude")}
                            errorMessage={errors.longitude && touched.longitude ? errors.longitude : ""}
                            value={values.longitude}
                        />
                        <Input
                            placeholder="Latitiud"
                            leftIcon={<Icon type="material" name="mail"/>}
                            onChangeText={handleChange("latitude")}
                            errorMessage={errors.latitude && touched.latitude ? errors.latitude : ""}
                            value={values.latitude}
                        />
                        <Button
                            onPress={handleSubmit}
                            title="Registrarse"
                            buttonStyle={{
                                width:"80%",
                                height:"20%",
                                borderRadius: 5,
                                backgroundColor:"white",
                                marginBottom: "20%",
                                padding: "1%",
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 3
                                },
                                shadowOpacity: 0.27,
                                shadowRadius: 4.65,
                                elevation: 6
                            }}
                            titleStyle={{
                                color:"black",
                                width:"80%",
                                height:"100%",
                                fontSize:20
                            }}
                            icon={<Icon name="arrow-forward-ios" type="material"/>}
                            iconRight={true}
                        />
                    </View>
                )
            }}
        </Formik>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        alignItems:"center",
        width: "100%",
        height: "100%"
    },
    ScrollView:{
        width:"100%",
        height:"100%"
    },
    text:{
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        marginBottom:"5%"
    },
    form:{
        width:"100%",
        height:"100%",
        flex:1,
        justifyContent:"flex-start",
        alignItems:"center"
    }
})

export default RegisterCCForm