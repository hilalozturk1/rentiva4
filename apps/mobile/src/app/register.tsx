import { useState } from "react";
import { ScrollView, View, TextInput, Pressable, Text, StyleSheet, Alert } from "react-native";
import { router, Link } from "expo-router";
import { apiFetch } from "../lib/api";
import { setUser } from "../lib/storage";
import { colors, radius } from "../theme";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "GUEST",
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.brand}>Rentiva</Text>
      <Text style={styles.title}>Hemen Kayıt Ol</Text>
      <Text style={styles.subtitle}>Web tarafındaki kayıt formunu mobilde yaşa.</Text>

      <View style={styles.formCard}>
        <TextInput style={styles.input} placeholder="Ad Soyad" value={form.name} onChangeText={(v) => setForm({ ...form, name: v })} />
        <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" value={form.email} onChangeText={(v) => setForm({ ...form, email: v })} />
        <TextInput style={styles.input} placeholder="Telefon" value={form.phone} onChangeText={(v) => setForm({ ...form, phone: v })} />
        <TextInput style={styles.input} placeholder="Şifre" secureTextEntry value={form.password} onChangeText={(v) => setForm({ ...form, password: v })} />

        <Pressable style={styles.button} onPress={submit}>
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Zaten hesabın var mı?</Text>
        <Link href="/login" asChild>
          <Pressable>
            <Text style={styles.linkText}>Giriş Yap</Text>
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
