import { View, Text, StyleSheet } from 'react-native';

export default function MiPerfil() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pantalla de Mi Perfil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 24 },
});
