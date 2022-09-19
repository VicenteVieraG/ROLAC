import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import { Dialog } from "@rneui/themed";
import { Formik } from "formik";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateEmail,
  sendPasswordResetEmail,
} from "firebase/auth";
import firebaseConection from "../../contexts/FBConnection";
import { UserInformation } from "../../contexts/userInformation";

const ManagerDonorComponent = ({ navigation }) => {
  //Initialize auth instance
  const auth = getAuth();

  //Contexts
  const { userInformation, setUserInformation } = useContext(UserInformation);

  //useState
  const [donor, setDonor] = useState(null);
  const [userValidation, setUserValidation] = useState({
    email: "",
    password: "",
  });
  const [showDialog, setShowDialog] = useState({ state: false });

  //Functions
  const handleChangeText = (name, value) => {
    setUserValidation({ ...userValidation, [name]: value });
  };

  const displayDialog = () => {
    setShowDialog({ state: true });
  };

  const hideDialog = () => {
    setShowDialog({ state: false });
  };

  const getManagerById = async (id) => {
    await getDoc(doc(firebaseConection.db, "donor", id))
    .then((querySnapshot) => {
      const { lastName, name } = querySnapshot.data();
  
      setDonor({
        uid: querySnapshot.id,
        email: userInformation.auth.currentUser.email,
        lastName,
        name,
      });
    })
    .catch(() => {
      alert("Ha habido un error, intente de nuevo mas tarde");
      navigation.navigate("HomePageDonor", { navigation: navigation });
    });
  };

  const updateDonor = async (value) => {
    const { email, uid, lastName, name } = value;

    if(email != donor.email){
      updateEmail(userInformation.auth.currentUser, email).catch(() => {
        alert("Ha habido un error a la hora de actualizar el usuario");
        navigation.navigate("HomePageDonor", { navigation: navigation });
      });
    }

    if(name != donor.name || lastName != donor.lastName){
      await updateDoc(doc(firebaseConection.db, "donor", uid), {
        name: name,
        lastName: lastName,
      })
      .then(() => {
          setUserInformation({
            ...userInformation,
            name: name,
            lastName: lastName,
          });
        })
        .catch(() => {
          alert("Ha habido un error a la hora de actualizar el usuario");
          navigation.navigate("HomePageDonor", { navigation: navigation });
        });
    } 
    
    alert("Se ha actualizado la información");
    navigation.navigate("HomePageDonor", { navigation: navigation });
  };

  const removeManager = async () => {
    hideDialog();
    const { email, password } = userValidation;

    const credential = await EmailAuthProvider.credential(email, password);

    reauthenticateWithCredential(auth.currentUser, credential)
      .then((userCredential) => {
        userCredential.user.delete().then(() => {
          deleteDoc(
            doc(firebaseConection.db, "donor", userInformation.uid)
          ).then(() => {
            alert("Usuario borrado exitosamente");
            navigation.navigate("Login");
          });
        });
      })
      .catch((error) => {
        alert(
          "Ha ocurrido un error durante el proceso de eliminación del usuario"
        );
      });
  };

  const sendEmailRecoverPassword = () => {
    //Por alguna razón no funciona con el correo institucional "@tec"
    sendPasswordResetEmail(
      userInformation.auth,
      userInformation.auth.currentUser.email
    )
      .then(() => {
        alert(
          `Se ha enviado un correo a ${userInformation.auth.currentUser.email} para actualizar tu contraseña, revisa tu bandeja de spam`
        );
        navigation.navigate("HomePageDonor", { navigation: navigation });
      })
      .catch(() => {
        alert("Ha ocurrido un error, intente de nuevo mas tarde")
        navigation.navigate("HomePageDonor", { navigation: navigation });
      });
  };

  //Hooks
  useEffect(() => {
    getManagerById(userInformation.uid);
  }, []);

  return (
    <>
      <Dialog isVisible={showDialog.state}>
        <Dialog.Title title="Autenticacion de usuario" />
        <View>
          <TextInput
            placeholder="Email actual"
            onChangeText={(value) => handleChangeText("email", value)}
          />
        </View>
        <View>
          <TextInput
            placeholder="Contraseña actual"
            onChangeText={(value) => handleChangeText("password", value)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Confirmar"
            onPress={() => removeManager()}
            color="#0E4DA4"
          />
          <Button
            title="Cancelar"
            onPress={() => hideDialog()}
            color="#E74C3C"
          />
        </View>
      </Dialog>
      {donor ? (
        <Formik
          initialValues={donor}
          onSubmit={(values) => updateDonor(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <ScrollView>
              <View style={styles.container}>
                <Text>Nombre(s) actuales</Text>
                <View style={styles.inputGroup}>
                  <TextInput
                    placeholder="Name"
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                  />
                </View>
                <Text>Apellidos actuales</Text>
                <View style={styles.inputGroup}>
                  <TextInput
                    placeholder="Last name"
                    onChangeText={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                    value={values.lastName}
                  />
                </View>
                <Text>Email actual</Text>
                <View style={styles.inputGroup}>
                  <TextInput
                    placeholder="Email"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    color="#0E4DA4"
                    onPress={handleSubmit}
                    title="Actualizar"
                  />
                  <Button
                    color="#E74C3C"
                    onPress={() => displayDialog()}
                    title="Eliminar cuenta"
                  />
                </View>
                <View>
                  <Button
                    color="#0E4DA4"
                    onPress={() => sendEmailRecoverPassword()}
                    title="Actualizar contraseña"
                  />
                </View>
              </View>
            </ScrollView>
          )}
        </Formik>
      ) : (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#9e9e9e"></ActivityIndicator>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  loader: {
    height: "100%",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  inputGroup: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 5,
    paddingTop: 3,
    marginTop: 5,
  },
  buttonContainer: {
    margin: 20,
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ManagerDonorComponent;
