import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  StyleSheet,
  Image,
  Modal,
  Pressable
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

type ProfileData = {
  username: string;
  email: string;
  password: string; // W prawdziwej aplikacji nigdy nie przechowujemy hasła w plain text!
  profileImage: string | null;
};

export default function ProfileScreen() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData>({
    username: 'ZUCH',
    email: 'zuch@example.com',
    password: 'kosmosu',
    profileImage: null
  });
  const [showPassword, setShowPassword] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (!user) {
      router.replace('/');
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    router.replace('/');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfile({...profile, profileImage: result.assets[0].uri});
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfile({...profile, profileImage: result.assets[0].uri});
    }
  };

  const saveProfile = () => {
    // Tutaj w prawdziwej aplikacji byłaby logika zapisu do backendu
    Alert.alert('Sukces', 'Profil zaktualizowany');
    setEditMode(false);
  };

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          {profile.profileImage ? (
            <Image source={{ uri: profile.profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <MaterialIcons name="person" size={60} color="#4A4D57" />
            </View>
          )}
        </TouchableOpacity>

        <Text style={styles.username}>{profile.username}</Text>
        <Text style={styles.email}>{profile.email}</Text>
      </View>

      <View style={styles.profileInfo}>
        <View style={styles.infoItem}>
          <MaterialIcons name="person" size={24} color="#00FFC4" style={styles.infoIcon} />
          {editMode ? (
            <TextInput
              style={styles.editInput}
              value={profile.username}
              onChangeText={(text) => setProfile({...profile, username: text})}
            />
          ) : (
            <Text style={styles.infoText}>{profile.username}</Text>
          )}
        </View>

        <View style={styles.infoItem}>
          <MaterialIcons name="email" size={24} color="#00FFC4" style={styles.infoIcon} />
          {editMode ? (
            <TextInput
              style={styles.editInput}
              value={profile.email}
              onChangeText={(text) => setProfile({...profile, email: text})}
              keyboardType="email-address"
            />
          ) : (
            <Text style={styles.infoText}>{profile.email}</Text>
          )}
        </View>

        <View style={styles.infoItem}>
          <MaterialIcons name="lock" size={24} color="#00FFC4" style={styles.infoIcon} />
          {editMode ? (
            <>
              <TextInput
                style={styles.editInput}
                value={profile.password}
                onChangeText={(text) => setProfile({...profile, password: text})}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <MaterialIcons 
                  name={showPassword ? 'visibility-off' : 'visibility'} 
                  size={24} 
                  color="#00FFC4" 
                />
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.infoText}>••••••••</Text>
          )}
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        {editMode ? (
          <>
            <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
              <Text style={styles.buttonText}>Zapisz zmiany</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={() => setEditMode(false)}
            >
              <Text style={styles.cancelButtonText}>Anuluj</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity 
              style={styles.editButton} 
              onPress={() => setEditMode(true)}
            >
              <Text style={styles.buttonText}>Edytuj profil</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.logoutButton} 
              onPress={handleLogout}
            >
              <Text style={styles.logoutButtonText}>Wyloguj się</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Modal do wyboru zdjęcia profilowego */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Wybierz zdjęcie profilowe</Text>
            
            <Pressable 
              style={styles.modalOption}
              onPress={() => {
                pickImage();
                setModalVisible(false);
              }}
            >
              <MaterialIcons name="photo-library" size={24} color="#00FFC4" />
              <Text style={styles.modalOptionText}>Wybierz z galerii</Text>
            </Pressable>
            
            <Pressable 
              style={styles.modalOption}
              onPress={() => {
                takePhoto();
                setModalVisible(false);
              }}
            >
              <MaterialIcons name="camera-alt" size={24} color="#00FFC4" />
              <Text style={styles.modalOptionText}>Zrób zdjęcie</Text>
            </Pressable>
            
            <Pressable 
              style={styles.modalCancel}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCancelText}>Anuluj</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    backgroundColor: '#101114',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1C1D20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00FFC4',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#4A4D57',
  },
  profileInfo: {
    marginBottom: 30,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1C1D20',
  },
  infoIcon: {
    marginRight: 15,
  },
  infoText: {
    flex: 1,
    fontSize: 16,
    color: '#f9f9f9',
  },
  editInput: {
    flex: 1,
    fontSize: 16,
    color: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#00FFC4',
    paddingVertical: 5,
  },
  buttonsContainer: {
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#00FFC4',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#00FFC4',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  cancelButton: {
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00FFC4',
    marginBottom: 15,
  },
  logoutButton: {
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  buttonText: {
    color: '#101114',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButtonText: {
    color: '#00FFC4',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButtonText: {
    color: '#FF3B30',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#1C1D20',
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f9f9f9',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#4A4D57',
  },
  modalOptionText: {
    color: '#f9f9f9',
    fontSize: 16,
    marginLeft: 15,
  },
  modalCancel: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  modalCancelText: {
    color: '#FF3B30',
    fontWeight: 'bold',
  },
});