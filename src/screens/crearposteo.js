import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { db, auth } from '../config/firebase';
import Camara from '../components/camara'

function CrearPost({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [photoUri, setPhotoUri] = useState(null)
  const [mensajeError, setMensajeError] = useState("")

    function guardarPost() {
      if (titulo === "") {
        setMensajeError("Por favor completa el titulo, gracias")
        return
      }

      setMensajeError("")

    db.collection('posts').add({
      titulo: titulo,
      descripcion: descripcion,
      autor: auth.currentUser.email,
      fecha: Date.now(),
      photo: photoUri,
      likes: [],
    })
      .then(() => {
        setTitulo('')
        setDescripcion('')
        setPhotoUri(null)
        setMensajeError("")
        navigation.goBack();
      })
      .catch((error) => {
        setMensajeError(error.message)
      });
  }

  return (
    <View style={styles.container}>
      {
        photoUri === null ?
        <Camara setPhotoUri={(uri) => setPhotoUri(uri)}/>

        :
        <>
              <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()}>
                  <Text style={styles.volver}>← Volver</Text>
                </Pressable>
                <Text style={styles.headerTitulo}>Crear Post</Text>
              </View>

              <View style={styles.form}>
              <Text style={styles.label}>
               Título <Text style={styles.requerido}>*</Text>
             </Text>
             <TextInput
             style={styles.input}
             placeholder="Ingresá un título"
            value={titulo}
            onChangeText={(text) => setTitulo(text)}
  />

                <Text style={styles.label}>Descripción (opcional)</Text>
                <TextInput
                  style={[styles.input, styles.inputMultiline]}
                  placeholder="Ingresá una descripción"
                  value={descripcion}
                  onChangeText={(text) => setDescripcion(text)}
                  multiline={true}
                  numberOfLines={4}
                />
                <Text>{mensajeError}</Text>
                <Pressable style={styles.boton} onPress={guardarPost}>
                  <Text style={styles.botonTexto}>Publicar</Text>
                </Pressable>
              </View>
        </>
      }
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
  requerido: {
    color: 'red',
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