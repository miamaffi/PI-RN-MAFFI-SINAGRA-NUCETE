import { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from "react-native";
import { db, auth } from '../config/firebase';

export default function ComentarPosteo({ route, navigation }) {
  // Saco el id del posteo que me llegó por params desde el Home
  const postId = route.params.id;

  // Estado para el texto del comentario que estoy escribiendo
  const [comentario, setComentario] = useState("");
  // Estado donde guardo la lista de comentarios de este posteo
  const [comentarios, setComentarios] = useState([]);

  // Al montar la pantalla, traigo los comentarios de este posteo
  useEffect(() => {
    // De la colección comments me traigo solo los que tengan el postId de este posteo.
    const unsubscribe = db.collection("comments")
      .where("postId", "==", postId)
      .onSnapshot((snapshot) => {
        // Recorro los documentos y armo un array con el id y los datos de cada uno
        const lista = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        // Guardo ese array en el estado
        setComentarios(lista);
      });
    return unsubscribe;
  }, []);

  // Función para guardar un comentario nuevo en la base
  function agregarComentario() {
    // Si el campo está vacío, no hago nada
    if (comentario === "") return;
    // Agrego el comentario a comments con sus datos
    db.collection("comments").add({
      postId: postId,                
      texto: comentario,              
      autor: auth.currentUser.email,  
      fecha: Date.now(),              
    });
    // Limpio el input después de publicar
    setComentario("");
  }

  return (
    <View style={styles.container}>
      {/* Botón para volver al Home */}
      <Pressable onPress={() => navigation.goBack()}>
        <Text style={styles.volver}>← Volver</Text>
      </Pressable>

      {/* Título de la pantalla */}
      <Text style={styles.titulo}>Comentarios</Text>

      {/* Lista de los comentarios ya agregados */}
      <FlatList
        data={comentarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.comentario}>
            <Text style={styles.autorComentario}>{item.data.autor}</Text>
            <Text style={styles.textoComentario}>{item.data.texto}</Text>
          </View>
        )}
      />

      {/* Fila con el input para escribir y el botón de publicar */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Escribí un comentario..."
          placeholderTextColor="#555"
          value={comentario}
          onChangeText={setComentario}
        />
        <Pressable style={styles.boton} onPress={agregarComentario}>
          <Text style={styles.botonTexto}>Publicar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
    paddingBottom: 12,
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  logoAcento: {
    color: '#f5e642',
  },
  volver: {
    color: '#fff',
    fontSize: 16,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    letterSpacing: 1,
  },
  comentario: {
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
    paddingVertical: 10,
  },
  autorComentario: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#f5e642',
  },
  textoComentario: {
    fontSize: 14,
    marginTop: 2,
    color: '#fff',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#1a1a1a',
    color: '#fff',
  },
  boton: {
    backgroundColor: '#f5e642',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  botonTexto: {
    color: '#0a0a0a',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});