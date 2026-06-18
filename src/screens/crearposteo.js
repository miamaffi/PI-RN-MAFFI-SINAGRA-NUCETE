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
                <Text style={styles.headerTitulo}>Se<Text style={styles.headerAcento}>REAL</Text></Text>
              </View>

              <View style={styles.form}>
              <Text style={styles.label}>Título <Text style={styles.requerido}>*</Text>
             </Text>
             <TextInput
             style={styles.input}
             placeholder="Ingresá un título"
             placeholderTextColor="#555"
            value={titulo}
            onChangeText={(text) => setTitulo(text)}
  />

                <Text style={styles.label}>Descripción (opcional)</Text>
                <TextInput
                  style={[styles.input, styles.inputMultiline]}
                  placeholder="Ingresá una descripción"
                  placeholderTextColor="#555"
                  value={descripcion}
                  onChangeText={(text) => setDescripcion(text)}
                  multiline={true}
                  numberOfLines={4}
                />
                <Text style={styles.error}>{mensajeError}</Text>
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
    backgroundColor: '#0a0a0a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
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
    letterSpacing: 2,
  },
  headerAcento: {
    color: '#f5e642',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 6,
    marginTop: 16,
  },
  requerido: {
    color: '#f5e642',
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#2a2a2a',
    borderRadius: 4,
    padding: 12,
    fontSize: 14,
    color: '#fff',
  },
  inputMultiline: {
    height: 120,
    textAlignVertical: 'top',
  },
  error: {
    color: '#ff4444',
    fontSize: 13,
    marginTop: 8,
  },
  boton: {
    backgroundColor: '#f5e642',
    padding: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 32,
  },
  botonTexto: {
    color: '#0a0a0a',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default CrearPost;