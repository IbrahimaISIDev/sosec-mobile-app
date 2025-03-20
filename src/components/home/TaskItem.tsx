// src/components/home/TaskItem.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface TaskItemProps {
  icon: string;
  title: string;
  description: string;
  status: 'todo' | 'inprogress' | 'completed';
  onPress?: () => void; 
}

const TaskItem = ({ icon, title, description, status, onPress }: TaskItemProps) => {
  const getStatusText = () => {
    switch (status) {
      case 'todo':
        return 'À faire';
      case 'inprogress':
        return 'En cours';
      case 'completed':
        return 'Complété';
      default:
        return 'À faire';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'todo':
        return '#FFA726';
      case 'inprogress':
        return '#29B6F6';
      case 'completed':
        return '#66BB6A';
      default:
        return '#FFA726';
    }
  };

  // Conteneur adapté pour gérer les événements de pression
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container 
      style={styles.container}
      {...(onPress && { onPress })}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Icon name={icon} size={24} color="#0066CC" style={styles.icon} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
      <Text style={[styles.status, { color: getStatusColor() }]}>
        {getStatusText()}
      </Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  icon: {
    // Les styles sont directement appliqués au composant Icon
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#757575',
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TaskItem;