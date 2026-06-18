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
      <Text style={styles.logo}>Se<Text style={styles.logoAcento}>REAL</Text></Text>
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
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
    marginBottom: 16,
  },
  logoAcento: {
    color: '#f5e642',
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  email: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },
  logoutBtn: {
    borderWidth: 1,
    borderColor: '#555',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 4,
    marginTop: 16,
  },
  logoutTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 1,
  },
  lista: {
    padding: 16,
  },
});