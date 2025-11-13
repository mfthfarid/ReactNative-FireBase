import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
import { getAuth } from '@react-native-firebase/auth';
import { getFirestore, doc, getDoc } from '@react-native-firebase/firestore';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

interface UserData {
  name: string;
  email: string;
  age: number;
  createdAt: any; // Firestore timestamp
}

const HomeScreen = ({ navigation }: Props) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      //   const currentUser = auth().currentUser;
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.log('No user is signed in.');
        setLoading(false);
        return;
      }

      try {
        // const userDoc = await firestore()
        //   .collection('users')
        //   .doc(currentUser.uid)
        //   .get();
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));

        if (userDoc.exists()) {
          const data = userDoc.data() as UserData;
          setUserData(data);
        } else {
          console.log('No user data found in Firestore.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

    // Cleanup listener jika perlu
    return () => {};
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2196f3" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.center}>
        <Text>Data user tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Dashboard</Text>
      <Text>Nama: {userData.name}</Text>
      <Text>Email: {userData.email}</Text>
      <Text>Umur: {userData.age}</Text>
      <Text>
        Terdaftar:{' '}
        {userData.createdAt?.toDate
          ? userData.createdAt.toDate().toLocaleDateString()
          : 'N/A'}
      </Text>

      <TouchableOpacity
        onPress={() => {
          //   auth().signOut();
          getAuth().signOut();
          navigation.replace('Login');
        }}
        style={styles.logoutButton}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
