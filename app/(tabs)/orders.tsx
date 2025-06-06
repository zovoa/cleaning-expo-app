import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Calendar, Clock, Package, CircleCheck as CheckCircle2, Circle as XCircle, CircleAlert as AlertCircle } from 'lucide-react-native';

// Mock order data
const mockOrders = [
  {
    id: '1',
    date: '2025-01-10',
    time: 'Morning (9AM - 12PM)',
    waste: 'Plastic Bottles',
    weight: 3.5,
    points: 35,
    status: 'completed',
    address: '123 Green Street, Eco Garden, Mumbai 400001',
  },
  {
    id: '2',
    date: '2025-01-15',
    time: 'Afternoon (1PM - 4PM)',
    waste: 'Glass Bottles',
    weight: 2.0,
    points: 16,
    status: 'processing',
    address: '123 Green Street, Eco Garden, Mumbai 400001',
  },
];

export default function OrdersScreen() {
  const params = useLocalSearchParams();
  const [orders, setOrders] = useState(mockOrders);
  const [showSuccess, setShowSuccess] = useState(false);

  // Check if we have a new order from the place-order screen
  useEffect(() => {
    if (params.newOrder === 'true') {
      setShowSuccess(true);
      
      // Create a new mock order
      const newOrder = {
        id: String(orders.length + 1),
        date: new Date().toISOString().split('T')[0],
        time: 'Morning (9AM - 12PM)',
        waste: 'Other Plastics',
        weight: 1.5,
        points: 9,
        status: 'pending',
        address: '123 Green Street, Eco Garden, Mumbai 400001',
      };
      
      setOrders([newOrder, ...orders]);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  }, [params.newOrder]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#FFC107';
      case 'processing':
        return '#2196F3';
      case 'completed':
        return '#4CAF50';
      case 'cancelled':
        return '#F44336';
      default:
        return '#757575';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <AlertCircle size={18} color={getStatusColor(status)} />;
      case 'processing':
        return <Package size={18} color={getStatusColor(status)} />;
      case 'completed':
        return <CheckCircle2 size={18} color={getStatusColor(status)} />;
      case 'cancelled':
        return <XCircle size={18} color={getStatusColor(status)} />;
      default:
        return null;
    }
  };

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.orderStatus}>
          {getStatusIcon(item.status)}
          <Text style={[styles.orderStatusText, { color: getStatusColor(item.status) }]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
        <Text style={styles.orderPoints}>{item.points} points</Text>
      </View>
      
      <View style={styles.orderDetail}>
        <View style={styles.orderDetailIcon}>
          <Calendar size={16} color="#757575" />
        </View>
        <Text style={styles.orderDetailText}>{item.date}</Text>
      </View>
      
      <View style={styles.orderDetail}>
        <View style={styles.orderDetailIcon}>
          <Clock size={16} color="#757575" />
        </View>
        <Text style={styles.orderDetailText}>{item.time}</Text>
      </View>
      
      <View style={styles.orderDetail}>
        <View style={styles.orderDetailIcon}>
          <Package size={16} color="#757575" />
        </View>
        <Text style={styles.orderDetailText}>
          {item.waste} ({item.weight.toFixed(1)} kg)
        </Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.orderActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>View Details</Text>
        </TouchableOpacity>
        
        {item.status === 'pending' && (
          <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Package size={64} color="#BDBDBD" />
      <Text style={styles.emptyTitle}>No Orders Yet</Text>
      <Text style={styles.emptyText}>
        You haven't placed any pickup orders yet. Start by selecting waste type and placing an order.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {showSuccess && (
        <View style={styles.successMessage}>
          <CheckCircle2 size={20} color="white" />
          <Text style={styles.successText}>Order placed successfully!</Text>
        </View>
      )}
      
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>My Pickup Orders</Text>
        <Text style={styles.headerSubtitle}>Track the status of your waste collection orders</Text>
      </View>
      
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.ordersList}
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  successMessage: {
    backgroundColor: '#4CAF50',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
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
  ordersList: {
    padding: 16,
    paddingBottom: 32,
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderStatusText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  orderPoints: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  orderDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderDetailIcon: {
    width: 24,
    alignItems: 'center',
    marginRight: 8,
  },
  orderDetailText: {
    fontSize: 14,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 12,
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: '#E8F5E9',
  },
  actionButtonText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  cancelButton: {
    backgroundColor: '#FFEBEE',
  },
  cancelButtonText: {
    color: '#F44336',
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});