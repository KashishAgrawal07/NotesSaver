import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((p) => p._id === pasteId);
            if (paste) {
                setTitle(paste.title);
                setValue(paste.content);
            } else {
                console.warn("No paste found for the given pasteId");
            }
        } else {
            setTitle('');
            setValue('');
        }
    }, [pasteId, allPastes]);

    function createPaste() {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        };

        if (pasteId) {
            dispatch(updateToPastes(paste));
        } else {
            dispatch(addToPastes(paste));
        }

        setTitle('');
        setValue('');
        setSearchParams({});
    }

    return (
        <div className="max-w-4xl mx-auto p-6 shadow-lg rounded-lg">
            <div className="flex flex-row gap-7 place-content-between">
                <input
                    className="p-3 rounded-xl border border-gray-300 w-[66%] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button
                    onClick={createPaste}
                    className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
                >
                    {pasteId ? 'Update My Paste' : 'Create My Paste'}
                </button>
            </div>
            <div className="mt-8">
                <textarea
                    className="rounded-xl mt-4 w-full p-6 bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={value}
                    placeholder="Enter Content Here..."
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}
                />
            </div>
        </div>
    );
};

export default Home;
