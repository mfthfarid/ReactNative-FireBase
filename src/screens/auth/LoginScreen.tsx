import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../firebaseConfig'; // pastikan file config Firebase sudah dibuat

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types'; // ⚠️ pastikan path ini benar sesuai struktur kamu

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      //   const auth = getAuth(app);

      //   signInWithEmailAndPassword(auth, email, password)
      //     .then(() => console.log('Login success!'))
      //     .catch(error => console.error(error));

      Alert.alert('Berhasil', 'Login sukses!');
      // Misalnya: navigation.replace('Home');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 20,
        }}
      >
        🔐 Login
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 10,
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 10,
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: '#2196f3',
          padding: 15,
          borderRadius: 10,
          marginBottom: 10,
        }}
      >
        <Text
          style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}
        >
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={{ color: '#2196f3', textAlign: 'center' }}>
          Belum punya akun? Daftar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
