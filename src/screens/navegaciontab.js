import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from '@expo/vector-icons';
import HomeStack from './homestack';
import CrearPosteo from './crearposteo';
import MiPerfil from './miperfil';

const Tab = createBottomTabNavigator();

export default function NavegacionTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#f5e642',
          borderTopColor: '#e0d000',
        },
        tabBarActiveTintColor: '#0a0a0a',
        tabBarInactiveTintColor: '#555',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CrearPosteo"
        component={CrearPosteo}
        options={{
          tabBarLabel: 'Crear Post',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MiPerfil"
        component={MiPerfil}
        options={{
          tabBarLabel: 'Mi Perfil',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}