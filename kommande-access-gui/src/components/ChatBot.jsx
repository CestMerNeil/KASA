'use client';

import { useState, useRef, useEffect } from 'react';

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [products, setProducts] = useState([]); // 存储产品数据
    const [msg, setMsg] = useState([
        { role: 'assistant', content: 'Hello~ May I help you today?' },
    ]); // 聊天消息
    const [input, setInput] = useState(''); // 用户输入
    const messagesEndRef = useRef(null); // 消息滚动控制

    // 获取产品数据并初始化聊天消息
    useEffect(() => {
        fetch('/api/data', { method: 'GET' })
            .then((response) => response.json())
            .then((data) => {
                // 确保返回的数据结构正确
                if (Array.isArray(data.messages) && Array.isArray(data.products)) {
                    setProducts(data.products); // 存储产品信息
                    setMsg((prevMsg) => [
                        ...data.messages, // 添加系统消息（推荐产品等）
                        ...prevMsg,
                    ]);
                } else {
                    console.error('Unexpected data format from /api/data');
                }
            })
            .catch((error) => console.error('Failed to fetch products:', error));
    }, []);

    // 打开/关闭聊天窗口
    const handleBtnClick = () => {
        setIsOpen(!isOpen);
    };

    // 滚动到最新消息
    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [msg, isOpen]);

    // 发送用户消息
    const sendMessage = async () => {
        if (input.trim() !== '') {
            const userMsg = { role: 'user', content: input }; // 用户消息格式
            setMsg((prevMsg) => {
                const newMsg = [...prevMsg, userMsg];
                handleResponse(newMsg); // 发送所有消息到后端
                return newMsg;
            });
            setInput(''); // 清空输入框
        }
    };

    // 添加机器人回复到消息列表
    const setResponse = (response) => {
        setMsg((prevMsg) => [...prevMsg, { role: 'assistant', content: response }]);
    };

    // 调用后端 /api/openai 接口
    const handleResponse = async (data2API) => {
        try {
            const res = await fetch('/api/openai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data2API), // 发送完整消息列表
            });

            if (!res.ok) {
                throw new Error('Failed to fetch response');
            }

            const data = await res.json();
            const botResponse = data.choices?.[0]?.message?.content || 'Sorry, I cannot understand.';
            setResponse(botResponse); // 添加机器人回复
        } catch (error) {
            console.error('Error fetching the response:', error);
            setResponse('Sorry, something went wrong.');
        }
    };

    // 处理回车键发送消息
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    // 渲染聊天窗口
    return (
        <div>
            <button
                className='fixed bottom-5 right-5 btn btn-circle z-50'
                onClick={handleBtnClick}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                </svg>
            </button>

            {isOpen && (
                <div className="fixed bottom-20 right-5 w-96 bg-white shadow-lg rounded-lg">
                    <div className="p-2 flex justify-between items-center border-b">
                        <h3 className="text-sm font-bold">ChatBot</h3>
                        <button
                            onClick={handleBtnClick}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="p-3 space-y-4 max-h-60 overflow-y-auto">
                        {msg
                            .filter((m) => m.role === 'assistant' || m.role === 'user')
                            .map((m, i) => (
                                <div
                                    key={i}
                                    className={`chat ${m.role === 'assistant' ? 'chat-start' : 'chat-end'}`}
                                >
                                    <div className="chat-bubble">{m.content}</div>
                                </div>
                            ))}

                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-1 border-t flex">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="input flex-grow mr-2"
                            onKeyDown={handleKeyDown}
                        />
                        <button className="btn" onClick={sendMessage}>
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}