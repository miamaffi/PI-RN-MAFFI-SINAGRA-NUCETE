import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from './homestack';
import CrearPosteo from './crearposteo';
import MiPerfil from './miperfil';

const Tab = createBottomTabNavigator();

export default function NavegacionTab() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="CrearPosteo" component={CrearPosteo} />
      <Tab.Screen name="MiPerfil" component={MiPerfil} />
    </Tab.Navigator>
  );
}
