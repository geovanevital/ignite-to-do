import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Alert
} from 'react-native';
import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    if (tasks.find(task => task.title === newTaskTitle)) {
      Alert.alert(
        "Tarefa já cadastrada",
        "Você não pode cadastrar uma task com o mesmo conteúdo.",
        [
          {
            text: "OK"
          }
        ]
      )
    } else {
      setTasks([...tasks, data])
    }
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));
    const task = updatedTasks.find(task => task.id === id);
    if (!task)
      return
    task.done = !task.done;
    setTasks(updatedTasks)
  }


  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que deseja remover esse item?",
      [
        {
          text: "Não",
          style: 'cancel'
        },
        {
          text: "Sim",
          style: 'destructive',
          onPress: () =>
            setTasks(tasks.filter(
              task => task.id !== id
            ))
        }
      ]
    );
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updatedTasks = tasks.map(task => ({ ...task }));
    const task = updatedTasks.find(task => task.id === taskId);
    if (!task)
      return
    task.title = taskNewTitle;
    setTasks(updatedTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />
      <TodoInput addTask={handleAddTask} />
      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        editTask={handleEditTask}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})