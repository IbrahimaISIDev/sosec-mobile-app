// src/components/history/HistoryList.tsx
import React from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { formatUtils } from '../../utils/formatUtils';
import { HistoryItem } from '../../types/history.types';

interface HistoryListProps {
  items: HistoryItem[];
}

// Since we don't have access to your navigation types, we'll use a basic type here
// You should replace this with your actual navigation type
type NavigationProp = {
  navigate: (screen: string, params?: any) => void;
};

export const HistoryList: React.FC<HistoryListProps> = ({ items }) => {
  const navigation = useNavigation<NavigationProp>();

  const getIconForType = (item: HistoryItem): string => {
    // This could be replaced with real icons based on item type
    switch(item.type) {
      case 'prelevement': return '📄';
      case 'decharge': return '📃';
      case 'tableau_bord': return '🚘';
      case 'maintenance': return '🔧';
      case 'carburant': return '⛽';
      case 'peage': return '🛣️';
      default: return '📝';
    }
  };

  const getItemLabel = (item: HistoryItem): string => {
    switch(item.type) {
      case 'prelevement': return 'Bon de prélèvement scanné';
      case 'decharge': return 'Reçu de décharge scanné';
      case 'tableau_bord': return 'Tableau de bord scanné';
      case 'maintenance': return 'Maintenance effectuée';
      case 'carburant': return 'Plein de carburant';
      case 'peage': return 'Ticket de péage scanné';
      default: return item.label || 'Document';
    }
  };

  const renderItem = ({ item }: { item: HistoryItem }) => {
    const handlePress = () => {
      // Navigation to the appropriate detail based on type
      if (item.category === 'ticket') {
        navigation.navigate('TicketDetail', { ticketId: item.id });
      } else if (item.category === 'expense') {
        navigation.navigate('ExpenseDetail', { expenseId: item.id });
      } else if (item.category === 'mileage') {
        navigation.navigate('MileageDetail', { mileageId: item.id });
      }
    };

    return (
      <TouchableOpacity style={styles.itemContainer} onPress={handlePress}>
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>{getItemLabel(item)}</Text>
          <Text style={styles.itemDate}>{formatUtils.formatDate(item.date)}</Text>
        </View>
        
        <View style={styles.itemValueContainer}>
          {item.amount !== undefined ? (
            <Text style={styles.itemAmount}>{formatUtils.formatCurrency(item.amount)} FCFA</Text>
          ) : item.mileage !== undefined ? (
            <Text style={styles.itemMileage}>{formatUtils.formatNumber(item.mileage)} KM</Text>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item: HistoryItem) => item.id}
      style={styles.container}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Aucun élément d'historique trouvé</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
  itemDate: {
    color: '#757575',
    fontSize: 14,
  },
  itemValueContainer: {
    justifyContent: 'center',
  },
  itemAmount: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'right',
  },
  itemMileage: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'right',
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
  },
});