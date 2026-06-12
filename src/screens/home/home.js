import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from '../../config/firebase';

function Home({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('posts').orderBy('fecha', 'desc').onSnapshot((snapshot) => {
        const listaPosts = [];
        snapshot.forEach((doc) => {
          listaPosts.push({
            id: doc.id,
            titulo: doc.data().titulo,
            descripcion: doc.data().descripcion,
            autor: doc.data().autor,
            fecha: doc.data().fecha,
          });
        });
        setPosts(listaPosts);
      });

    return () => unsubscribe();
  }, []);

function cerrarSesion() {
  auth.signOut();
  navigation.navigate('Login');
}

  function renderPost({item}) {
    return (
      <View style={styles.postCard}>
        <Text style={styles.postTitulo}>{item.titulo}</Text>
        <Text style={styles.postDescripcion}>{item.descripcion}</Text>
        <Text style={styles.postAutor}>Por: {item.autor}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>Feed</Text>
        <TouchableOpacity onPress={cerrarSesion}>
          <Text style={styles.cerrarSesion}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        ListEmptyComponent={<Text style={styles.vacio}>No hay posts todavía.</Text>}
      />

      <TouchableOpacity style={styles.botonCrear} onPress={() => navigation.navigate('CrearPost')}>
        <Text style={styles.botonCrearTexto}>+ Crear Post</Text>
      </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3b82f6',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  headerTitulo: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  cerrarSesion: {
    color: '#fff',
    fontSize: 14,
  },
  postCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  postTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#1e293b',
  },
  postDescripcion: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 8,
  },
  postAutor: {
    fontSize: 12,
    color: '#94a3b8',
  },
  vacio: {
    textAlign: 'center',
    marginTop: 40,
    color: '#94a3b8',
    fontSize: 16,
  },
  botonCrear: {
    backgroundColor: '#3b82f6',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonCrearTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;