import { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { apiFetch } from '../src/api';
import { setUser } from '../src/storage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit() {
    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      setUser(data.user);
      router.push('/cars');
    } catch (e: any) {
      Alert.alert('Hata', e.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş Yap</Text>

      <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Şifre" secureTextEntry value={password} onChangeText={setPassword} />

      <Pressable style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
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