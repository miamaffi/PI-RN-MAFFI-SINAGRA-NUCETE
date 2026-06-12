import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { db, auth } from '../config/firebase';

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = () => {
    setError("");
    auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        db.collection("users").add({
          email: email,
          username: username,
          createdAt: new Date()
        });
        navigation.replace("Login");
      })
      .catch((e) => {
        console.log(e.code, e.message);
        setError("Hubo un error al registrarse. Revisá los datos.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput style={styles.field} keyboardType="email-address" placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput style={styles.field} placeholder="Nombre de usuario" onChangeText={setUsername} value={username} />
      <TextInput style={styles.field} placeholder="Contraseña" secureTextEntry onChangeText={setPassword} value={password} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Registrate</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Ya tengo cuenta</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, marginTop: 40, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  field: { paddingVertical: 12, paddingHorizontal: 10, borderWidth: 1, borderColor: "#ccc", borderRadius: 6, marginVertical: 8, fontSize: 16 },
  button: { backgroundColor: "#28a745", paddingVertical: 12, alignItems: "center", borderRadius: 6, marginTop: 10 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  error: { color: "red", textAlign: "center", marginVertical: 8 },
  link: { color: '#28a745', textAlign: 'center', marginTop: 15 },
});