import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { apiFetch } from '../../lib/api';

export default function CarDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
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
    <View style={styles.container}>
      <Text style={styles.title}>{car.brand} {car.model}</Text>
      <Text style={styles.detail}>Plaka: {car.plate}</Text>
      <Text style={styles.detail}>Konum: {car.city} / {car.district}</Text>
      <Text style={styles.detail}>Günlük: {car.dailyPrice} TL</Text>
      <Text style={styles.detail}>Depozito: {car.deposit} TL</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: '800', marginBottom: 16 },
  detail: { fontSize: 16, marginBottom: 12 },
  error: { fontSize: 16, color: '#b91c1c' },
});
