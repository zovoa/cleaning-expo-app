import { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

export default function Index() {
  useEffect(() => {
    // Simulate checking if user is logged in
    const checkAuth = setTimeout(() => {
      // Redirect to login
      router.replace('/(auth)/login');
    }, 2000);

    return () => clearTimeout(checkAuth);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EcoCollect</Text>
      <Text style={styles.subtitle}>Waste Management & Rewards</Text>
      <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
  },
  loader: {
    marginTop: 20,
  },
});