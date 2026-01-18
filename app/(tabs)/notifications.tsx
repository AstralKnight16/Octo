import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Bell, CheckCircle, AlertCircle } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

export default function NotificationsScreen() {
  const { token } = useAuth();

  if (!token) {
    return (
      <View style={styles.container}>
        <Bell size={48} color="#58a6ff" />
        <Text style={styles.emptyTitle}>No Notifications</Text>
        <Text style={styles.emptySubtitle}>
          Sign in to see your notifications
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.emptyState}>
        <Bell size={48} color="#58a6ff" />
        <Text style={styles.emptyTitle}>All caught up!</Text>
        <Text style={styles.emptySubtitle}>
          You don't have any notifications right now
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyTitle: {
    fontSize: 24,
    fontFamily: 'GeistSans-Bold',
    color: '#f0f6fc',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    fontFamily: 'GeistSans-Regular',
    color: '#8b949e',
    textAlign: 'center',
  },
});
