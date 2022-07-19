import { View, Text,Image ,StyleSheet} from 'react-native'
import React from 'react'

export default function profile(){
const myData=JSON.parse(localStorage.getItem('currentUser'));

    return (
    <View style={styles.Container}>
    <Image source={myData.image} style={styles.Image}/>
      <Text>{myData.name}</Text>
    </View>
  )
    };



 const styles = StyleSheet.create({
    Container:{
        flex:1,
        paddingHorizontal: 40,
        alignItems:'center',
        justifyContent: "center",
    },
    Image:{
        
        height:150,
        width:150

    },
    txt:{
        fontSize:'30',
        fontWeight:'bold'
    }
});