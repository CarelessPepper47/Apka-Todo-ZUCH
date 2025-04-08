import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  StyleSheet,
  FlatList
} from 'react-native';
import { useUser } from '../context/UserContext';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

type TodoItem = {
  id: string;
  text: string;
  completed: boolean;
};

const STORAGE_KEY = '@todos_data';

export default function TodoScreen() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    if (user === 'ZUCH') {
        loadTodos();
    }
  }, [user]);

  useEffect(() => {
    if (user === 'ZUCH') {
        saveTodos();
    }
  }, [todos]);

  const handleLogout = () => {
    setUser(null);
    router.replace('/');
  };

  const loadTodos = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (jsonValue !== null) {
            setTodos(JSON.parse(jsonValue));
        }
    } catch (e) {
        Alert.alert('Błąd', 'Nie udało się wczytać zapisanych zadań')
        console.error('Błąd wczytywania', e);
    }
  }

  const saveTodos = async () => {
    try {
        const jsonValue = JSON.stringify(todos);
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
        Alert.alert('Błąd', 'Nie udało się zapisać zadań');
        console.error('Błąd zapisywania', e);
    }
  }

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: newTodo,
          completed: false
        }
      ]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  if (user !== 'ZUCH') {
    return (
      <View style={styles.accessDeniedContainer}>
        <Text style={styles.accessDeniedText}>Brak dostępu. Zaloguj się jako ZUCH.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableOpacity onPress={handleLogout}>
                <Text style={{ color: '#00FFC4', fontWeight: 'bold', fontSize: 16 }}>Log Out</Text>
            </TouchableOpacity>
        </View>     
      <Text style={styles.header}>ToDo List</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="make a todo"
          placeholderTextColor="#4A4D57"
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={addTodo}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity onPress={() => toggleTodo(item.id)}>
              <MaterialIcons
                name={item.completed ? 'check-box' : 'check-box-outline-blank'}
                size={24}
                color={item.completed ? '#00FFC4' : '#4A4D57'}
              />
            </TouchableOpacity>
            
            <Text 
              style={[
                styles.todoText,
                item.completed && styles.completedTodo
              ]}
            >
              {item.text}
            </Text>
            
            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <MaterialIcons
                name="delete"
                size={24}
                color="#4A4D57"
              />
            </TouchableOpacity>
          </View>
        )}
        style={styles.todoList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  accessDeniedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red'
  },
  accessDeniedText: {
    color: 'white',
    fontSize: 18
  },
  container: {
    marginTop: 50,
    flex: 1,
    padding: 20,
    backgroundColor: '#101114'
  },
  header: {
    marginTop: 50,
    marginBottom: 20,
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    color: '#00FFC4',
    textTransform: 'uppercase'
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 20
  },
  input: {
    padding: 15,
    paddingRight: 100,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#4A4D57',
    borderRadius: 25,
    color: '#f9f9f9',
    fontSize: 16
  },
  addButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    paddingHorizontal: 25,
    backgroundColor: '#00FFC4',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addButtonText: {
    color: '#101114',
    fontWeight: '600',
    fontSize: 16
  },
  todoList: {
    flex: 1
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1C1D20'
  },
  todoText: {
    flex: 1,
    marginLeft: 15,
    color: '#f9f9f9',
    fontSize: 16
  },
  completedTodo: {
    textDecorationLine: 'line-through',
    color: '#4A4D57'
  }
});