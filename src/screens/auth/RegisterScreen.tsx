import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Peringatan', 'Semua kolom wajib diisi!');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Peringatan', 'Password dan konfirmasi tidak cocok!');
      return;
    }

    try {
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('Berhasil', 'Akun berhasil dibuat!');
      navigation.replace('Login'); // balik ke login
    } catch (error: any) {
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
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 20,
        }}
      >
        📝 Daftar Akun
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
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Konfirmasi Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 10,
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        onPress={handleRegister}
        style={{
          backgroundColor: '#4CAF50',
          padding: 15,
          borderRadius: 10,
          marginBottom: 10,
        }}
      >
        <Text
          style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}
        >
          Daftar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{ color: '#2196f3', textAlign: 'center' }}>
          Sudah punya akun? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
