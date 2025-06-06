import { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Trash2, PillBottle as Bottle, Coffee, CirclePlus as PlusCircle, CircleMinus as MinusCircle } from 'lucide-react-native';

// Waste types with their point values
const wasteTypes = [
  { id: 1, name: 'Plastic Bottles', icon: Bottle, pointsPerKg: 10, color: '#2196F3' },
  { id: 2, name: 'Glass Bottles', icon: Coffee, pointsPerKg: 8, color: '#4CAF50' },
  { id: 3, name: 'Wine Bottles', icon: Bottle, pointsPerKg: 12, color: '#9C27B0' },
  { id: 4, name: 'Other Plastics', icon: Trash2, pointsPerKg: 6, color: '#FF9800' },
];

export default function HomeScreen() {
  const [selectedWaste, setSelectedWaste] = useState<number | null>(null);
  const [weight, setWeight] = useState(1);
  const [totalPoints, setTotalPoints] = useState(0);

  const handleWasteSelect = (wasteId: number) => {
    setSelectedWaste(wasteId);
    const waste = wasteTypes.find(w => w.id === wasteId);
    if (waste) {
      setTotalPoints(waste.pointsPerKg * weight);
    }
  };

  const incrementWeight = () => {
    const newWeight = weight + 0.5;
    setWeight(newWeight);
    if (selectedWaste) {
      const waste = wasteTypes.find(w => w.id === selectedWaste);
      if (waste) {
        setTotalPoints(waste.pointsPerKg * newWeight);
      }
    }
  };

  const decrementWeight = () => {
    if (weight > 0.5) {
      const newWeight = weight - 0.5;
      setWeight(newWeight);
      if (selectedWaste) {
        const waste = wasteTypes.find(w => w.id === selectedWaste);
        if (waste) {
          setTotalPoints(waste.pointsPerKg * newWeight);
        }
      }
    }
  };

  const placeOrder = () => {
    // Navigate to confirm order screen
    router.push({
      pathname: '/(tabs)/place-order',
      params: {
        wasteId: selectedWaste,
        weight: weight,
        points: totalPoints
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.bannerContainer}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/5748730/pexels-photo-5748730.jpeg' }}
          style={styles.bannerImage}
        />
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerTitle}>Turn Waste Into Rewards</Text>
          <Text style={styles.bannerSubtitle}>100 points = ₹10</Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Select Waste Type</Text>
        <Text style={styles.sectionSubtitle}>Choose the type of waste you want to recycle</Text>

        <View style={styles.wasteTypeContainer}>
          {wasteTypes.map((waste) => {
            const WasteIcon = waste.icon;
            return (
              <TouchableOpacity
                key={waste.id}
                style={[
                  styles.wasteTypeCard,
                  selectedWaste === waste.id && { borderColor: waste.color, borderWidth: 2 }
                ]}
                onPress={() => handleWasteSelect(waste.id)}
              >
                <View style={[styles.iconContainer, { backgroundColor: waste.color + '20' }]}>
                  <WasteIcon size={32} color={waste.color} />
                </View>
                <Text style={styles.wasteTypeName}>{waste.name}</Text>
                <Text style={styles.pointsText}>{waste.pointsPerKg} points/kg</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {selectedWaste && (
        <View style={styles.weightSection}>
          <Text style={styles.sectionTitle}>Enter Weight</Text>
          <Text style={styles.sectionSubtitle}>
            Adjust the estimated weight of your waste
          </Text>

          <View style={styles.weightContainer}>
            <TouchableOpacity onPress={decrementWeight} style={styles.weightButton}>
              <MinusCircle size={24} color="#4CAF50" />
            </TouchableOpacity>
            <View style={styles.weightDisplay}>
              <Text style={styles.weightText}>{weight.toFixed(1)} kg</Text>
            </View>
            <TouchableOpacity onPress={incrementWeight} style={styles.weightButton}>
              <PlusCircle size={24} color="#4CAF50" />
            </TouchableOpacity>
          </View>

          <View style={styles.pointsContainer}>
            <Text style={styles.pointsLabel}>Estimated Points:</Text>
            <Text style={styles.pointsValue}>{totalPoints} points</Text>
            <Text style={styles.moneyValue}>≈ ₹{(totalPoints / 100 * 10).toFixed(2)}</Text>
          </View>

          <TouchableOpacity style={styles.orderButton} onPress={placeOrder}>
            <Text style={styles.orderButtonText}>Place Pickup Order</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>How It Works</Text>
        <View style={styles.infoStep}>
          <View style={styles.infoNumberCircle}>
            <Text style={styles.infoNumber}>1</Text>
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoStepTitle}>Select & Weigh</Text>
            <Text style={styles.infoStepText}>
              Choose waste type and estimate weight
            </Text>
          </View>
        </View>
        <View style={styles.infoStep}>
          <View style={styles.infoNumberCircle}>
            <Text style={styles.infoNumber}>2</Text>
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoStepTitle}>Schedule Pickup</Text>
            <Text style={styles.infoStepText}>
              Confirm your address and time slot
            </Text>
          </View>
        </View>
        <View style={styles.infoStep}>
          <View style={styles.infoNumberCircle}>
            <Text style={styles.infoNumber}>3</Text>
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoStepTitle}>Earn Points</Text>
            <Text style={styles.infoStepText}>
              Get points after successful collection
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  bannerContainer: {
    height: 180,
    position: 'relative',
    marginBottom: 16,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  bannerTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  bannerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bannerSubtitle: {
    color: 'white',
    fontSize: 16,
  },
  sectionContainer: {
    padding: 16,
    backgroundColor: 'white',
    marginBottom: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  wasteTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  wasteTypeCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  wasteTypeName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  pointsText: {
    fontSize: 12,
    color: '#666',
  },
  weightSection: {
    backgroundColor: 'white',
    marginBottom: 16,
    borderRadius: 8,
    marginHorizontal: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  weightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  weightButton: {
    padding: 8,
  },
  weightDisplay: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    minWidth: 100,
    alignItems: 'center',
  },
  weightText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  pointsContainer: {
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  pointsLabel: {
    fontSize: 14,
    color: '#388E3C',
    marginBottom: 4,
  },
  pointsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  moneyValue: {
    fontSize: 16,
    color: '#388E3C',
  },
  orderButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  orderButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 16,
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 32,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  infoStep: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  infoNumberCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoNumber: {
    color: 'white',
    fontWeight: 'bold',
  },
  infoContent: {
    flex: 1,
  },
  infoStepTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  infoStepText: {
    fontSize: 14,
    color: '#666',
  },
});