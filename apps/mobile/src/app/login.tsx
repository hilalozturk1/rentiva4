import { useState } from "react";
import { ScrollView, View, TextInput, Pressable, Text, StyleSheet, Alert } from "react-native";
import { router, Link } from "expo-router";
import { apiFetch } from "../lib/api";
import { setUser } from "../lib/storage";
import { colors, radius } from "../theme";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit() {
    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      setUser(data.user);
      router.push('/cars');
    } catch (err: any) {
      Alert.alert('Hata', err.message);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.brand}>Rentiva</Text>
      <Text style={styles.title}>Giriş Yap</Text>
      <Text style={styles.subtitle}>Web sitesindeki kullanıcı girişini mobilde yap.</Text>

      <View style={styles.formCard}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Şifre"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Pressable style={styles.button} onPress={submit}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Henüz hesabın yok mu?</Text>
        <Link href="/register" asChild>
          <Pressable>
            <Text style={styles.linkText}>Kayıt Ol</Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: colors.bg, minHeight: '100%' },
  brand: { color: colors.yellow, fontWeight: '900', letterSpacing: 2, marginBottom: 8 },
  title: { fontSize: 34, fontWeight: '900', color: colors.black, marginBottom: 8 },
  subtitle: { color: colors.gray, marginBottom: 24, lineHeight: 22 },
  formCard: { backgroundColor: 'white', borderRadius: radius.lg, padding: 22, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 18, elevation: 3 },
  input: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 14, padding: 16, marginBottom: 14 },
  button: { backgroundColor: colors.black, padding: 16, borderRadius: 14, marginTop: 6 },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: '900' },
  footer: { marginTop: 24, flexDirection: 'row', justifyContent: 'center' },
  footerText: { color: colors.gray, marginRight: 6 },
  linkText: { color: colors.black, fontWeight: '900' },
});
