import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function HomeScreen() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const handleLogin = () => {
    if (username === "WSP0Lpraca" && password === "j4zd4Z7ema7em") {
      setResult("ZUCH");
    } else {
      setResult("DUPA");
    }
  };

  return (
    <View style={styles.container}>
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

      <Button title="Zaloguj się" onPress={handleLogin} />

      {result !== "" && <Text style={styles.result}>{result}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
  result: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});