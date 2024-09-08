import { useState, useEffect } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    fetchNotes();

    socket.on("updateList", (updatedList) => {
      setNotes(updatedList.items);
    });

    return () => {
      socket.off("updateList");
    };
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch("http://localhost:3001/fetchAllTasks");
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (newNote.trim()) {
      socket.emit("add", newNote);
      setNewNote("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 mr-2 bg-amber-700 rounded flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-700">Note App</h1>
        </div>
      </div>
      <div className="p-4">
        <form onSubmit={handleAddNote} className="flex mb-4">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="New Note..."
            className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          <button
            type="submit"
            className="ml-1 px-4 py-2 bg-amber-800 text-white font-bold rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 flex items-center"
          >
            <div className="rounded-full p-1">
              <FaCirclePlus className="fill-white" size={20} />
            </div>
            Add
          </button>
        </form>
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">Notes</h2>
          <div className="max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            <ul className="divide-y divide-gray-200">
              {notes.map((note, index) => (
                <li key={note.id} className="py-2">
                  {note.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteApp;
