import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { db, auth } from '../config/firebase';
import camara from '../components/camara'

function CrearPost({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  function guardarPost() {
    if (titulo === '' || descripcion === '') {
      Alert.alert('Error', 'Por favor completá todos los campos.');
      return;
    }

    db.collection('posts').add({
      titulo: titulo,
      descripcion: descripcion,
      autor: auth.currentUser.email,
      fecha: Date.now(),
    })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.volver}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitulo}>Crear Post</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresá un título"
          value={titulo}
          onChangeText={(text) => setTitulo(text)}
        />

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          placeholder="Ingresá una descripción"
          value={descripcion}
          onChangeText={(text) => setDescripcion(text)}
          multiline={true}
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.boton} onPress={guardarPost}>
          <Text style={styles.botonTexto}>Publicar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b82f6',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    gap: 16,
  },
  volver: {
    color: '#fff',
    fontSize: 16,
  },
  headerTitulo: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#1e293b',
  },
  inputMultiline: {
    height: 120,
    textAlignVertical: 'top',
  },
  boton: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 32,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CrearPost;