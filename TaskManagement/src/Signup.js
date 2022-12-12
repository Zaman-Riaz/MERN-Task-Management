
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, ImageBackground, StyleSheet, View, Text, TextInput, TouchableOpacity, ToastAndroid, KeyboardAvoidingView } from "react-native";

function Signup({ navigation }) {

    const [data, setData] = useState({
        name: '',
        email: '',
        depart: '',
        pass: '',
    })

    const postData = async (data) => {
        console.log(data)
        let apiUrl = 'http://172.18.3.16:3003/user_info';
        let formData = {
            userName: data.name,
            userEmail: data.email,
            userDepartment: data.depart,
            userPassword: data.pass,
        }
        try {
            let response = await axios({
                method: 'POST',
                url: apiUrl,
                data: formData
            })
            if (response.status == 200) {
                console.log(response)
                ToastAndroid.show(response.data, ToastAndroid.SHORT)
            }

        }
        catch (error) {
            console.log(error.response)
            if (error.response.status == 406) {
                ToastAndroid.show(error.response.data, ToastAndroid.SHORT)
            }
            else if (error.response.status == 400) {
                ToastAndroid.show(error.response.data, ToastAndroid.SHORT)
            }
            else {
                ToastAndroid.show(error.response.data, ToastAndroid.SHORT)
            }
        }
    }

    const submitForm = () => {
        postData(data);
        setData({
            name: '',
            email: '',
            pass: ''
        });
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
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.heading}> SIGN UP </Text>
                            <Text style={styles.headerText}> Create a new account </Text>
                        </View>

                        <Text style={styles.text}> Name </Text>
                        <TextInput
                            style={styles.input}
                            value={data.name}
                            placeholder='Enter your name'
                            onChangeText={name => setData({ ...data, name: name })}
                        />

                        <Text style={styles.text}> Email </Text>
                        <TextInput
                            style={styles.input}
                            value={data.email}
                            placeholder='abc@gmail.com'
                            onChangeText={email => setData({ ...data, email: email })}
                        />

                        <Text style={styles.text}> Department </Text>
                        <TextInput
                            style={styles.input}
                            value={data.depart}
                            placeholder='Web & App/ SAP/ ERP'
                            onChangeText={depart => setData({ ...data, depart: depart })}
                        />

                        <Text style={styles.text}> Password </Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Please enter your password'
                            value={data.pass}
                            onChangeText={pass => setData({ ...data, pass: pass })}
                            secureTextEntry={true}
                        />
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={submitForm}
                                style={styles.signup}
                            >
                                <Text style={styles.signupText}> Sign up </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bottom}>
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}> Already have an account? </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Login")
                                }}
                            >
                                <Text style={styles.loginText}> Login </Text>
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
        marginTop: '22%',
        marginHorizontal: 10,
        borderRadius: 25,
        justifyContent: 'center',
        // backgroundColor: '#FAF5EB',
        backgroundColor: 'white',
        // opacity: 0.9
    },
    input: {
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: '#4EB35E',
        width: '90%',
        margin: 8,
        padding: 10
    },
    text: {
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 35,
    },
    headerText: {
        color: '#4EB35E',
        fontWeight: 'bold',
        fontSize: 17,
        padding: 4
    },
    signup: {
        padding: 5,
        margin: 14,
        borderWidth: 2,
        borderColor: 'orange',
        borderRadius: 20,
        width: '50%',
        // marginBottom: 15,
        // backgroundColor: 'pink'
    },
    signupText: {
        color: "orange",
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
    bottom: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 25,
        padding: 4
    },
    loginText: {
        color: '#28B0D8',
        fontWeight: 'bold',
        fontSize: 17
    }
});

export default Signup