import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { db, auth } from '../config/firebase';

export default function CrearPosteo({ navigation }) {
  const [descripcion, setDescripcion] = useState("");

  const onSubmit = () => {
    if (descripcion === "") return;
    db.collection("posts").add({
      email: auth.currentUser.email,
      descripcion: descripcion,
      likes: [],
      createdAt: new Date(),
    });
    setDescripcion("");
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear nuevo post</Text>
      <TextInput
        style={styles.field}
        placeholder="Escribe aquí tu posteo..."
        multiline
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Publicar post</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, marginTop: 40, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  field: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 12, minHeight: 100, fontSize: 16, textAlignVertical: "top", marginBottom: 16 },
  button: { backgroundColor: "#28a745", paddingVertical: 12, alignItems: "center", borderRadius: 6 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
