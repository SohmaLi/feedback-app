import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [feedback, setFeedback] = useState('');
  const [title, setTitle] = useState(''); // State for title
  const [response, setResponse] = useState(null);
  const [feedbackList, setFeedbackList] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/feedback', { title, message: feedback });
      setResponse(res.data);
      setFeedback('');
      setTitle(''); // Clear title input after submission
      fetchFeedback();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setResponse('Error submitting feedback');
    }
  };

  const fetchFeedback = async () => {
    try {
      const res = await axios.get('http://localhost:3000/feedback');
      setFeedbackList(res.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <div className="App">
      <h1>Feedback Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Feedback:
          <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {response && <p>{response}</p>}
      <h2>Feedback Log</h2>
      <ul>
        {feedbackList.map((fb, index) => (
          <li key={index}>
            <strong>{fb.title}</strong>: {fb.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
