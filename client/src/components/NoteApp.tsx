import React, { useState, useEffect } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import io from "socket.io-client";

// Define the shape of a note
interface Note {
  id: string;
  text: string;
}

const socket = io("http://localhost:3000");

const NoteApp: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    fetchNotes();
    socket.on("updateList", (updatedList: { items: Note[] }) => {
      setNotes(updatedList.items);
    });

    return () => {
      socket.off("updateList");
    };
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch("http://localhost:3000/fetchAllTasks");
      const data: Note[] = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      socket.emit("add", newNote);
      setNewNote("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white border-gray-400 rounded-lg shadow-md overflow-hidden">
      <div className="mt-2 p-3 bg-white">
        <div className="flex items-center">
          <div className="w-8 h-8 mr-2  rounded flex items-center justify-center">
            <img src="./notesIcon.png" alt="img" />
          </div>
          <h1 className="ml-1 text-2xl font-bold text-gray-700">Note App</h1>
        </div>
      </div>
      <div className="px-4 pb-4">
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
            className="ml-3 px-4 py-2 bg-amber-800 text-white font-bold rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 flex items-center"
          >
            <div className="rounded-full p-1">
              <FaCirclePlus className="fill-white" size={20} />
            </div>
            Add
          </button>
        </form>
        <div>
          <div className=" bg-white border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-1">Notes</h2>
          </div>
          <div className="max-h-48 overflow-y-auto pr-2 scrollbar">
            <ul className="divide-y divide-gray-300">
              {notes.map((note) => (
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
