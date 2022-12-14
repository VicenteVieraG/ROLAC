import {View, StyleSheet} from 'react-native'
import BtnCCRequest from '../components/BAMX/BtnCCRequest';
import BtnCCEditRequest from "../components/BAMX/BtnCCEditRequest";
import BtnDeleteCC from '../components/BAMX/BtnDeleteCC';

const BAMXmenu = ({navigation}) => {
    return (
        <View style={styles.screen}>
            <BtnCCRequest navigation={navigation}/>
            <BtnCCEditRequest navigation={navigation}/>
            <BtnDeleteCC navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        width:"100%",
        height:"100%",
        flex:1,
        justifyContent: "space-evenly",
        alignItems: "center"
    }
})

export default BAMXmenu