import React, { useState, useEffect } from 'react';
import axios from './index';

const Hint = () => {
  const [hints, setHints] = useState([]);
  const [content, setContent] = useState('');
  const [desID, setDesID] = useState('');

  const fetchHints = async () => {
    const response = await axios.get('/hints');
    setHints(response.data);
  };

  const createHint = async (e) => {
    e.preventDefault();
    await axios.post('/hints', { content, desID });
    setContent('');
    setDesID('');
    fetchHints();
  };

  const deleteHint = async (id) => {
    await axios.delete(`/hints/${id}`);
    fetchHints();
  };

  useEffect(() => {
    fetchHints();
  }, []);

  return (
    <div>
      <h2>Hints</h2>
      <form onSubmit={createHint}>
        <input 
          type="text" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="Enter hint"
          required 
        />
        <input 
          type="text" 
          value={desID} 
          onChange={(e) => setDesID(e.target.value)} 
          placeholder="Description ID"
          required 
        />
        <button type="submit">Add Hint</button>
      </form>
      <ul>
        {hints.map((hint) => (
          <li key={hint._id}>
            {hint.content} : {hint._id} : descID : {hint.desID}
            <button onClick={() => deleteHint(hint._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hint;
