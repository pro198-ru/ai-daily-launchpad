import React, { useState, useEffect, Suspense, lazy } from 'react';
import './App.css';

const CompanionBot = lazy(() => import('./components/CompanionBot'));

const encouragements = [
  "You're smashing it! 🚀",
  "Keep going, your future self will thank you!",
  "Every tick is a win. Proud of you!",
  "Consistency is power. Keep building those habits!",
  "You’re not alone—I’m here cheering you on!"
];

function getCompanionMessage(tasks, habits) {
  const completedTasks = tasks.filter(t => t.done).length;
  const allHabitsDone = habits.length > 0 && habits.every(h => h.done);
  if (allHabitsDone && completedTasks >= 5) {
    return "🔥 LEGEND! All habits and 5+ tasks done. Take a bow!";
  }
  if (allHabitsDone) return "🌟 All habits done! Habit hero!";
  if (completedTasks >= 5) return "💪 5+ tasks done! You’re unstoppable!";
  if (completedTasks > 0 || habits.some(h => h.done)) {
    return encouragements[Math.floor(Math.random() * encouragements.length)];
  }
  return "Let’s get started—what’s your first win today?";
}

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('habits');
    return saved ? JSON.parse(saved) : [
      { name: 'Drink Water', done: false },
      { name: 'Stretch', done: false },
      { name: 'Inbox Zero', done: false }
    ];
  });
  const [snippet, setSnippet] = useState(() => localStorage.getItem('snippet') || '');
  const [taskInput, setTaskInput] = useState('');
  const [taskPriority, setTaskPriority] = useState('Normal');
  const [showCompanion, setShowCompanion] = useState(false);
  const [companionMsg, setCompanionMsg] = useState('');
  const [dark, setDark] = useState(false);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('snippet', snippet);
  }, [snippet]);

  useEffect(() => {
    setCompanionMsg(getCompanionMessage(tasks, habits));
  }, [tasks, habits]);

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { text: taskInput, done: false, priority: taskPriority }]);
      setTaskInput('');
    }
  };

  const toggleTask = idx => {
    setTasks(tasks.map((t, i) => (i === idx ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = idx => {
    setTasks(tasks.filter((_, i) => i !== idx));
  };

  const toggleHabit = idx => {
    setHabits(habits.map((h, i) => (i === idx ? { ...h, done: !h.done } : h)));
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: dark
        ? 'linear-gradient(135deg, #2d72d9 0%, #009ffd 100%)'
        : 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
      fontFamily: "'Montserrat', sans-serif",
      padding: 0,
      margin: 0
    },
    card: {
      maxWidth: 430,
      margin: '36px auto',
      background: dark ? '#333' : '#fff',
      borderRadius: 20,
      boxShadow: '0 6px 32px #0002',
      padding: '32px 22px 24px 22px',
      fontFamily: "'Montserrat', sans-serif",
      color: dark ? '#fff' : '#000'
    },
    sectionTitle: {
      color: dark ? '#38f9d7' : '#2d72d9',
      margin: '24px 0 10px 0',
      fontWeight: 700,
      fontSize: 22,
      letterSpacing: '0.02em'
    },
    input: {
      padding: 12,
      width: '60%',
      fontSize: 16,
      borderRadius: 10,
      border: dark ? '1.5px solid #38f9d7' : '1.5px solid #c2e9fb',
      outline: 'none',
      marginBottom: 8,
      background: dark ? '#444' : '#fff',
      color: dark ? '#fff' : '#000'
    },
    select: {
      marginLeft: 8,
      padding: 10,
      fontSize: 16,
      borderRadius: 10,
      border: dark ? '1.5px solid #38f9d7' : '1.5px solid #c2e9fb',
      background: dark ? '#444' : '#fff',
      color: dark ? '#fff' : '#000'
    },
    button: {
      marginLeft: 8,
      padding: '10px 18px',
      fontSize: 16,
      borderRadius: 10,
      background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      fontWeight: 700
    },
    floatingBtn: {
      position: 'fixed',
      bottom: 32,
      right: 32,
      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      color: '#fff',
      borderRadius: '50%',
      width: 60,
      height: 60,
      fontSize: 32,
      border: 'none',
      boxShadow: '0 2px 8px #0003',
      cursor: 'pointer',
      zIndex: 1000
    },
    floatingBtn2: {
      position: 'fixed',
      bottom: 32,
      right: 104,
      background: 'linear-gradient(135deg, #2d72d9 0%, #009ffd 100%)',
      color: '#fff',
      borderRadius: '50%',
      width: 60,
      height: 60,
      fontSize: 32,
      border: 'none',
      boxShadow: '0 2px 8px #0003',
      cursor: 'pointer',
      zIndex: 1000
    },
    textarea: {
      width: '100%',
      fontFamily: 'monospace',
      padding: 12,
      borderRadius: 10,
      border: dark ? '1.5px solid #38f9d7' : '1.5px solid #c2e9fb',
      fontSize: 16,
      background: dark ? '#444' : '#f4f9fd',
      color: dark ? '#fff' : '#000',
      resize: 'vertical'
    },
    taskItem: {
      margin: '10px 0',
      textDecoration: 'none',
      listStyle: 'none',
      display: 'flex',
      alignItems: 'center',
      background: dark ? '#555' : '#f4f9fd',
      borderRadius: 10,
      padding: '8px 12px'
    }
  };

  return (
    <div style={styles.container} className={dark ? 'dark-mode' : 'light-mode'}>
      <div style={styles.card}>
        <h1 style={{ fontSize: '2.2rem', textAlign: 'center', color: dark ? '#38f9d7' : '#009ffd', fontWeight: 800, marginBottom: 6, letterSpacing: '0.01em' }}>
          🚀 Launchpad
        </h1>
        <p style={{ textAlign: 'center', color: dark ? '#ccc' : '#555', marginBottom: 18, fontWeight: 500 }}>
          Your daily productivity playground
        </p>
        <button
          onClick={() => setDark(!dark)}
          style={{ ...styles.button, marginBottom: 16 }}
        >
          Switch to {dark ? 'Light' : 'Dark'} Mode
        </button>
        <CompanionBot />
        <section>
          <div style={styles.sectionTitle}>Tasks</div>
          <input
            value={taskInput}
            onChange={e => setTaskInput(e.target.value)}
            placeholder="Add a new task"
            style={styles.input}
          />
          <select
            value={taskPriority}
            onChange={e => setTaskPriority(e.target.value)}
            style={styles.select}
          >
            <option>Low</option>
            <option>Normal</option>
            <option>High</option>
          </select>
          <button onClick={addTask} style={styles.button}>Add</button>
          <ul style={{ paddingLeft: 0, marginTop: 12 }}>
            {tasks.map((task, idx) => (
              <li key={idx} style={styles.taskItem}>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(idx)}
                  style={{ width: 22, height: 22 }}
                />
                <span style={{ marginLeft: 12, flex: 1, fontWeight: 500 }}>
                  {task.text} <em style={{ color: dark ? '#bbb' : '#888', fontSize: 13 }}>({task.priority})</em>
                </span>
                <button
                  onClick={() => deleteTask(idx)}
                  style={{ marginLeft: 12, color: '#ff5252', border: 'none', background: 'none', cursor: 'pointer', fontSize: 20 }}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <div style={styles.sectionTitle}>Habits</div>
          <ul style={{ paddingLeft: 0, marginTop: 8 }}>
            {habits.map((habit, idx) => (
              <li key={idx} style={styles.taskItem}>
                <input
                  type="checkbox"
                  checked={habit.done}
                  onChange={() => toggleHabit(idx)}
                  style={{ width: 22, height: 22 }}
                />
                <span style={{ marginLeft: 12, fontWeight: 500 }}>{habit.name}</span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <div style={styles.sectionTitle}>Code Scratchpad</div>
          <textarea
            value={snippet}
            onChange={e => setSnippet(e.target.value)}
            placeholder="Jot down code or notes..."
            rows={5}
            style={styles.textarea}
          />
        </section>
      </div>
      <button
        style={styles.floatingBtn2}
        onClick={() => window.open('https://you.com/chat', '_blank', 'noopener')}
        title="Open You.com AI Chat"
      >
        🤖
      </button>
      <button
        style={styles.floatingBtn}
        onClick={() => setShowCompanion(true)}
        title="Open your companion bot"
      >
        💬
      </button>
      <Suspense fallback={<div>Loading bot...</div>}>
        {showCompanion && <CompanionBot message={companionMsg} onClose={() => setShowCompanion(false)} />}
      </Suspense>
    </div>
  );
}

export default App;