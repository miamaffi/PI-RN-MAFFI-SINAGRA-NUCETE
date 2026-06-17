import { View, Text, Image, StyleSheet } from "react-native";

export default function Post({ post }) {
  return (
    <View style={styles.post}>
      <Text style={styles.email}>{post.data.autor}</Text>
      {post.data.photo ? (
        <Image
          style={styles.imagen}
          source={{ uri: `data:image/png;base64,${post.data.photo}` }}
        />
      ) : null}
      <Text style={styles.descripcion}>{post.data.descripcion}</Text>
      <Text style={styles.likes}>{post.data.likes} likes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    width: '100%',
    maxWidth: 470,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ddd',
  },
  email: { fontWeight: 'bold' },
  imagen: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#f0f0f0',
  },
  body: { padding: 10 },
  descripcion: { fontSize: 14, marginTop: 4 },
  likes: { fontWeight: '600', fontSize: 13 },
});