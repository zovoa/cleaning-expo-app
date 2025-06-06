import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Switch, TouchableOpacity, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { User, Mail, Phone, MapPin, Bell, LogOut } from 'lucide-react-native';

// Mock user data
const userData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+91 9876543210',
  address: '123 Green Street, Eco Garden, Mumbai 400001',
};

export default function ProfileScreen() {
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [phone, setPhone] = useState(userData.phone);
  const [address, setAddress] = useState(userData.address);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const handleLogout = () => {
    router.replace('/(auth)/login');
  };

  const toggleEdit = () => {
    if (isEditing) {
      // Save changes logic would go here
    }
    setIsEditing(!isEditing);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }}
            style={styles.profileImage}
          />
          {isEditing && (
            <TouchableOpacity style={styles.changePhotoButton}>
              <Text style={styles.changePhotoText}>Change</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.profilePoints}>
          <Text style={styles.pointsHighlight}>210</Text> points collected
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <TouchableOpacity onPress={toggleEdit}>
            <Text style={styles.editButton}>{isEditing ? 'Save' : 'Edit'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.fieldContainer}>
          <View style={styles.fieldIcon}>
            <User size={18} color="#666" />
          </View>
          <View style={styles.fieldContent}>
            <Text style={styles.fieldLabel}>Full Name</Text>
            <TextInput
              style={[styles.fieldInput, !isEditing && styles.fieldInputDisabled]}
              value={name}
              onChangeText={setName}
              editable={isEditing}
            />
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <View style={styles.fieldIcon}>
            <Mail size={18} color="#666" />
          </View>
          <View style={styles.fieldContent}>
            <Text style={styles.fieldLabel}>Email</Text>
            <TextInput
              style={[styles.fieldInput, !isEditing && styles.fieldInputDisabled]}
              value={email}
              onChangeText={setEmail}
              editable={isEditing}
              keyboardType="email-address"
            />
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <View style={styles.fieldIcon}>
            <Phone size={18} color="#666" />
          </View>
          <View style={styles.fieldContent}>
            <Text style={styles.fieldLabel}>Phone</Text>
            <TextInput
              style={[styles.fieldInput, !isEditing && styles.fieldInputDisabled]}
              value={phone}
              onChangeText={setPhone}
              editable={isEditing}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <View style={styles.fieldIcon}>
            <MapPin size={18} color="#666" />
          </View>
          <View style={styles.fieldContent}>
            <Text style={styles.fieldLabel}>Address</Text>
            <TextInput
              style={[styles.fieldInput, !isEditing && styles.fieldInputDisabled, styles.addressInput]}
              value={address}
              onChangeText={setAddress}
              editable={isEditing}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        <View style={styles.preferenceItem}>
          <View style={styles.preferenceLeft}>
            <Bell size={18} color="#666" />
            <Text style={styles.preferenceText}>Push Notifications</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#E0E0E0', true: '#A5D6A7' }}
            thumbColor={notificationsEnabled ? '#4CAF50' : '#F5F5F5'}
          />
        </View>

        <View style={styles.preferenceItem}>
          <View style={styles.preferenceLeft}>
            <MapPin size={18} color="#666" />
            <Text style={styles.preferenceText}>Location Services</Text>
          </View>
          <Switch
            value={locationEnabled}
            onValueChange={setLocationEnabled}
            trackColor={{ false: '#E0E0E0', true: '#A5D6A7' }}
            thumbColor={locationEnabled ? '#4CAF50' : '#F5F5F5'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={18} color="#F44336" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>EcoCollect v1.0</Text>
        <TouchableOpacity>
          <Text style={styles.footerLink}>Terms & Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
  },
  changePhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  changePhotoText: {
    color: 'white',
    fontSize: 12,
  },
  profileName: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profilePoints: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
  },
  pointsHighlight: {
    fontWeight: 'bold',
  },
  section: {
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  editButton: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '500',
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
  fieldInputDisabled: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
  addressInput: {
    minHeight: 60,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  preferenceText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  logoutText: {
    marginLeft: 8,
    color: '#F44336',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    marginVertical: 32,
  },
  footerText: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 8,
  },
  footerLink: {
    fontSize: 12,
    color: '#4CAF50',
    textDecorationLine: 'underline',
  },
});