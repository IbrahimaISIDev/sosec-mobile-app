// src/components/history/HistoryTabs.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

type TabType = 'Tous' | 'Tickets' | 'Dépenses' | 'Kilométrage';

interface HistoryTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const HistoryTabs: React.FC<HistoryTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: TabType[] = ['Tous', 'Tickets', 'Dépenses', 'Kilométrage'];
  
  return (
    <View style={styles.container}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tab,
            activeTab === tab && styles.activeTab
          ]}
          onPress={() => onTabChange(tab)}
        >
          <Text style={[
            styles.tabText,
            activeTab === tab && styles.activeTabText
          ]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  activeTab: {
    backgroundColor: '#1E88E5',
  },
  tabText: {
    color: '#707070',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});