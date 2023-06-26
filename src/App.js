import React, { useState } from 'react';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const createNote = () => {
    const newNote = {
      id: Date.now(),
      title,
      description,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    };
    setNotes([...notes, newNote]);
    setTitle('');
    setDescription('');
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const updateNote = (id) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          title,
          description,
          updatedAt: new Date().toLocaleString(),
        };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='col'>
      <h1>Note-Taking App</h1>
      <div className='note'>
        <h2>Create a Note</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
        ></textarea><br/>
        <button onClick={createNote}>Create</button>
      </div>
      <div>
        <h2>Search Notes</h2>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className='row' style={{width:'73%'}}>
        <h2>Notes</h2>
        {filteredNotes.length > 0 ? (
          <ul>
            {filteredNotes.map((note) => (
              <li key={note.id}>
                <h3>{note.title}</h3>
                <p>{note.description}</p>
                <p>Created At: {note.createdAt}</p>
                <p>Updated At: {note.updatedAt}</p>
                <button onClick={() => deleteNote(note.id)}>Delete</button>
                <button onClick={() => updateNote(note.id)} style={{marginLeft:'10px'}}>Update</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No notes found.</p>
        )}
      </div>
    </div>
  );
}


