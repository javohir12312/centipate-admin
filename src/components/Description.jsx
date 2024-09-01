import React, { useState, useEffect } from 'react';
import axios from './index';

const Description = () => {
  const [descriptions, setDescriptions] = useState([]);
  const [content, setContent] = useState('');

  const fetchDescriptions = async () => {
    const response = await axios.get('/descriptions');
    setDescriptions(response.data);
  };

  const createDescription = async (e) => {
    e.preventDefault();
    await axios.post('/descriptions', { content });
    setContent('');
    fetchDescriptions();
  };

  const deleteDescription = async (id) => {
    await axios.delete(`/descriptions/${id}`);
    fetchDescriptions();
  };

  useEffect(() => {
    fetchDescriptions();
  }, []);

  return (
    <div>
      <h2>Descriptions</h2>
      <form onSubmit={createDescription}>
        <input 
          type="text" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          placeholder="Enter description"
          required 
        />
        <button type="submit">Add Description</button>
      </form>
      <ul>
        {descriptions.map((desc) => (
          <li key={desc._id}>
            {desc.content} : {desc._id}
            <button onClick={() => deleteDescription(desc._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Description;
