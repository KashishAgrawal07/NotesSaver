import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Paste = () => {
    const pastes = useSelector((state) => state.paste.pastes);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));

    function handleDelete(pasteId) {
        dispatch(removeFromPastes(pasteId));
    }

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <input
                className="p-3 rounded-xl border border-gray-300 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for pastes..."
                type="search"
            />

            <div className="space-y-6">
                {filteredData.length > 0 && filteredData.map((paste) => (
                    <div className="border border-gray-200 p-4 rounded-xl shadow-md" key={paste._id}>
                        <div className="text-lg font-semibold">{paste.title}</div>
                        <div className="mt-2 text-gray-700">{paste.content}</div>
                        <div className="flex gap-4 justify-between items-center mt-4">
                            <div className="text-sm text-gray-500">{paste.createdAt}</div>
                            <div className="space-x-4">
                                <button className="p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600">
                                    <a href={`/?pasteId=${paste._id}`}>Edit</a>
                                </button>
                                <button className="p-2 bg-green-500 text-white rounded-xl hover:bg-green-600">
                                    <a href={`/pastes/${paste._id}`}>View</a>
                                </button>
                                <button
                                    onClick={() => handleDelete(paste._id)}
                                    className="p-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(paste.content);
                                        toast.success("Copied to Clipboard");
                                    }}
                                    className="p-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600"
                                >
                                    Copy
                                </button>
                                <button className="p-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600">
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Paste;
