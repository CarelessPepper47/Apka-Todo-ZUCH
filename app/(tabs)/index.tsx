import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useUser } from '../context/UserContext';

export default function HomeScreen() {
  const { user, setUser } = useUser();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleLogin = () => {
    if (username === "szef" && password === "kosmosu") {
      setUser('ZUCH')
      setMessage("Zalogowano jako ZUCH");
    } else {
      setUser('DUPA')
      setMessage("Niepoprawne logowanie");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appLogo}>
        Moja Apka
      </Text>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Zaloguj się</Text>
        </TouchableOpacity>

        {message !== "" && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#101114",
    marginBottom: 50,
  },
  appLogo: {
    marginBottom: 25,
    fontSize: 42,
    fontWeight: '800',
    textAlign: 'center',
    color: '#00FFC4',
    textTransform: 'uppercase'
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
    color: '#00FFC4',
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff', // Dodane dla lepszej widoczności tekstu
    marginBottom: 15,
  },
  message: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: '#00FFC4', // Dodane dla spójności stylu
  },
  loginButton: {
    backgroundColor: '#00FFC4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#101114',
    fontWeight: 'bold',
    fontSize: 16,
  }
});