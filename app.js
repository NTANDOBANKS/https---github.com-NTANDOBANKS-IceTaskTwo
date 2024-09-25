import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TaskScreen" component={TaskScreen} />
        <Stack.Screen name="SecondPage" component={SecondPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function TaskScreen({ navigation }) {
  const [task, setTask] = useState('');
  const [cookingTasks, setCookingTasks] = useState([]);
  const [runningTasks, setRunningTasks] = useState([]);

  const addTask = (type) => {
    if (task.trim() === '') {
      Alert.alert('Error', 'Task cannot be empty!');
      return;
    }

    if (type === 'Cooking') {
      setCookingTasks([...cookingTasks, task]);
    } else if (type === 'Running') {
      setRunningTasks([...runningTasks, task]);
    }

    setTask('');
  };

  const deleteTask = (type, index) => {
    if (type === 'Cooking') {
      const newCookingTasks = [...cookingTasks];
      newCookingTasks.splice(index, 1);
      setCookingTasks(newCookingTasks);
    } else if (type === 'Running') {
      const newRunningTasks = [...runningTasks];
      newRunningTasks.splice(index, 1);
      setRunningTasks(newRunningTasks);
    }
  };

  const renderTask = (type) => ({ item, index }) => (
    <View style={styles.taskContainer}>
      <Text style={styles.taskText}>{item}</Text>
      <TouchableOpacity onPress={() => deleteTask(type, index)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task List</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={task}
        onChangeText={setTask}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => addTask('Cooking')}>
        <Text style={styles.addButtonText}>Add Cooking Task</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={() => addTask('Running')}>
        <Text style={styles.addButtonText}>Add Running Task</Text>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Cooking Tasks</Text>
      <FlatList
        data={cookingTasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderTask('Cooking')}
        ListEmptyComponent={<Text style={styles.noTasksText}>No cooking tasks added</Text>}
      />
      <Text style={styles.sectionTitle}>Running Tasks</Text>
      <FlatList
        data={runningTasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderTask('Running')}
        ListEmptyComponent={<Text style={styles.noTasksText}>No running tasks added</Text>}
      />
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => navigation.navigate('SecondPage')}
      >
        <Text style={styles.detailsButtonText}>Go to Second Page</Text>
      </TouchableOpacity>
    </View>
  );
}

function SecondPage() {
  return (
    <View style={styles.container}>
      <Text>Second Page</Text>
    </View>
  );
}

export default App;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskText: {
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 4,
    borderRadius: 4,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noTasksText: {
    fontStyle: 'italic',
  },
  detailsButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 4,
    marginTop: 16,
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

//Referencing
//GeeksforGeeks (2020). ReactJS Components Complete Reference. [online] GeeksforGeeks. Available at: https://www.geeksforgeeks.org/reactjs-components-complete-reference/?ref=shm [Accessed 25 Sep. 2024].