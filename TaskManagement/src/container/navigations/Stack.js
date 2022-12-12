import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../../login';
import Signup from '../../signup';
import Home from '../../home';
import AssignTask from '../Task/AssignTask';
import Logout from '../../Logout';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={ { headerShown: false } }>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name='Assign Task' component={AssignTask} />
      <Stack.Screen name="Logout" component={Logout} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;