import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Heading from './components/Heading';
import Input from './components/Input';
import Button from './components/Button';
import TodoList from './components/TodoList';
import TabBar from './components/TabBar';

let todoIndex = 0;

const App = () => {
  
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const [type, setType] = useState('All');

  
  const inputChange = (text) => {
    setInputValue(text);
  };

  
  const submitTodo = () => {
    if (inputValue.match(/^\s*$/)) return;

    const newTodo = {
      title: inputValue,
      todoIndex: todoIndex,
      complete: false,
    };

    todoIndex++;
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  
  const deleteTodo = (todoIndex) => {
    const filteredTodos = todos.filter((todo) => todo.todoIndex !== todoIndex);
    setTodos(filteredTodos);
  };

  
  const toggleComplete = (todoIndex) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.todoIndex === todoIndex) {
        return { ...todo, complete: !todo.complete };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  
  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always" style={styles.content}>
        <Heading />
        <Input inputValue={inputValue} inputChange={inputChange} />
        <TodoList
          type={type}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          todos={todos}
        />
        <Button submitTodo={submitTodo} />
      </ScrollView>
      <TabBar type={type} setType={setType} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default App;
