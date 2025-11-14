import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';

// Ganti import dari firebase/firestore ke @react-native-firebase/firestore
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from '@react-native-firebase/firestore';

export default function FirestoreExample() {
  const [name, setName] = useState('');
  const [items, setItems] = useState<{ id: string; name: string }[]>([]);

  const addItem = async () => {
    if (!name.trim()) return;

    const db = getFirestore();
    await addDoc(collection(db, 'items'), { name }); // Ganti 'users' ke 'items'
    setName('');
    fetchItems();
  };

  const fetchItems = async () => {
    const db = getFirestore();
    const snapshot = await getDocs(collection(db, 'items')); // Ganti 'users' ke 'items'
    const list = snapshot.docs.map((doc: { id: any; data: () => any }) => ({
      id: doc.id,
      ...doc.data(),
    })) as { id: string; name: string }[];
    setItems(list);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nama Item"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Button title="Tambah Item" onPress={addItem} />
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
});
