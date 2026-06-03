import { useEffect, useState } from "react";
import { ScrollView, View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { apiFetch } from "../lib/api";
import { getUser } from "../lib/storage";
import { colors, radius } from "../theme";

export default function CarDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [car, setCar] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    apiFetch(`/cars/${id}`).then(setCar).catch(console.error);
  }, [id]);

  async function book() {
    const user = getUser();

    if (!user?.id) {
      Alert.alert("Uyarı", "Önce giriş yapmalısın");
      return;
    }

    const booking = await apiFetch("/bookings", {
      method: "POST",
      body: JSON.stringify({
        guestId: user.id,
        carId: car.id,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 86400000).toISOString(),
      }),
    });

    Alert.alert("Başarılı", "Rezervasyon oluşturuldu");
    router.push(`/inspection?bookingId=${booking.id}`);
  }

  if (!car) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{car.brand} {car.model}</Text>
      <Text style={styles.subtitle}>{car.city} / {car.district}</Text>

      <View style={styles.previewCard} />

      <View style={styles.infoGroup}>
        <Text style={styles.infoLabel}>Günlük Fiyat</Text>
        <Text style={styles.infoValue}>{car.dailyPrice} TL</Text>
      </View>

      <View style={styles.infoGroup}>
        <Text style={styles.infoLabel}>Depozito</Text>
        <Text style={styles.infoValue}>{car.deposit} TL</Text>
      </View>

      <View style={styles.infoGroup}>
        <Text style={styles.infoLabel}>Konum</Text>
        <Text style={styles.infoValue}>{car.city} / {car.district}</Text>
      </View>

      <Pressable style={styles.button} onPress={book}>
        <Text style={styles.buttonText}>Rezervasyon Yap</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: colors.bg, paddingBottom: 40 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24, backgroundColor: colors.bg },
  loadingText: { color: colors.gray, fontSize: 16 },
  title: { fontSize: 34, fontWeight: "900", color: colors.black, marginBottom: 6 },
  subtitle: { color: colors.gray, marginBottom: 20 },
  previewCard: { height: 220, borderRadius: 28, backgroundColor: "#F3F4F6", marginBottom: 24 },
  infoGroup: { backgroundColor: "white", padding: 18, borderRadius: radius.lg, marginBottom: 16, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 14, elevation: 2 },
  infoLabel: { color: colors.gray, marginBottom: 6 },
  infoValue: { fontWeight: "900", color: colors.black },
  button: { backgroundColor: colors.black, padding: 18, borderRadius: 18, marginTop: 16 },
  buttonText: { color: "white", textAlign: "center", fontWeight: "900", fontSize: 16 },
});
