import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { db, auth } from '../config/firebase';
import firebase from 'firebase';

// El Post recibe por props el posteo a mostrar y el navigation que es para el botón de comentar
export default function Post({ post, navigation }) {
  const email = auth.currentUser.email;
  // Agarro el array de likes del posteo. Si no existe, uso uno vacío para que no rompa
  const likes = post.data.likes || [];
  // Chequeo si yo ya likeé este posteo (si mi email está en el array de likes)
  const yaLikeo = likes.includes(email);

  function darLike() {
    // Si ya lo había likeado, saco mi email del array (quito el like)
    if (yaLikeo) {
      db.collection("posts").doc(post.id).update({
        likes: firebase.firestore.FieldValue.arrayRemove(email),
      });
    // Si no, agrego mi email al array (doy el like)
    } else {
      db.collection("posts").doc(post.id).update({
        likes: firebase.firestore.FieldValue.arrayUnion(email),
      });
    }
  }

  return (
    <View style={styles.post}>
      <Text style={styles.email}>{post.data.autor}</Text>
      {post.data.photo ? (
        <Image
          style={styles.imagen}
          source={{ uri: `data:image/jpeg;base64,${post.data.photo}` }}
        />
      ) : null}
      <Text style={styles.descripcion}>{post.data.descripcion}</Text>
      <Pressable onPress={darLike}>
        <Text style={yaLikeo ? styles.meGustaActivo : styles.meGusta}>Me gusta</Text>
      </Pressable>

      {/* Botón "Comentar": me lleva a la pantalla de comentarios pasándole el id del posteo. */}
      {navigation ? (
        <Pressable onPress={() => navigation.navigate("ComentarPosteo", { id: post.id })}>
          <Text style={styles.comentar}>Comentar</Text>
        </Pressable>
      ) : null}

      {/* Muestro la cantidad de likes (el largo del array) */}
      <Text style={styles.likes}>{likes.length} likes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  post: { width: '100%', maxWidth: 470, alignSelf: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, marginBottom: 16, overflow: 'hidden' },
  email: { fontWeight: 'bold', padding: 10 },
  imagen: { width: '100%', aspectRatio: 1, backgroundColor: '#f0f0f0' },
  descripcion: { fontSize: 14, paddingHorizontal: 10, marginTop: 4 },
  meGusta: { fontSize: 14, fontWeight: '600', color: '#64748b', paddingHorizontal: 10, marginTop: 6 },
  meGustaActivo: { fontSize: 14, fontWeight: '600', color: '#e74c3c', paddingHorizontal: 10, marginTop: 6 },
  comentar: { fontSize: 14, fontWeight: '600', color: '#3b82f6', paddingHorizontal: 10, marginTop: 6 },
  likes: { fontWeight: '600', fontSize: 13, padding: 10 },
});