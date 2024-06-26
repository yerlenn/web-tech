'use client';

import Link from 'next/link';
import Header from '../components/Header';
import React, { useState } from 'react';
import styles from './checklist.module.css';

const Checklist = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Make a guest list', completed: false, showMenu: false },
    { id: 2, text: 'Send invitations', completed: false, showMenu: false },
    { id: 3, text: 'Book entertainment venue', completed: false, showMenu: false },
    { id: 4, text: 'Order food', completed: false, showMenu: false },
    { id: 5, text: 'Prepare decorations', completed: false, showMenu: false },
    { id: 6, text: 'Arrange tables', completed: false, showMenu: false },
  ]);

  const [newTaskText, setNewTaskText] = useState('');
  const [addingTask, setAddingTask] = useState(false);

  const handleCheckboxChange = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const handleAddTaskClick = () => {
    setAddingTask(true);
  };

  const handleCreateTask = () => {
    if (newTaskText.trim()) {
      const newTask = {
        id: tasks.length + 1,
        text: newTaskText.trim(),
        completed: false,
        showMenu: false,
      };
      setTasks([newTask, ...tasks]); // Prepend the new task
      setNewTaskText('');
      setAddingTask(false);
    }
  };

  const handleCancelTask = () => {
    setNewTaskText('');
    setAddingTask(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCreateTask();
    }
  };

  const toggleMenu = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, showMenu: !task.showMenu } : task));
  };

  const handleEditTask = (id: number) => {
    // Logic to edit task
    console.log('Edit task', id);
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.minorContainer}>
        <div className={styles.header}>
          <h1 className={styles.title}>Start with the template checklist</h1>
          <button className={styles.addButton} onClick={handleAddTaskClick}>+ Add a task</button>
        </div>
        {addingTask && (
          <div className={styles.newTaskContainer}>
            <textarea
              className={styles.textarea}
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter new task"
              autoFocus
            />
            <div className={styles.buttonContainer}>
              <button className={styles.cancelButton} onClick={handleCancelTask}>Cancel</button>
              <button className={styles.saveButton} onClick={handleCreateTask}>Add task</button>
            </div>
          </div>
        )}
        <ul className={styles.taskList}>
          {tasks.map(task => (
            <li key={task.id} className={styles.taskItem}>
              <label className={styles.taskLabel}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  className={styles.checkbox}
                  onChange={() => handleCheckboxChange(task.id)}
                />
                {task.text}
              </label>
              <button className={styles.moreButton} onClick={() => toggleMenu(task.id)}>...</button>
              {task.showMenu && (
                <div className={styles.menu}>
                  <button className={styles.menuItem} onClick={() => handleEditTask(task.id)}>Edit</button>
                  <button className={styles.menuItem} onClick={() => handleDeleteTask(task.id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
        <Link className={styles.proceedButton} href="/info">
          <button>Create</button>
        </Link>
        
      </div>
    </div>
  );
};

export default Checklist;
