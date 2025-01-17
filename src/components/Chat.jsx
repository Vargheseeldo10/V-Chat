import { React, useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { serverTimestamp } from "firebase/firestore";

export default function Chat({ user }) {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const messagesRef = collection(db, "messages");

    const handleSubmit = async () => {
        if (!text.trim()) return; // Avoid sending empty messages
        await addDoc(messagesRef, {
            text,
            email: user.email,
            logo: user.photoURL,
            name: user.displayName,
            date: serverTimestamp(), // Use Firestore server timestamp
        });
        setText("");
    
        setTimeout(() => {
            const chatContainer = document.querySelector(".chat-message");
            if (chatContainer) {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
        }, 100);
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(messagesRef, (QuerySnapshot) => {
            const newMessages = QuerySnapshot.docs
                .map((doc) => ({ id: doc.id, ...doc.data() })) // Ensure each message has an ID
                .sort((a, b) => {
                    // Use Firestore's Timestamp for sorting
                    const dateA = a.date?.toDate?.() || new Date(a.date); // Convert Firestore Timestamp to JS Date
                    const dateB = b.date?.toDate?.() || new Date(b.date);
                    return dateA - dateB;
                });
            setMessages(newMessages);
    
            setTimeout(() => {
                const chatContainer = document.querySelector(".chat-message");
                if (chatContainer) {
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                }
            }, 100);
        });
    
        return () => unsubscribe();
    }, []);
    

    return (
        <div>
            <div className="justify-content-center">
                <h2 className="text-primary">V-Chat</h2>
            </div>
            <div className="row mt-4">
                <div className="col-xl-4 col-lg-4 col-sm-3 col-2"></div>
                <div className="col-xl-4 col-lg-4 col-sm-6 col-8 chat-message" style={{ overflowY: "scroll", height: "400px" }}>
                    {messages.map((message) => (
                        <ChatMessage key={message.date} {...message} user={user} />
                    ))}
                    <div className="d-flex mt-2">
                        <input
                            type="text"
                            className="form-control"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <button
                            className="btn btn-secondary ms-3"
                            onClick={handleSubmit}
                        >
                            Send
                        </button>
                    </div>
                    <div id="copyright" className="mt-3">
                        Copyrights reserved Vargheseeldo0
                    </div>
                </div>
            </div>
        </div>
    );
}
