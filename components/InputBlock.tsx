import React from "react";

import styled from "styled-components";

import SmileIcon from "@material-ui/icons/InsertEmoticon";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function InputBlock({ idChat }) {
    const [user] = useAuthState(auth);
    const [inputMessage, setInputMessage] = React.useState<string>("");

    const submitMessage = async (e) => {
        e.preventDefault();
        setInputMessage("");
        try {
            if (user) {
                await addDoc(collection(db, `chats/${idChat}/messages`), {
                    message: inputMessage,
                    name: user.displayName,
                    img: user.photoURL,
                    timestamp: serverTimestamp(),
                    email: user.email,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ChatInputBlock>
            <IconButton>
                <SmileIcon />
            </IconButton>
            <ChatFormBlock onSubmit={submitMessage}>
                <Input
                    placeholder="Новое сообщение"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                />
                <IconButton type="submit">
                    <SendIcon />
                </IconButton>
            </ChatFormBlock>
        </ChatInputBlock>
    );
}

export default InputBlock;

const ChatInputBlock = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 0 15px;
    position: absolute;
    bottom: 0;
`;
const ChatFormBlock = styled.form`
    display: flex;
    align-items: center;
    width: 100%;
`;
const Input = styled.input`
    flex: 1;
    padding: 2px 5px;
    outline-width: 0;
    border: none;
`;
