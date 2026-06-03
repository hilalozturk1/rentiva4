import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { colors, radius } from "../theme";

const features = [
  ["KYC", "Kimlik ve ehliyet doğrulama"],
  ["Sigorta", "Kiralama süreci boyunca güvence"],
  ["Provizyon", "Segment bazlı depozito blokesi"],
  ["Teslimat", "Mobil fotoğraflı dijital tutanak"],
] as const;

export default function Home() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.heroCard}>
        <Text style={styles.badge}>P2P ARAÇ PAYLAŞIMI</Text>
        <Text style={styles.heroTitle}>Aracını kiraya ver, yakınındaki aracı güvenle kirala.</Text>
        <Text style={styles.heroText}>
          Rentiva; KYC, dijital teslimat, depozito provizyonu ve araç hasar kayıtlarıyla güvenli araç paylaşımı sağlar.
        </Text>

        <View style={styles.buttonRow}>
          <Link href="/cars" asChild>
            <Pressable style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Araç Kirala</Text>
            </Pressable>
          </Link>

          <Link href="/register" asChild>
            <Pressable style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Aracımı Listele</Text>
            </Pressable>
          </Link>
        </View>
      </View>

      <View style={styles.featureGrid}>
        {features.map(([title, description]) => (
          <View key={title} style={styles.featureCard}>
            <Text style={styles.featureTitle}>{title}</Text>
            <Text style={styles.featureText}>{description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.showcaseCardOuter}>
        <View style={styles.showcaseCardInner}>
          <View style={styles.showcaseImage} />
          <Text style={styles.showcaseTitle}>BMW 3.20i</Text>
          <Text style={styles.showcaseSubtitle}>İstanbul / Kadıköy</Text>
          <View style={styles.showcaseFooter}>
            <Text style={styles.showcasePrice}>2.450 TL/gün</Text>
            <View style={styles.badgePill}>
              <Text style={styles.badgePillText}>KYC Onaylı</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, backgroundColor: colors.bg, paddingBottom: 40 },
  heroCard: { backgroundColor: colors.black, borderRadius: radius.lg, padding: 24, marginBottom: 24 },
  badge: { color: colors.yellow, fontWeight: "900", letterSpacing: 2, marginBottom: 14 },
  heroTitle: { color: "white", fontSize: 32, fontWeight: "900", lineHeight: 40, marginBottom: 16 },
  heroText: { color: "#D4D4D8", fontSize: 16, lineHeight: 24, marginBottom: 24 },
  buttonRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  primaryButton: { backgroundColor: colors.yellow, paddingVertical: 16, paddingHorizontal: 22, borderRadius: 16, flex: 1, minWidth: 140, marginRight: 12 },
  primaryButtonText: { color: colors.black, textAlign: "center", fontWeight: "900" },
  secondaryButton: { borderWidth: 1, borderColor: "rgba(255,255,255,0.35)", paddingVertical: 16, paddingHorizontal: 22, borderRadius: 16, flex: 1, minWidth: 140 },
  secondaryButtonText: { color: "white", textAlign: "center", fontWeight: "900" },
  featureGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  featureCard: { width: "48%", backgroundColor: "white", borderRadius: radius.md, padding: 18, marginBottom: 16, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 20, elevation: 2 },
  featureTitle: { fontSize: 18, fontWeight: "900", color: colors.black },
  featureText: { color: colors.gray, marginTop: 8, lineHeight: 20 },
  showcaseCardOuter: { marginTop: 8 },
  showcaseCardInner: { borderRadius: 36, backgroundColor: colors.yellow, padding: 20 },
  showcaseImage: { height: 180, borderRadius: 28, backgroundColor: "#F3F4F6", marginBottom: 18 },
  showcaseTitle: { fontSize: 24, fontWeight: "900", color: colors.black },
  showcaseSubtitle: { color: colors.gray, marginTop: 4 },
  showcaseFooter: { marginTop: 18, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  showcasePrice: { fontSize: 20, fontWeight: "900" },
  badgePill: { backgroundColor: "#DCFCE7", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999 },
  badgePillText: { color: "#166534", fontWeight: "900", fontSize: 12 },
});
