import React, { useContext,useState } from "react";
import noteContext from "../context/noteContext";

export default function AddNote(props) {
  const {showAlert} = props;
  const contextOfNote = useContext(noteContext);
  let {addNote} = contextOfNote;
  const [noteText, setNoteText] = useState({title:"",description:"",tag:""})
  const saveButton=(e)=>{
    
    e.preventDefault();
    addNote(noteText.title,noteText.description,noteText.tag);
    setNoteText({title:"",description:""})
    showAlert("success","successfully note saved");


  }
  const onchange=(e)=>{
    setNoteText({...noteText,[e.target.name]:e.target.value})
  }
  return (
    <>
      <section>
        <div className="container px-8 mx-auto">
          <form
            className="bg-white dark:bg-zinc-950  card hover:shadow-2xl dark:hover:card mx-auto max-w-3xl min-h-56 px-8 pt-6 pb-8 mb-4 dark:border-t-4 mt-2"
            action=""
            method="post"
            onSubmit={saveButton}
          >
            <fieldset className="border p-8 shadow-sm">
              <legend className="text-2xl">Add your regular note</legend>
              <div className="grid md:grid-cols-2 mx-auto gap-16">
                {/* title */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 bg-gray-50 border-gray-300 focus:outline-black  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-none focus:dark:border-gray-400 "
                    id="title"
                    name="title"
                    type="text"
                    placeholder="HeadLine"
                    onChange={onchange}
                    value={noteText.title}
                    required
                    minLength={3}
                  />
                </div>
                {/* tag */}
                <div className="my-auto">
                  <label htmlFor="tag" className="sr-only">
                    Underline select
                  </label>
                  <select
                    onChange={onchange}
                    name="tag"
                    id="tag"
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  >
                    <option >Choose a Genre</option>
                    <option value="genarel">Genarel</option>
                    <option value="special">Special</option>
                    <option value="urgent">Urgent</option>
                    <option value="official">Official</option>
                  </select>
                </div>
              </div>

              {/* description */}
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-none focus:dark:border-gray-400 font-chococooky"
                  placeholder="Write your thoughts here..."
                  onChange={onchange}
                  value={noteText.description}
                  minLength={6}
                  required={true}
                ></textarea>
              </div>
              <div className=" flex justify-end pt-10">
                <button className="dark:bg-gray-500 dark:hover:bg-green-400 dark:text-white font-bold py-2 px-4 border-b-4 dark:border-gray-700 dark:hover:border-green-900 rounded bg-white shadow-md border border-gray-400 hover:bg-gray-400 hover:border-gray-900 hover:scale-105 tracking-widest" type="submit">
                  Save
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </section>
    </>
  );
}
