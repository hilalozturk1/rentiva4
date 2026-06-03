import { useEffect, useState } from "react";
import { ScrollView, View, Text, Pressable, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { apiFetch } from "../../lib/api";
import { colors, radius } from "../../theme";

export default function CarDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    apiFetch(`/cars/${id}`)
      .then(setCar)
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Hata: {error}</Text>
      </View>
    );
  }

  if (!car) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Araç bulunamadı</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.heroCard} />
      <Text style={styles.title}>{car.brand} {car.model}</Text>
      <Text style={styles.location}>{car.city} / {car.district}</Text>

      <View style={styles.statsRow}>
        <View>
          <Text style={styles.label}>Günlük Fiyat</Text>
          <Text style={styles.value}>{car.dailyPrice} TL</Text>
        </View>
        <View>
          <Text style={styles.label}>Depozito</Text>
          <Text style={styles.value}>{car.deposit} TL</Text>
        </View>
      </View>

      <View style={styles.metaGrid}>
        <View style={styles.metaCard}>
          <Text style={styles.metaTitle}>Yıl</Text>
          <Text style={styles.metaValue}>{car.year}</Text>
        </View>
        <View style={styles.metaCard}>
          <Text style={styles.metaTitle}>Şehir</Text>
          <Text style={styles.metaValue}>{car.city}</Text>
        </View>
      </View>

      <View style={styles.aboutCard}>
        <Text style={styles.sectionTitle}>Araç Bilgileri</Text>
        <Text style={styles.aboutText}>Kiralama sürecinde KYC onaylı, sigorta destekli ve dijital teslimatlı bir deneyim sağlar.</Text>
        <Text style={styles.aboutText}>Model: {car.model}</Text>
        <Text style={styles.aboutText}>Plaka: {car.plate}</Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => {
          if (!id) {
            Alert.alert("Geçersiz araç", "Lütfen tekrar deneyin.");
            return;
          }
          router.push(`/inspection?bookingId=${id}`);
        }}
      >
        <Text style={styles.buttonText}>Rezervasyon Yap</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: colors.bg, paddingBottom: 40 },
  heroCard: { height: 260, borderRadius: 28, backgroundColor: "#F3F4F6", marginBottom: 24 },
  title: { fontSize: 30, fontWeight: "900", color: colors.black, marginBottom: 6 },
  location: { color: colors.gray, marginBottom: 18 },
  statsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  label: { color: colors.gray, marginBottom: 6 },
  value: { fontSize: 22, fontWeight: "900", color: colors.black },
  metaGrid: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  metaCard: { flex: 1, backgroundColor: "white", borderRadius: radius.md, padding: 18, marginRight: 10, shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 16, elevation: 2 },
  metaTitle: { color: colors.gray, marginBottom: 8 },
  metaValue: { fontSize: 18, fontWeight: "900", color: colors.black },
  aboutCard: { backgroundColor: "white", borderRadius: radius.lg, padding: 20, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 18, elevation: 3, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: "900", marginBottom: 10 },
  aboutText: { color: colors.gray, lineHeight: 22, marginBottom: 8 },
  button: { backgroundColor: colors.black, padding: 18, borderRadius: radius.lg },
  buttonText: { color: "white", textAlign: "center", fontWeight: "900" },
  error: { fontSize: 16, color: "#b91c1c" },
});
