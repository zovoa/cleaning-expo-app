import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { CreditCard, Award, TrendingUp, History, Gift } from 'lucide-react-native';

// Mock transactions data
const transactions = [
  {
    id: '1',
    date: '2025-01-10',
    type: 'earned',
    points: 35,
    description: 'Plastic Bottles Collection',
  },
  {
    id: '2',
    date: '2025-01-15',
    type: 'earned',
    points: 16,
    description: 'Glass Bottles Collection',
  },
  {
    id: '3',
    date: '2025-01-20',
    type: 'redeemed',
    points: 50,
    description: 'Mobile Recharge',
  },
];

export default function WalletScreen() {
  // Calculate total points
  const totalPoints = transactions.reduce((sum, transaction) => {
    return transaction.type === 'earned' 
      ? sum + transaction.points 
      : sum - transaction.points;
  }, 0);

  // Calculate monetary value (100 points = ₹10)
  const monetaryValue = (totalPoints / 100 * 10).toFixed(2);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.walletCard}>
        <View style={styles.walletCardTop}>
          <Text style={styles.walletCardLabel}>Available Points</Text>
          <View style={styles.walletCardPoints}>
            <Text style={styles.pointsValue}>{totalPoints}</Text>
            <Text style={styles.pointsLabel}>points</Text>
          </View>
          <Text style={styles.moneyValue}>≈ ₹{monetaryValue}</Text>
        </View>
        
        <View style={styles.walletCardBottom}>
          <TouchableOpacity style={styles.walletAction}>
            <Award size={24} color="#4CAF50" />
            <Text style={styles.walletActionText}>Redeem</Text>
          </TouchableOpacity>
          
          <View style={styles.actionDivider} />
          
          <TouchableOpacity style={styles.walletAction}>
            <Gift size={24} color="#4CAF50" />
            <Text style={styles.walletActionText}>Donate</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statsCard}>
          <CreditCard size={24} color="#2196F3" />
          <Text style={styles.statsValue}>₹{(totalPoints / 100 * 10).toFixed(2)}</Text>
          <Text style={styles.statsLabel}>Total Earned</Text>
        </View>
        
        <View style={styles.statsCard}>
          <TrendingUp size={24} color="#FF9800" />
          <Text style={styles.statsValue}>
            {transactions.filter(t => t.type === 'earned').reduce((sum, t) => sum + t.points, 0)}
          </Text>
          <Text style={styles.statsLabel}>Points Earned</Text>
        </View>
      </View>
      
      <View style={styles.sectionHeader}>
        <History size={20} color="#333" />
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
      </View>
      
      <View style={styles.transactionsContainer}>
        {transactions.map(transaction => (
          <View key={transaction.id} style={styles.transactionItem}>
            <View style={styles.transactionLeft}>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
              <Text style={styles.transactionDesc}>{transaction.description}</Text>
            </View>
            
            <View style={styles.transactionRight}>
              <Text
                style={[
                  styles.transactionPoints,
                  transaction.type === 'earned' ? styles.pointsEarned : styles.pointsRedeemed
                ]}
              >
                {transaction.type === 'earned' ? '+' : '-'}{transaction.points}
              </Text>
              <Text style={styles.transactionPointsLabel}>points</Text>
            </View>
          </View>
        ))}
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>How Points Work</Text>
        <Text style={styles.infoText}>
          • Earn points based on the type and weight of waste you recycle
        </Text>
        <Text style={styles.infoText}>
          • 100 points = ₹10 in redemption value
        </Text>
        <Text style={styles.infoText}>
          • Redeem points for mobile recharge, shopping vouchers, or donate to environmental causes
        </Text>
        <Text style={styles.infoText}>
          • Points are credited after successful waste collection and verification
        </Text>
      </View>
      
      <TouchableOpacity style={styles.supportButton}>
        <Text style={styles.supportButtonText}>Need Help with Points?</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  walletCard: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  walletCardTop: {
    backgroundColor: '#4CAF50',
    padding: 24,
    alignItems: 'center',
  },
  walletCardLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  walletCardPoints: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  pointsValue: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    lineHeight: 48,
  },
  pointsLabel: {
    color: 'white',
    fontSize: 16,
    marginLeft: 4,
    marginBottom: 8,
  },
  moneyValue: {
    color: 'white',
    fontSize: 16,
  },
  walletCardBottom: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 16,
  },
  walletAction: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  walletActionText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  actionDivider: {
    width: 1,
    backgroundColor: '#EEEEEE',
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  statsCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statsValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 8,
  },
  statsLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  transactionsContainer: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  transactionLeft: {
    flex: 2,
  },
  transactionRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  transactionDesc: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  transactionPoints: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pointsEarned: {
    color: '#4CAF50',
  },
  pointsRedeemed: {
    color: '#F44336',
  },
  transactionPointsLabel: {
    fontSize: 12,
    color: '#666',
  },
  infoContainer: {
    backgroundColor: '#E8F5E9',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#388E3C',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#1B5E20',
    marginBottom: 8,
    lineHeight: 20,
  },
  supportButton: {
    margin: 16,
    marginTop: 8,
    marginBottom: 32,
    padding: 16,
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
    alignItems: 'center',
  },
  supportButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});