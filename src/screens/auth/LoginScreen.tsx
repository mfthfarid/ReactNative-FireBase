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
// import auth from '@react-native-firebase/auth';
import {
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Peringatan', 'Email dan password wajib diisi!');
      return;
    }

    try {
      // await auth().signInWithEmailAndPassword(email, password);
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);

      Alert.alert('Berhasil', 'Login sukses!');
      navigation.replace('Home'); // Navigasi ke HomeScreen
    } catch (error: any) {
      let message = 'Terjadi kesalahan.';
      if (error.code === 'auth/user-not-found') {
        message = 'Email tidak ditemukan.';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Password salah.';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Format email tidak valid.';
      }
      Alert.alert('Error', message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Login</Text>

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

      <TouchableOpacity
        onPress={handleLogin}
        style={styles.loginButton}
        activeOpacity={0.8}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        activeOpacity={0.7}
      >
        <Text style={styles.registerLink}>
          Belum punya akun? <Text style={styles.registerLinkBold}>Daftar</Text>
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
  loginButton: {
    backgroundColor: '#2196f3',
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
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerLink: {
    color: '#666',
    textAlign: 'center',
    fontSize: 14,
  },
  registerLinkBold: {
    color: '#2196f3',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
