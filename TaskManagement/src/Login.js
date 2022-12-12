
import axios from "axios";
import React, { useState } from "react";
import { ImageBackground, Alert, StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity, ToastAndroid, KeyboardAvoidingView } from "react-native";
import Home from './Home'


export default function Login({ navigation }) {

    const [data, setData] = useState({ email: '', pass: '' })

    // function to verify login credentials
    const loginData = async (data) => {
        let apiUrl = 'http://172.18.3.16:3003/login_info';
        let formData = {
            email: data.email,
            password: data.pass
        }
        try {
            let response = await axios({
                method: 'POST',
                data: formData,
                url: apiUrl
            })
            if (response.status == 200) {
                console.log(response)
                ToastAndroid.show(response.data, ToastAndroid.LONG)
                navigation.navigate(Home)
            }
        } catch (error) {
            // console.log(error.message);
            console.log(error.response)
            if (error.response.status == 401)
                ToastAndroid.show(error.response.data, ToastAndroid.LONG)
            else if (error.response.status == 400)
                ToastAndroid.show(error.response.data, ToastAndroid.LONG)
            else
                ToastAndroid.show(error.response.data, ToastAndroid.LONG)
        }
    }


    const submitForm = () => {
        loginData(data);
        setData({ email: '', pass: '' })

    }

    return (

        <>
            <ImageBackground
                source={require('./assets/img.jpg')}
                resizeMode='stretch'
                style={{
                    flex: 1
                }}
            >

                <KeyboardAvoidingView>
                    <View style={styles.container}>
                        <View style={{ alignItems: 'center', }}>
                            <Text style={styles.heading}> Welcome Back </Text>
                            <Text style={styles.headerText}> LogIn to continue </Text>
                        </View>

                        <Text style={styles.text}> Email </Text>
                        <TextInput
                            style={styles.input}
                            value={data.email}
                            placeholder='abc@gmail.com'
                            onChangeText={email => setData({ ...data, email: email })}
                        />

                        <Text style={styles.text}> Password </Text>
                        <TextInput
                            style={styles.input}
                            value={data.pass}
                            secureTextEntry={true}
                            placeholder='Please enter your password'
                            onChangeText={pass => setData({ ...data, pass: pass })}
                        />

                        <TouchableOpacity>
                            <Text
                                style={{ color: '#4EB35E', marginLeft: 224, fontWeight: 'bold', fontSize: 17 }}>
                                Forgot Password? </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={submitForm}
                            style={styles.login}>
                            <Text style={styles.loginText}> Login </Text>
                        </TouchableOpacity>

                        <View style={styles.bottom}>
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}> Don't have an account? </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Signup")
                                }}
                            >
                                <Text style={styles.signupText}> Signup </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: '28%',
        marginHorizontal: 10,
        borderRadius: 25,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    input: {
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#4EB35E',
        width: '90%',
        margin: 12,
        padding: 10
    },
    text: {
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft: 20,
        padding: 4
    },
    heading: {
        // fontSize: 25,
        // fontWeight: 'bold',
        // marginLeft: 2,
        // padding: 20,
        // margin: 10,
        // marginTop: 35,
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 35,
    },
    headerText: {
        color: '#4EB35E',
        fontWeight: 'bold',
        fontSize: 17,
        padding: 4,
        // opacity: 0.6
    },
    login: {
        width: '90%',
        padding: 18,
        backgroundColor: '#4EB35E',
        borderRadius: 20,
        marginLeft: 20,
        margin: 15,
        // marginTop: 30
    },
    bottom: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 25,
        padding: 4,
        margin: 4
    },
    signupText: {
        color: 'orange',
        fontWeight: 'bold',
        fontSize: 17
    },
    loginText: {
        color: "white",
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 17
    }
});