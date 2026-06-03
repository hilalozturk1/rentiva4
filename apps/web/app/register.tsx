import { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { apiFetch } from '../src/api';
import { setUser } from '../src/storage';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'GUEST',
  });

  async function submit() {
    try {
      const data = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(form),
      });

      setUser(data.user);
      router.push('/cars');
    } catch (e: any) {
      Alert.alert('Hata', e.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>

      <TextInput style={styles.input} placeholder="Ad Soyad" onChangeText={(v) => setForm({ ...form, name: v })} />
      <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(v) => setForm({ ...form, email: v })} />
      <TextInput style={styles.input} placeholder="Telefon" onChangeText={(v) => setForm({ ...form, phone: v })} />
      <TextInput style={styles.input} placeholder="Şifre" secureTextEntry onChangeText={(v) => setForm({ ...form, password: v })} />

      <Pressable style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>Kayıt Ol</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: '800', marginBottom: 24 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 14, borderRadius: 12, marginBottom: 12 },
  button: { backgroundColor: '#111', padding: 16, borderRadius: 12 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '700' },
});