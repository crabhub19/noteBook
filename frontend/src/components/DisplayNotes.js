import React,{useContext,useEffect,useState}from "react";
import NoteItems from "./NoteItems";
import noteContext from '../context/noteContext';
import UpdateNote from "./UpdateNote";

export default function DisplayNotes() {
  const contextOfNote = useContext(noteContext);
  // const dateOnly = new Date(timestamp).toISOString().split("T")[0]
  let {note,getNotes,updateNote} = contextOfNote;
  useEffect(() => {
    getNotes();
  },[getNotes])

                    //content of update modal
  const [open, setOpen] = useState(false);       
  const [modalNoteText, setModalNoteText] = useState({utitle:"",udescription:"",utag:"",uid:""})
  const onchange=(e)=>{
    setModalNoteText({...modalNoteText,[e.target.name]:e.target.value})
  }

  const getUpdateId=(currentNote)=>{
    setOpen(true);
    setModalNoteText({utitle:currentNote.title,udescription:currentNote.description,utag:currentNote.tag,uid:currentNote._id});
    
  }
  //server update
  const updateNoteClick =(e)=>{
    e.preventDefault();
    updateNote(modalNoteText.uid,modalNoteText.utitle,modalNoteText.udescription,modalNoteText.utag);
  }

  return (
    <>
      <section className="">
      <UpdateNote open={open} setOpen={setOpen} onchange={onchange} modalNoteText={modalNoteText} updateNoteClick={updateNoteClick}></UpdateNote>

        <div className="container px-8 mx-auto flex flex-wrap gap-8 justify-evenly">
          {note.length > 0 ? (note.map((note)=>{
            return <NoteItems key={note._id} note={note} getUpdateId={getUpdateId}></NoteItems>
          })):(
            <div className=" fixed flex justify-center items-center min-h-[80vh] p-2">
                <h1 className="text-center text-9xl mix-blend-difference bg-clip-text text-transparent bg-gradient-to-t from-black to-gray-500 font-blazeberg">There are no note exists</h1>
            </div>
          )}
        </div>
        {note.length>0 && 
          <h1 className="text-center fixed bottom-2 w-screen oldstyle-nums font-chococooky">you have total <b>{note.length}</b> note</h1>
        }
      </section>
    </>
  );
}
