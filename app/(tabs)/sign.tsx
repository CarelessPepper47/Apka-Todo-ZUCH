import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  Alert
} from 'react-native';
import { useUser } from '../context/UserContext';
import { MaterialIcons } from '@expo/vector-icons';

export default function SignScreen() {
  const { setUser } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert('Błąd', 'Hasła nie są identyczne');
      return;
    }

    if (username && password) {
      // Tutaj w prawdziwej aplikacji byłaby logika rejestracji w backendzie
      // Na razie symulujemy udaną rejestrację
      setUser(username);
      Alert.alert('Sukces', `Zarejestrowano jako ${username}`);
    } else {
      Alert.alert('Błąd', 'Wypełnij wszystkie pola');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rejestracja</Text>
      
      <View style={styles.inputGroup}>
        <MaterialIcons name="person" size={20} color="#4A4D57" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Nazwa użytkownika"
          placeholderTextColor="#4A4D57"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputGroup}>
        <MaterialIcons name="lock" size={20} color="#4A4D57" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Hasło"
          placeholderTextColor="#4A4D57"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.inputGroup}>
        <MaterialIcons name="lock-outline" size={20} color="#4A4D57" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Potwierdź hasło"
          placeholderTextColor="#4A4D57"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSignUp}
      >
        <Text style={styles.buttonText}>Zarejestruj się</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#101114',
    justifyContent: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    color: '#00FFC4',
    marginBottom: 40,
    textTransform: 'uppercase'
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#4A4D57',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 15,
    color: '#f9f9f9',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#00FFC4',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#101114',
    fontWeight: 'bold',
    fontSize: 16,
  },
});