import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [feedback, setFeedback] = useState('');
  const [response, setResponse] = useState(null);
  const [feedbackList, setFeedbackList] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/feedback', { message: feedback });
      setResponse(res.data);
      setFeedback('');
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
          Feedback:
          <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {response && <p>{response}</p>}
      <h2>Feedback Log</h2>
      <ul>
        {feedbackList.map((fb, index) => (
          <li key={index}>{fb.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
