import {useContext} from "react";
import {BAMXContext} from "../../contexts/BAMXContext";
import {View, StyleSheet, Dimensions} from 'react-native';
import {Indicator} from "nachos-ui";
import {Button, Icon} from "@rneui/themed"
import LottieView from 'lottie-react-native';

const BtnCCRequest = ({navigation}) => {
    const {docsNum} = useContext(BAMXContext);

    return(
        <View>
            {(docsNum !== null) ? (
                <Indicator
                    position='right top'
                    value={docsNum}
                    type="normal"
                >
                    <Button
                        title="Centros de Acopio Pendientes"
                        onPress={() => navigation.navigate("CCRequest")}
                        buttonStyle={styles.button}
                        titleStyle={styles.title}
                        icon={<Icon name="user-check" type="feather"/>}
                    />
                </Indicator>
            ) : (
                <LottieView
                    source={require("../../animations/97203-loader.json")}
                    autoPlay
                />
            )}
        </View>
    )
}

const screen = Dimensions.get("screen");

const styles = StyleSheet.create({
    button:{
        width: screen.width * .8,
        height: screen.height * .08,
        backgroundColor:"white",
        borderRadius: 10,
        elevation: 10,
        shadowColor: "#000"
    },
    title:{
        color:"black",
        fontSize:screen.fontScale * 15
    }
})

export default BtnCCRequest;