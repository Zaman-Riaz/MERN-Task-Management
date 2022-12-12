
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Text, ScrollView, View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import { Userpic } from 'react-native-userpic';
import Icon from 'react-native-vector-icons/FontAwesome5';

function Home({ navigation }) {
  // console.log(props.counter)

  const [list, setList] = useState([])
  const [counter, setCounter] = useState(0);
  let image = require('./assets/images.jpg')

  // function to get task list
  const getTask = async () => {
    let apiUrl = 'http://172.18.3.16:3003/get_task'
    try {
      let response = await axios({
        method: 'GET',
        url: apiUrl
      })
      if (response.status == 200) {
        let { data } = response;
        if (data) setList(data);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTask()
  }, [])
  

  return (
    <ImageBackground
      source={require('./assets/bg.jpeg')}
      // resizeMode='repeat'
      style={{
        flex: 1
      }}
    >

      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.heading}> Home  </Text>
        </View>
        <ScrollView>
          {/* Map task list */}
          {
            list.map((item, index) => {
              return (
                <View
                  style={styles.taskContainer}
                  key={index}
                >
                  <Userpic
                    source={image}
                    name={item.members}
                    colorize={true}
                  />
                  <View>
                    <Text style={styles.taskHeading}>  {item.members}
                      {/* <Text style={{ color: "#1F487C", fontSize: 17 }}> {item.department} </Text>  */}
                    </Text>
                    {/* <Text style={{ color: "#1F487C", fontSize: 17 }}> {item.managerName} </Text> */}
                    <Text style={{ color: "#1F487C", fontSize: 17 }}>   Task assigned : {item.assignedTask} </Text>
                  </View>

                </View>
              );
            })
          }
        </ScrollView>

        <View style={styles.icon}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Assign Task")
            }}
            style={styles.iconContainer}
          >
            <Icon name='plus' color='white' size={22} />
          </TouchableOpacity>
        </View>

      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#043D69',
    marginBottom: 24
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
  taskHeading: {
    //
    color: '#1F487C',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    margin: 4
  },
  taskContainer: {
    flexDirection: 'row',
    margin: 8,
    width: '95%',
    marginHorizontal: 10,
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 22,
    opacity: 0.9,
  },
  task: {
    color: 'white',
    fontSize: 17,
    marginLeft: 20,
    flexDirection: 'column',
  },
  icon: {
    alignItems: 'flex-end',
    margin: 8,
  },
  iconContainer: {
    height: 55,
    width: 55,
    backgroundColor: '#4EB35E',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25
  }
})

export default Home