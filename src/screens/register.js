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

    if (!email.includes("@")) {
      setError("Formato de correo incorrecto.");
      return;
    }
    if (username === "") {
      setError("Tenés que escribir un nombre de usuario.");
      return;
    }
    if (password === "") {
      setError("Tenés que escribir una contraseña.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener una longitud mínima de 6 caracteres");
      return;
    }

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
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Se<Text style={styles.logoAcento}>REAL</Text></Text>
        <Text style={styles.logoSub}>sin filtros. sin edición. real.</Text>
      </View>
      <Text style={styles.title}>Registro</Text>
      <TextInput style={styles.field} keyboardType="email-address" placeholder="Email" placeholderTextColor="#555" onChangeText={setEmail} value={email} />
      <TextInput style={styles.field} placeholder="Nombre de usuario" placeholderTextColor="#555" onChangeText={setUsername} value={username} />
      <TextInput style={styles.field} placeholder="Contraseña" placeholderTextColor="#555" secureTextEntry onChangeText={setPassword} value={password} />
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
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  logoAcento: {
    color: '#f5e642',
  },
  logoSub: {
    color: '#fff',
    fontSize: 13,
    marginTop: 6,
    letterSpacing: 1,
  },
  field: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginVertical: 8,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  button: {
    backgroundColor: '#f5e642',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 16,
  },
  buttonText: {
    color: '#0a0a0a',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  error: {
    color: '#ff4444',
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 13,
  },
  link: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 13,
  },
});