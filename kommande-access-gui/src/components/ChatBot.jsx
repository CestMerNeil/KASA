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

    // 窗口大小设置 - 只有两种固定尺寸
    const [isLargeSize, setIsLargeSize] = useState(false);

    // 预设尺寸
    const smallSize = { width: 320, height: 450 }; // 手机友好的尺寸
    const largeSize = { width: 400, height: 550 }; // 桌面端更大的尺寸

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

    // 切换窗口大小
    const toggleSize = () => {
        setIsLargeSize(!isLargeSize);
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

    // 当前使用的尺寸
    const currentSize = isLargeSize ? largeSize : smallSize;

    // 渲染聊天窗口
    return (
        <div>
            {/* 聊天按钮 - 更现代的设计 */}
            <button
                className='fixed bottom-5 right-5 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center z-50'
                onClick={handleBtnClick}
                aria-label="Open chat"
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                    </svg>
                )}
            </button>

            {/* 聊天窗口 - 现代化设计 */}
            {isOpen && (
                <div
                    className="fixed bottom-24 right-5 bg-white rounded-2xl shadow-2xl z-40 overflow-hidden transition-all duration-300 ease-in-out border border-gray-200"
                    style={{
                        width: `${currentSize.width}px`,
                        height: `${currentSize.height}px`,
                        maxWidth: "90vw",
                    }}
                >
                    {/* 渐变标题栏，带有拖动手柄 */}
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                            <h3 className="text-sm font-medium">KASA Support</h3>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={toggleSize}
                                className="text-white/80 hover:text-white transition-colors"
                                title={isLargeSize ? "Switch to small size" : "Switch to large size"}
                            >
                                {isLargeSize ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                )}
                            </button>
                            <button
                                onClick={handleBtnClick}
                                className="text-white/80 hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* 消息区域 - 更好的样式 */}
                    <div
                        className="p-4 space-y-4 overflow-y-auto bg-gray-50"
                        style={{ height: `calc(${currentSize.height}px - 130px)` }}
                    >
                        {msg
                            .filter((m) => m.role === 'assistant' || m.role === 'user')
                            .map((m, i) => (
                                <div
                                    key={i}
                                    className={`flex ${m.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                                >
                                    {m.role === 'assistant' && (
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs mr-2 flex-shrink-0">
                                            AI
                                        </div>
                                    )}
                                    <div
                                        className={`rounded-2xl py-2 px-3 max-w-[85%] break-words ${m.role === 'assistant'
                                            ? 'bg-white border border-gray-200 text-gray-800'
                                            : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                                            }`}
                                    >
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* 输入区域 - 现代设计 */}
                    <div className="p-3 bg-white border-t border-gray-200">
                        <div className="flex items-center bg-gray-50 rounded-full border border-gray-200 px-3 py-1 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-grow py-2 bg-transparent border-none focus:outline-none text-sm"
                                onKeyDown={handleKeyDown}
                            />
                            <button
                                className={`ml-2 p-2 rounded-full ${input.trim()
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                                    : 'bg-gray-200 text-gray-400'
                                    } transition-colors`}
                                onClick={sendMessage}
                                disabled={!input.trim()}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}