import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const localHost = "https://notebook-frontend-1t22.onrender.com";
  const [note, setNote] = useState([]);
  
  // get notes
  // api call
  const getNotes = async () => {
    try {
      const response = await fetch(`${localHost}/api/notes/allnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('authToken'),
        },
      });
      const data = await response.json();
      setNote(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };



  // addNote
  const addNote = async(title, description, tag) => {
    try {
      const response = await fetch(`${localHost}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('authToken'),
        },
        body: JSON.stringify({title,description,tag})
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setNote(note.concat(data));
      

    } catch (error) {
      console.error("Error:", error);
    }
  };



  // updateNote
  const updateNote = async (id,title, description, tag) =>{
    console.log("deleteClick with " + id);
    try {
      const response = await fetch(`${localHost}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('authToken'),
        },
        body: JSON.stringify({title,description,tag})
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }




  // deleteNote
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${localHost}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('authToken'),
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    const newNote = note.filter((n) => {
      return n._id !== id;
    });
    setNote(newNote);
  };

  return (
    <noteContext.Provider value={{ note, addNote, deleteNote, getNotes,updateNote }}>
      {props.children}
    </noteContext.Provider>
  );
};
export default NoteState;
