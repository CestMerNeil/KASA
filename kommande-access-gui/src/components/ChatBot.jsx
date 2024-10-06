'use client';

import { useState } from 'react';

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [msg, setMsg] = useState([{ role: 'bot', content: 'Hello~ May I help U today?' }]);
    const [input, setInput] = useState('');

    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false);

    const sendMessage = async () => {
        if (input.trim() !== '') {
            setMsg((prevMsg) => [...prevMsg, { role: 'user', content: input }]);
            setInput('');
            await handleResponse(); // 确保在发送用户消息之后调用 API
        }
    };

    const setResponse = (response) => {
        setMsg((prevMsg) => [...prevMsg, { role: 'bot', content: response }]);
    }

    const handleResponse = async () => {
        if (input.trim() === '') return;

        try {
            const res = await fetch('/api/openai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: input }),
            });

            if (!res.ok) {
                throw new Error('Failed to fetch response');
            }

            const data = await res.json();
            const botResponse = data.choices ? data.choices[0].message.content : 'Sorry, I cannot understand.';
            setResponse(botResponse);
        } catch (error) {
            console.error('Error fetching the response:', error);
            setResponse('Sorry, something went wrong.');
        }
    };

    return (
        <div>
            <button
                className='fixed bottom-4 right-4 btn btn-circle z-50'
                onClick={openDialog}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                </svg>
            </button>

            {isOpen && (
                <div className="fixed bottom-16 right-5 w-80 bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg rounded-lg border-t border-l border-r border-gray-300 dark:border-gray-700 z-50">
                    <div className="p-4 flex justify-between items-center border-b dark:border-gray-700">
                        <h3 className="text-lg font-bold">ChatBot</h3>
                        <button
                            onClick={closeDialog}
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="p-3 space-y-4 max-h-60 overflow-y-auto">
                        {msg.map((m, i) => (
                            <div
                                key={i}
                                className={`p-3 ${m.role === 'bot' ? 'bg-gray-100 dark:bg-gray-700' : 'bg-blue-100 dark:bg-blue-700'} rounded-lg w-3/4 ${m.role === 'user' ? 'ml-auto' : 'mr-auto'}`}
                            >
                                {m.content}
                            </div>
                        ))}
                    </div>

                    <div className="p-3 border-t dark:border-gray-700 flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="HIHIHIHIHIHI..."
                            className="input input-bordered w-full mr-2 dark:bg-gray-900 dark:text-white"
                        />
                        <button className="btn btn-primary" onClick={sendMessage}>
                            Send
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
}
