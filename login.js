import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, ImageBackground } from "react-native";
import { TextInput, Button } from "react-native-paper";
import firebase from "../database/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import A from "./Dashboard";

export default function LogiScreen({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [userlist, setUserlist] = useState([]);
    let currentUser;

    if (loading) {
        return <ActivityIndicator size="large" color="blue" />
    }

    const userLogin = () => {
        let apos = email.indexOf('@');
        let dotpos = email.lastIndexOf('.');
        setLoading(false);
        if (!email || !password) {
            alert("Please add all fields");
            return false;
        } else if (apos < 1 || dotpos - apos < 2) {
            alert("Please enter a valid email id");
            return false;
        } else if (userExist()) {
            // return true;
            Refresh();
            try {
                navigation.navigate('drawer')
                // setLoading(true);
            } catch (err) {
                alert(err);
            }
        }

        function Refresh() {
            setEmail('');
            setPassword('');
        }

        function userExist() {
            for (let i = 0; i < userlist.length; i++) {
                if (email == userlist[i].email) {
                    if (password == userlist[i].password) {
                        currentUser = userlist[i];
                        const jsonValue = JSON.stringify(currentUser)
                        AsyncStorage.setItem('currentUser', jsonValue)
                        // console.log(currentUser);
                        // return false;
                        // AsyncStorage.getItem('currentUser', (err,result) => {console.log(result);});
                        return true;
                    }
                    else {
                        alert("wrong password");
                        // return true;
                        return false;
                    }
                }
            }
            alert("User does not exist");
            // return true;
            return false;

        }
    }


    useEffect(() => {
        async function fetchUsers() {
            let users = [];
            await firebase.firestore().collection("users").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data());
                    users.push(doc.data());
                });
            })
                .catch((error) => {
                    alert("Error getting documents", error);
                });

            setUserlist(users);
            //   console.log(userlist);
        }
        fetchUsers();
    });



    return (
        <ImageBackground source={require('../assets/b1.jfif')} style={styles.bimage}>
            <ScrollView behavior="position" style={styles.container}>
                <View style={styles.box1}>
                    {/* <Text style={styles.text}>Welcome to ChitChat</Text> */}
                    <Image style={styles.img} source={require('../assets/download.png')} />
                </View>
                <View style={styles.box2}>

                    <TextInput
                        style={styles.TextInput}
                        label='Email'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
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
                        style={styles.button}
                        mode="contained"
                        onPress={() => userLogin()}>Login
                    </Button>
                    <Text>Are You New User
                        <TouchableOpacity onPress={() => navigation.navigate('register')} style={styles.a1}><Text style={styles.textcolor}> Signup</Text></TouchableOpacity>
                    </Text>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    textcolor: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'blue',
        padding: 5,
        marginTop: 18,
    },

    container: {
        height: '100%',
        // backgroundColor: 'white'
    },
    img: {

        width: 150,
        height: 150,
        marginBottom: 20
    },
    box1: {
        alignItems: 'center'
    },
    box2: {
        flex: 1,
        paddingHorizontal: 40,
        justifyContent: 'space-evenly',
        height: '80%'
    },
    TextInput: {
        marginBottom: 8,
        marginHorizontal: 15
    },
    bimage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: null,
        width: null
    },
    button: {
        marginHorizontal: 18,
        marginTop: 10,
        marginBottom: 8
    }
})




