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
import { useRouter } from 'expo-router';



export default function SignIn() {
  const { setUser } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const router = useRouter();

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
      <Text style={styles.header}>Sign Up</Text>
      
      <View style={styles.inputContainer}>
        <MaterialIcons name="person" size={20} color="#4A4D57" style={styles.icon} />
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
        <MaterialIcons name="lock" size={20} color="#4A4D57" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#4A4D57"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="lock-outline" size={20} color="#4A4D57" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
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
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace('/')}>
        <Text style={{ color: '#00FFC4', marginTop: 20, textAlign: 'center' }}>
          I already have an account
        </Text>
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