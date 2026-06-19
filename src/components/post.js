import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { db, auth } from '../config/firebase';
import firebase from 'firebase';

// El Post recibe por props el posteo a mostrar y el navigation que es para el botón de comentar
export default function Post({ post, navigation }) {
  const email = auth.currentUser.email;

  // Agarro el array de likes del posteo. Si no existe, uso uno vacío para que no rompa
  let likes = [];
  if (post.data.likes) {
    likes = post.data.likes;
  }

  // Chequeo si yo ya likeé este posteo (si mi email está en el array de likes)
  let yaLikeo = false;
  likes.forEach((likeEmail) => {
    if (likeEmail === email) {
      yaLikeo = true;
    }
  });

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

      <Text style={styles.titulo}>{post.data.titulo}</Text>
      <Text style={styles.descripcion}>{post.data.descripcion}</Text>

      <View style={styles.acciones}>
      <Pressable onPress={darLike}>
        <Text style={yaLikeo ? styles.meGustaActivo : styles.meGusta}>Me gusta</Text>
      </Pressable>

      {/* Botón "Comentar": me lleva a la pantalla de comentarios pasándole el id del posteo. */}
      {navigation ? (
        <Pressable onPress={() => navigation.navigate("ComentarPosteo", { id: post.id })}>
          <Text style={styles.comentar}>Comentar</Text>
        </Pressable>
      ) : null}
      </View>

      {/* Muestro la cantidad de likes (el largo del array) */}
      <Text style={styles.likes}>{likes.length} likes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    width: '90%',
    maxWidth: 400,
    alignSelf: 'center',
    backgroundColor: '#f5f0e8',
    padding: 12,
    paddingBottom: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  email: {
    fontWeight: 'bold',
    paddingVertical: 6,
    color: '#1a1a1a',
    fontSize: 12,
  },
  imagen: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#ddd',
  },
  titulo: {
    color: '#1a1a1a',
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 12,
    textAlign: 'center',
  },
  descripcion: {
    fontSize: 11,
    marginTop: 4,
    color: '#555',
    textAlign: 'center',
  },
  acciones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  meGusta: {
    fontSize: 13,
    fontWeight: '600',
    color: '#aaa',
  },
  meGustaActivo: {
    fontSize: 13,
    fontWeight: '600',
    color: '#e74c3c',
  },
  comentar: {
    fontSize: 13,
    fontWeight: '600',
    color: '#aaa',
  },
  likes: {
    fontWeight: '600',
    fontSize: 12,
    color: '#555',
    marginTop: 6,
    textAlign: 'center',
  },
});