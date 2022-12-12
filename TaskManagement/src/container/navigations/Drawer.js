// import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import Login from '../../Login'
import Signup from '../../Signup'
import Home from '../../Home'
import Web from '../departments/Web&App'
import Sap from '../departments/Sap'
import Erp from '../departments/Erp'
import AssignTask from '../Task/AssignTask';
import { StyleSheet, View } from 'react-native';


const Drawer = createDrawerNavigator();
const { Navigator, Screen } = Drawer;

function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{flex: 1, justifyContent: 'space-between'}}>
        <View style={{justifyContent: 'flex-start'}}>
          <DrawerItemList {...props} />
        </View>
        <DrawerItem
          label="Logout"
          onPress={() => {props.navigation.navigate('Login')}}
        />
      </DrawerContentScrollView>
    );
  }

function MyDrawer() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }} drawerContent={CustomDrawerContent}>
                <Screen name="Home" component={Home} />
                <Screen name="Assign Task" component={AssignTask} />
                <Screen name="Web & App" component={Web} />
                <Screen name="Erp" component={Erp} />
                <Screen name="Sap" component={Sap} />
                <Screen name="Login" component={Login} />
                <Screen name="Signup" component={Signup} />
            </Navigator>
        </NavigationContainer>
    );
}


export default MyDrawer;