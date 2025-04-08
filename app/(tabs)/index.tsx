import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
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
      
      <View style={styles.inputContainer}>
        <MaterialIcons 
          name="person" 
          size={20} 
          color="#4A4D57" 
          style={styles.inputIcon} 
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#4A4D57"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons 
          name="lock" 
          size={20} 
          color="#4A4D57" 
          style={styles.inputIcon} 
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#4A4D57"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

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
  },
  appLogo: {
    marginBottom: 40,
    fontSize: 42,
    fontWeight: '800',
    textAlign: 'center',
    color: '#00FFC4',
    textTransform: 'uppercase'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: "#4A4D57",
    borderRadius: 25,
    backgroundColor: 'transparent',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#f9f9f9',
    fontSize: 16,
  },
  message: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: '#00FFC4',
  },
  loginButton: {
    backgroundColor: '#00FFC4',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 15,
  },
  loginButtonText: {
    color: '#101114',
    fontWeight: 'bold',
    fontSize: 16,
  }
});