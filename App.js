import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/login/login';
import Register from './src/screens/register/register';
import CrearPost from './src/screens/crearpost/crearPost';
import Home from './src/screens/home/home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CrearPost" component={CrearPost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}