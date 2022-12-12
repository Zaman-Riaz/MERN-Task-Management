
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, ImageBackground } from 'react-native'
import { Userpic } from 'react-native-userpic';

function Erp() {
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const text = 'erp';

    // api call function to get users list  
    const getUsers = async () => {
        let apiUrl = 'http://172.18.3.16:3003/get_users';
        try {
            let response = await axios({
                method: 'GET',
                url: apiUrl
            })
            console.log(response)
            if (response.status == 200) {
                let { data } = response;
                if (data) setData(data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    // filter users according to departments
    useEffect(() => {
        if (data.length > 0) {
            let arr = data.filter((item) => { return item.userDepartment == text });
            if (arr) setFilterData(arr);
        }
    }, [data]);

    return (

        <ImageBackground
            source={require('../../assets/bg.jpeg')}
            style={{
                flex: 1
            }}
        >
            <View style={styles.header}>
                <Text style={styles.heading}> ERP
                    <Text style={{ fontSize: 18 }}>  Enterprise Resource Planning </Text>
                </Text>
            </View>

            <ScrollView>

                {
                    filterData.map((item, index) => {
                        return (
                            <View
                                key={index}
                                style={styles.userList}
                            >
                                <View style={styles.textView}>

                                    <Userpic
                                        name={item.userName}
                                        colorize={true}
                                    />
                                    <Text style={styles.text}> {item.userName} </Text>
                                </View>
                            </View>

                        );
                    })
                }
            </ScrollView>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#043D69',
        marginBottom: 22
    },
    heading: {
        alignItems: 'center',
        color: 'white',
        marginTop: 28,
        marginLeft: 1,
        padding: 8,
        fontSize: 28,
        fontWeight: 'bold',
    },
    userList: {
        flexDirection: 'row',
        width: '95%',
        marginHorizontal: 10,
        paddingHorizontal: 8,
        paddingVertical: 10,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F487C',
        marginLeft: 10,
        textTransform: 'capitalize',
    },
    textView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Erp