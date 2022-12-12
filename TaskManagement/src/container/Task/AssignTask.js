
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ToastAndroid, KeyboardAvoidingView, ImageBackground } from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown';
import Home from '../../Home';

function AssignTask({ navigation }) {

  const [data, setData] = useState({ task: '', member: '', manager: '', depart: '' })
  const [member, setMember] = useState([])
  const [department, setDepartment] = useState([])
  const manager = ['Sir Hammad', 'Sir Faseh', 'Sir Rehman', 'Sir Kamran']
  // const department = ['Erp', 'Sap', 'Web & App']
  const [counter, setCounter] = useState(0);

  // function to post Task in database
  const postTask = async () => {
    let apiUrl = 'http://172.18.3.16:3003/post_task';
    let formData = {
      assignedTask: data.task,
      members: data.member,
      managerName: data.manager,
      department: data.depart,
    }
    try {
      let response = await axios({
        method: 'POST',
        data: formData,
        url: apiUrl
      })
      console.log(response)
      if (response.status == 200) {
        ToastAndroid.show(response.data, ToastAndroid.LONG)
        navigation.navigate('Home')
        setCounter(counter + 1);
        <Home counter={counter} />
      }
    } catch (error) {
      console.log(error.response)
      if (error.response.status == 400) {
        ToastAndroid.show(error.response.data, ToastAndroid.LONG)
      }
      else {
        ToastAndroid.show(error.response.data, ToastAndroid.LONG)
      }
    }
  }

  const submitTask = () => {
    if (data) {
      postTask(data)
    }
    setData({ task: '', member: '', manager: '', depart: '' })
  }

  const getUsers = async () => {
    let apiUrl = 'http://172.18.3.16:3003/get_users';
    try {
      let response = await axios({
        method: 'GET',
        url: apiUrl
      })
      // console.log(response)
      if (response.status == 200) {
        let { data } = response;
        if (data) setMember(data);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    console.log(member, 'member');
  }, [member])

  console.log(data)

  // Note: Function to handle dropdown for members list...!
  const renderDropDownList = (rowData, rowID) => {
    // console.log(rowData, rowID);
    return <Text style={styles.rowDataStyles}>{rowData.userName}</Text>
  }

  const renderButtonText = (rowData) => {
    // console.log(rowData);
    const { userName } = rowData;
    console.log(userName);
    data.member = userName;
    setData({ ...data });
    return <View><Text>{userName}</Text></View>
  }

  // Note: Function to handle dropdown for departments list...!
  const renderDropDownListDepart = (rowData, rowID) => {
    return <Text style={styles.rowDataStyles}>{rowData.userDepartment}</Text>
  }

  const renderButtonTextDepart = (rowData) => {
    const { userDepartment } = rowData;
    data.depart = userDepartment;
    setData({ ...data });
    return <View><Text>{userDepartment}</Text></View>
  }

  return (

    <ImageBackground
      source={require('../../assets/bg.jpeg')}
      // resizeMode='repeat'
      style={{
        flex: 1
      }}
    >
      <KeyboardAvoidingView>
        <View style={styles.header}>
          <Text style={styles.heading}> Assign Task </Text>
        </View>

        <View
          style={{
            justifyContent: 'center',
            marginTop: 50
          }}>

          <Text style={styles.text}> Member name</Text>
          <ModalDropdown
            // options={member.length > 0 ? member : []}
            options={member}
            textStyle={styles.dropDown}
            isFullWidth={true}
            onSelect={(id, member) => setData({ ...data, member: member })}
            renderRow={(rowData, rowID) => renderDropDownList(rowData, rowID)}
            renderButtonText={(rowData) => renderButtonText(rowData)}
          // onSelect={(id, value) => setSelectUser(value)}
          />

          <Text style={styles.text}> Department name </Text>
          <ModalDropdown
            options={member}
            isFullWidth={true}
            textStyle={styles.dropDown}
            onSelect={(id, depart) => setData({ ...data, depart: depart })}
          // renderRow={(rowData, rowID) => renderDropDownListDepart(rowData, rowID)}
          // renderButtonText={(rowData) => renderButtonTextDepart(rowData)}
          />

          <Text style={styles.text}> Manager Name </Text>
          <ModalDropdown
            options={manager}
            isFullWidth={true}
            onSelect={(id, manager) => setData({ ...data, manager: manager })}
            textStyle={styles.dropDown}
          />

          <Text style={styles.text}> Task to assign </Text>
          <TextInput
            style={styles.input}
            placeholder='Enter task to assign'
            value={data.task}
            onChangeText={task => setData({ ...data, task: task })}
          />
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={submitTask}>
          <Text style={styles.buttonText}> Done </Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    </ImageBackground>

  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#043D69',
  },
  heading: {
    alignItems: 'center',
    color: 'white',
    marginTop: 28,
    marginLeft: 10,
    padding: 6,
    fontSize: 28,
    fontWeight: 'bold',
  },
  dropDown: {
    color: 'black',
    borderWidth: 1.5,
    borderColor: '#4EB35E',
    width: '95%',
    borderRadius: 5,
    padding: 8,
    fontSize: 15,
    marginVertical: 5,
    marginHorizontal: 10
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#4EB35E',
    width: '95%',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 5,
    minHeight: 55,
    backgroundColor: 'white',
    opacity: 0.8,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F487C',
    marginLeft: 10,
    padding: 4,
    margin: 6,
  },
  submitButton: {
    width: '90%',
    padding: 18,
    backgroundColor: '#4EB35E',
    borderRadius: 20,
    marginLeft: 20,
    margin: 24,
  },
  buttonText: {
    color: "white",
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17
  },
})

export default AssignTask