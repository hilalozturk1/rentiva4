import { useEffect, useState } from "react";
import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { apiFetch } from "../lib/api";
import { colors, radius } from "../theme";

export default function Cars() {
  const [cars, setCars] = useState<any[]>([]);

  useEffect(() => {
    apiFetch("/cars").then(setCars).catch(console.error);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Araçlar</Text>
      <Text style={styles.sub}>Web sitesindeki araç listesi şimdi mobilde.</Text>

      {cars.map((item) => (
        <Link key={item.id} href={`/car-detail?id=${item.id}`} asChild>
          <Pressable style={styles.card}>
            <View style={styles.image} />
            <Text style={styles.car}>{item.brand} {item.model}</Text>
            <Text style={styles.location}>{item.city} / {item.district}</Text>

            <View style={styles.statsRow}>
              <Text style={styles.price}>{item.dailyPrice} TL/gün</Text>
              <View style={styles.tag}>
                <Text style={styles.tagText}>{item.isActive ? "Aktif" : "Pasif"}</Text>
              </View>
            </View>

            <Text style={styles.deposit}>Depozito: {item.deposit} TL</Text>
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: colors.bg, paddingBottom: 40 },
  title: { fontSize: 32, fontWeight: "900", color: colors.black, marginBottom: 6 },
  sub: { color: colors.gray, marginBottom: 20 },
  card: { backgroundColor: "white", borderRadius: radius.lg, padding: 18, marginBottom: 18, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 18, elevation: 3 },
  image: { height: 180, borderRadius: 24, backgroundColor: "#F3F4F6", marginBottom: 18 },
  car: { fontSize: 20, fontWeight: "900", color: colors.black },
  location: { color: colors.gray, marginTop: 6, marginBottom: 14 },
  statsRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  price: { fontSize: 18, fontWeight: "900", color: colors.black },
  tag: { backgroundColor: "#DCFCE7", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 },
  tagText: { color: "#166534", fontWeight: "900", fontSize: 12 },
  deposit: { color: colors.gray },
});
