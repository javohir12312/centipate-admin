import React, { useState, useEffect } from 'react';
import axios from './index';

const Flag = () => {
  const [flags, setFlags] = useState([]);
  const [content, setContent] = useState('');
  const [desID, setDesID] = useState('');

  const fetchFlags = async () => {
    const response = await axios.get('/flags');
    setFlags(response.data);
  };

  const createFlag = async (e) => {
    e.preventDefault();
    await axios.post('/flags', { content, desID });
    setContent('');
    setDesID('');
    fetchFlags();
  };

  const deleteFlag = async (id) => {
    await axios.delete(`/flags/${id}`);
    fetchFlags();
  };

  useEffect(() => {
    fetchFlags();
  }, []);

  return (
    <div>
      <h2>Flags</h2>
      <form onSubmit={createFlag}>
        <input 
          type="text" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="Enter flag"
          required 
        />
        <input 
          type="text" 
          value={desID} 
          onChange={(e) => setDesID(e.target.value)} 
          placeholder="Description ID"
          required 
        />
        <button type="submit">Add Flag</button>
      </form>
      <ul>
        {flags.map((flag) => (
          <li key={flag._id}>
            {flag.content} : {flag._id} : descID : {flag.desID}
            <button onClick={() => deleteFlag(flag._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Flag;
