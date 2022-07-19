

import React, { useState } from "react";
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, ImageBackground } from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import firebase from "../database/firebase";
import { TEST_ID } from "react-native-gifted-chat";

export default function SignupScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState(null)
    const [phone, setPhone] = useState('')
    // const [showNext, setShowNext] = useState(false)
    const [loading, setLoading] = useState(false)

    if (loading) {
        return <ActivityIndicator size="large" color="blue" />
    }

    const userSignup = async () => {
        let apos = email.indexOf('@');
        let dotpos = email.lastIndexOf('.');
        setLoading(false);
        if (!email || !password || !image || !name || !phone) {
            alert('Please add all the fields');
            return
        } else if (apos < 1 || dotpos - apos < 2) {
            alert("Please enter a valid email id");
            return
        } else if (isNaN(phone)) {
            alert('Enter a valid phone number');
            return
        }
        // try {
        firebase.firestore().collection('users').doc(`{${Date.now()}`).set({
            name: name,
            email: email,
            password: password,
            uid: Date.now(),
            phone: phone,
            image: image,
            createdAt: firebase.firestore.Timestamp.now()
        }).then(Refresh());

        function Refresh() {
            setName('');
            setEmail('');
            setPhone('');
            setPassword('');
            setImage(null);
        }
        // setLoading(true);
        // } catch (err) {
        //     console.log(err)
        //     // Alert.alert("There is something wrong!!!!", 'err.message');
        // }

    }


    var openImagePickerAsync = async () => {

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);
        setImage(pickerResult.uri);

        if (!pickerResult.cancelled) {
            uploadImage(pickerResult.uri)
                .then((blob) => {
                    setImage(blob);
                    alert("Profile pic uploaded successfully");
                })
                .catch((error) => {
                    // alert(error);
                });
        }
    }

    var uploadImage = async (uri) => {

        const response = await fetch(uri);
        const blob = await response.blob();

        const ref = firebase.storage().ref().child(`/UsersProfilePics/{${Date.now()}`);
        return ref.put(blob);
    }






    return (
        <ImageBackground source={require('../assets/b1.jfif')} style={styles.bimage}>
            <ScrollView behavior="position" style={styles.container}>
                <View style={styles.box1}>
                    {/* <Text style={styles.text}>Welcome to ChitChat</Text> */}
                    <Image style={styles.img} source={require('../assets/download.png')} />
                </View>
                <View style={styles.box2}>
                    {/* {!showNext &&
                <> */}
                    <TextInput
                        style={styles.TextInput}
                        label='Name'
                        value={name}
                        onChangeText={(text) => setName(text)}
                        mode="outlined"
                    />
                    <TextInput
                        style={styles.TextInput}
                        label='Email'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        mode="outlined"
                    />
                    {/* </>
            }
            {showNext ?
                <> */}
                    <TextInput
                        style={styles.TextInput}
                        label='Phone Number'
                        value={phone}
                        keyboardType='numeric'
                        onChangeText={(text) => setPhone(text)}
                        mode="outlined"
                    />
                    <TextInput
                        style={styles.TextInput}
                        label='Password'
                        mode="outlined"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                    />
                    <Button
                        style={styles.button2}
                        mode="contained"
                        onPress={openImagePickerAsync} >
                        Select Profile Pic
                    </Button>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={image} style={{ height: 130, width: 130 }} />
                    </View>

                    <Button
                        style={styles.button}
                        mode="contained"
                        disabled={image ? false : true}
                        onPress={() => userSignup()}>Sign Up
                    </Button>

                    {/* </>
                :
                <Button
                    style={{paddingBottom:3}}
                    mode="contained"
                    onPress={() => setShowNext(true)}>Next
                </Button>
            } */}
                    <Text>Already have an account ?
                        <TouchableOpacity onPress={() => navigation.navigate('login')}><Text style={styles.loginTxt}> Login</Text></TouchableOpacity>
                    </Text>

                </View>
            </ScrollView>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        padding: 5,
        marginTop: 20

    },
    loginTxt: {
        color: 'blue', fontWeight: 'bold', fontSize: '20'
    },
    container: {
        height: '100%',
        // backgroundColor: 'white'
    },
    img: {
        margin: 0,
        padding: 0,
        width: 100,
        height: 100
    },
    box1: {
        alignItems: 'center'
    },
    box2: {
        flex: 1,
        paddingHorizontal: 40,
        justifyContent: "space-evenly",
        height: '90%'
    },
    TextInput: {
        marginBottom: 5,
        marginHorizontal: 5
    },
    button: {
        margin: 5,
        marginBottom: 10,
        marginHorizontal: 18,
        paddingTop: 7,
        marginTop: 50
    },
    button2: {
        margin: 5,
        marginBottom: 10,
        marginHorizontal: 18,
    },
    bimage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: null,
        width: null
    }

    // container2: {
    //   flex: 1,
    //   backgroundColor: '#fff',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // },
    // logo: {

    //   width: 100,
    //   height: 100,
    //   marginBottom: 5,
    // },
    // instructions: {
    //   color: '#888',
    //   fontSize: 18,
    //   marginHorizontal: 15,
    //   marginBottom: 10,
    // },

});


















