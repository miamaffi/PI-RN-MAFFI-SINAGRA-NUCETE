import { useState, useEffect } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { db, auth } from '../config/firebase';
import Post from '../components/post';

export default function MiPerfil({ navigation }) {
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);

  const email = auth.currentUser.email;

  useEffect(() => {
    db.collection("users")
      .where("email", "==", email)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          setUsername(snapshot.docs[0].data().username);
        }
      });

    const unsubscribe = db.collection("posts")
      .where("autor", "==", email)
      .onSnapshot((snapshot) => {
        const lista = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setPosts(lista);
      });

    return unsubscribe;
  }, []);

  const logout = () => {
    auth.signOut()
      .then(() => {
        navigation.navigate("Login");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.email}>{email}</Text>
        <Pressable style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutTexto}>Cerrar sesión</Text>
        </Pressable>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Post post={item} />}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { alignItems: 'center', paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
  username: { fontSize: 22, fontWeight: 'bold', color: '#1e293b' },
  email: { fontSize: 14, color: '#64748b', marginTop: 2 },
  logoutBtn: { backgroundColor: '#ef4444', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 8, marginTop: 16 },
  logoutTexto: { color: '#fff', fontWeight: 'bold' },
  lista: { padding: 16 },
});