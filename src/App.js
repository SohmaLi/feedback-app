import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [feedback, setFeedback] = useState('');
  const [title, setTitle] = useState('');
  const [response, setResponse] = useState(null);
  const [feedbackList, setFeedbackList] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngăn chặn tải lại trang
    try {
      const res = await axios.post('http://feedbackapi.smiledev.info.vn/api/feedback', { title, message: feedback });
      setResponse(res.data.message); // Giả sử API trả về message
      setFeedback('');
      setTitle('');
      fetchFeedback(); // Làm mới danh sách phản hồi
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setResponse('Error submitting feedback');
    }
  };

  const fetchFeedback = async () => {
    try {
      const res = await axios.get('http://feedbackapi.smiledev.info.vn/api/feedback/all');
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
      <div className='div-form'>
        <h1>Feedback Form Note</h1>
        <form className='form box' onSubmit={handleSubmit}>
          <label>
            Title:
            <input className='input' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label>
            Feedback:
            <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} />
          </label>
          <button className='submit-button' type="submit">Submit</button>
        </form>
        {response}
      </div>
      <div className='div-log'>
        <h2>Feedback Log</h2>
        <ul className='list-log'>
          {feedbackList.map((fb, index) => (
            <li key={index}>
              <strong>{fb.title}</strong>: {fb.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
