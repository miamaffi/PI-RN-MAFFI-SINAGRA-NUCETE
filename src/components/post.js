import { View, Text, StyleSheet } from "react-native";

export default function Post({ post }) {
  return (
    <View style={styles.post}>
      <Text style={styles.email}>{post.data.email}</Text>
      <Text style={styles.descripcion}>{post.data.descripcion}</Text>
      <Text style={styles.likes}>{post.data.likes.length} likes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  post: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 14, marginBottom: 12 },
  email: { fontWeight: 'bold', marginBottom: 6 },
  descripcion: { fontSize: 15, marginBottom: 10 },
  likes: { color: '#888', fontSize: 13 },
});




