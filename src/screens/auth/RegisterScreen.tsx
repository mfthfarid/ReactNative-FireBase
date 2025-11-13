import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';

// Gunakan dari @react-native-firebase
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { getFirestore, doc, setDoc } from '@react-native-firebase/firestore';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword || !name || !age) {
      Alert.alert('Peringatan', 'Semua kolom wajib diisi!');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Peringatan', 'Password dan konfirmasi tidak cocok!');
      return;
    }

    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum <= 0) {
      Alert.alert('Peringatan', 'Umur harus berupa angka positif.');
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      // Gunakan modular API untuk firestore
      const db = getFirestore();
      await setDoc(doc(db, 'users', user.uid), {
        email: email,
        name: name,
        age: ageNum,
        createdAt: new Date(),
      });

      Alert.alert('Berhasil', 'Akun berhasil dibuat!');
      navigation.replace('Login');
    } catch (error: any) {
      console.error('Register Error:', error);
      let message = 'Terjadi kesalahan.';

      if (error.code === 'auth/email-already-in-use') {
        message = 'Email sudah terdaftar.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Format email tidak valid.';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password terlalu lemah.';
      }

      Alert.alert('Error', message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Daftar Akun</Text>

      <TextInput
        placeholder="Nama Lengkap"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Umur"
        placeholderTextColor="#999"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        placeholder="Konfirmasi Password"
        placeholderTextColor="#999"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity
        onPress={handleRegister}
        style={styles.registerButton}
        activeOpacity={0.8}
      >
        <Text style={styles.registerButtonText}>Daftar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        activeOpacity={0.7}
      >
        <Text style={styles.loginLink}>
          Sudah punya akun? <Text style={styles.loginLinkBold}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  registerButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginLink: {
    color: '#666',
    textAlign: 'center',
    fontSize: 14,
  },
  loginLinkBold: {
    color: '#2196f3',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
