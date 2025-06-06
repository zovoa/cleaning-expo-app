import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Switch } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { MapPin, Calendar, Clock, Info } from 'lucide-react-native';

// Mock user data
const userData = {
  name: 'John Doe',
  phone: '+91 9876543210',
  address: '123 Green Street, Eco Garden, Mumbai 400001',
};

// Waste types mapping
const wasteTypesMap = {
  1: { name: 'Plastic Bottles', pointsPerKg: 10 },
  2: { name: 'Glass Bottles', pointsPerKg: 8 },
  3: { name: 'Wine Bottles', pointsPerKg: 12 },
  4: { name: 'Other Plastics', pointsPerKg: 6 },
};

export default function PlaceOrderScreen() {
  const params = useLocalSearchParams();
  const wasteId = Number(params.wasteId);
  const weight = Number(params.weight);
  const points = Number(params.points);

  const [address, setAddress] = useState(userData.address);
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Set today's date + 1 day as default
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow.toISOString().split('T')[0]);
    setTimeSlot('Morning (9AM - 12PM)');
  }, []);

  const handleSubmit = () => {
    setIsLoading(true);
    
    // Simulate order submission
    setTimeout(() => {
      setIsLoading(false);
      router.push({
        pathname: '/(tabs)/orders',
        params: { newOrder: 'true' }
      });
    }, 1500);
  };

  const wasteType = wasteTypesMap[wasteId as keyof typeof wasteTypesMap];

  if (!wasteType) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Invalid waste type selected</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Confirm Pickup Details</Text>
        <Text style={styles.headerSubtitle}>Review and confirm your waste pickup order</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Waste Summary</Text>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Waste Type:</Text>
          <Text style={styles.summaryValue}>{wasteType.name}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Weight:</Text>
          <Text style={styles.summaryValue}>{weight.toFixed(1)} kg</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Points:</Text>
          <Text style={[styles.summaryValue, styles.pointsValue]}>{points} points (≈ ₹{(points / 100 * 10).toFixed(2)})</Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Pickup Address</Text>
        <View style={styles.locationSwitchContainer}>
          <Text style={styles.switchLabel}>Use Current Location</Text>
          <Switch
            value={useCurrentLocation}
            onValueChange={setUseCurrentLocation}
            trackColor={{ false: '#E0E0E0', true: '#A5D6A7' }}
            thumbColor={useCurrentLocation ? '#4CAF50' : '#F5F5F5'}
          />
        </View>
        
        <View style={styles.addressContainer}>
          <MapPin size={18} color="#666" style={styles.addressIcon} />
          <TextInput
            style={styles.addressInput}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter pickup address"
            multiline
            numberOfLines={3}
            editable={!useCurrentLocation}
          />
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Pickup Schedule</Text>
        
        <View style={styles.fieldContainer}>
          <View style={styles.fieldIcon}>
            <Calendar size={18} color="#666" />
          </View>
          <View style={styles.fieldContent}>
            <Text style={styles.fieldLabel}>Pickup Date</Text>
            <TextInput
              style={styles.fieldInput}
              value={date}
              onChangeText={setDate}
              placeholder="YYYY-MM-DD"
            />
          </View>
        </View>
        
        <View style={styles.fieldContainer}>
          <View style={styles.fieldIcon}>
            <Clock size={18} color="#666" />
          </View>
          <View style={styles.fieldContent}>
            <Text style={styles.fieldLabel}>Preferred Time Slot</Text>
            <View style={styles.timeSlotContainer}>
              {['Morning (9AM - 12PM)', 'Afternoon (1PM - 4PM)', 'Evening (5PM - 8PM)'].map((slot) => (
                <TouchableOpacity
                  key={slot}
                  style={[
                    styles.timeSlotButton,
                    timeSlot === slot && styles.timeSlotButtonActive
                  ]}
                  onPress={() => setTimeSlot(slot)}
                >
                  <Text
                    style={[
                      styles.timeSlotText,
                      timeSlot === slot && styles.timeSlotTextActive
                    ]}
                  >
                    {slot}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>

      <View style={styles.noteContainer}>
        <Info size={18} color="#666" style={styles.noteIcon} />
        <Text style={styles.noteText}>
          Our pickup team will contact you 30 minutes before arrival. Please ensure someone is available to hand over the waste.
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        <Text style={styles.submitButtonText}>
          {isLoading ? 'Placing Order...' : 'Confirm Pickup Order'}
        </Text>
      </TouchableOpacity>

      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          By confirming, you agree to have the waste ready for collection at the specified time and location.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    padding: 16,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  sectionContainer: {
    backgroundColor: 'white',
    margin: 16,
    marginBottom: 8,
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  pointsValue: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  locationSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
  },
  addressIcon: {
    marginTop: 4,
    marginRight: 8,
  },
  addressInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    minHeight: 60,
  },
  fieldContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  fieldIcon: {
    marginRight: 12,
    marginTop: 4,
  },
  fieldContent: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  fieldInput: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  timeSlotContainer: {
    flexDirection: 'column',
  },
  timeSlotButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    marginBottom: 8,
  },
  timeSlotButtonActive: {
    backgroundColor: '#E8F5E9',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#666',
  },
  timeSlotTextActive: {
    fontWeight: '500',
    color: '#4CAF50',
  },
  noteContainer: {
    backgroundColor: '#FFF8E1',
    margin: 16,
    marginBottom: 8,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  noteIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  noteText: {
    flex: 1,
    fontSize: 14,
    color: '#FF8F00',
    lineHeight: 20,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    margin: 16,
    marginBottom: 8,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#A5D6A7',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disclaimer: {
    margin: 16,
    marginTop: 8,
    marginBottom: 32,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#4CAF50',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});