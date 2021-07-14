import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert
} from 'react-native';
import { Task } from './TasksList';

import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/pen/pen.png';

export interface TasksItemProps {
  task: Task;
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, title: string) => void;
}

export function TaskItem({ tasks, task, toggleTaskDone, removeTask, editTask }: TasksItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  };

  function handleCancelEditing() {
    setNewTaskTitle(task.title);
    setIsEditing(false);
  };

  function handleSubmitEditing() {
    if (!tasks.find(task => task.title === newTaskTitle)) {
      editTask(task.id, newTaskTitle);
      setIsEditing(false);
      console.log(task.title)
    } else {
      Alert.alert(
        "Tarefa já cadastrada",
        "Você não pode cadastrar uma task com o mesmo conteúdo.",
        [
          {
            text: "OK"
          }
        ]
      )
      setNewTaskTitle(task.title)
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (textInputRef.current)
      isEditing
        ? textInputRef.current.focus()
        : textInputRef.current.blur();
  }, [isEditing])

  return (
    <>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            style={task.done
              ? styles.taskMarkerDone
              : styles.taskMarker
            }
          >
            {task.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>
          <TextInput
            value={newTaskTitle}
            onChangeText={setNewTaskTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={task.done
              ? styles.taskTextDone
              : styles.taskText
            }
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.iconsContainer} >
        {isEditing ? (
          <TouchableOpacity
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleStartEditing}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        )}
        <View
          style={styles.iconsDivider}
        />
        <TouchableOpacity
          disabled={isEditing}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20
  },
  iconsDivider: {
    width: 1,
    height: 24,
    color: 'rgba(196, 196, 196, 0.24)',
    marginHorizontal: 12
  }
})