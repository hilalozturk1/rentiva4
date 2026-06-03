import { useState } from "react";
import { View, Text, Pressable, StyleSheet, TextInput, Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { apiFetch } from "../lib/api";
import { colors } from "../theme";

export default function Inspection() {
  const { bookingId } = useLocalSearchParams();
  const [note, setNote] = useState("");

  async function submit() {
    try {
      await apiFetch("/inspections", {
        method: "POST",
        body: JSON.stringify({
          bookingId,
          type: "PICKUP",
          images: [],
          note,
        }),
      });

      Alert.alert("Başarılı", "Dijital teslimat kaydı oluşturuldu");
      router.push("/cars");
    } catch (err: any) {
      Alert.alert("Hata", err.message || "Gönderilemedi.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dijital Teslimat</Text>
      <Text style={styles.sub}>
        Aracın 4 yönünden fotoğraflarını ekleyerek teslimat sürecini başlat.
      </Text>

      <View style={styles.grid}>
        {["Ön", "Arka", "Sol", "Sağ"].map((item) => (
          <Pressable key={item} style={styles.photo}>
            <Text style={styles.photoText}>{item} Fotoğraf</Text>
          </Pressable>
        ))}
      </View>

      <TextInput
        placeholder="Teslimat notu"
        value={note}
        onChangeText={setNote}
        style={styles.input}
        multiline
      />

      <Pressable style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>Teslimatı Kaydet</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 20 },
  title: { fontSize: 32, fontWeight: "900", color: colors.black },
  sub: { color: colors.gray, marginTop: 8, lineHeight: 22 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: 24 },
  photo: { width: "48%", height: 130, backgroundColor: "white", borderRadius: 20, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.border, marginBottom: 14 },
  photoText: { fontWeight: "800", color: colors.gray },
  input: { backgroundColor: "white", borderRadius: 18, padding: 16, marginTop: 20, minHeight: 100 },
  button: { backgroundColor: colors.black, padding: 18, borderRadius: 18, marginTop: 20 },
  buttonText: { color: "white", textAlign: "center", fontWeight: "900" },
});
