import React from "react";

import { Avatar, IconButton } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";

import DotsIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SmileIcon from "@material-ui/icons/InsertEmoticon";
import SendIcon from "@material-ui/icons/Send";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    serverTimestamp,
} from "@firebase/firestore";
import Message from "./Message";

interface IChatScreen {
    chat: any;
    messages: any;
    userDB: any;
}

const ChatScreen: React.FC<IChatScreen> = ({
    chat,
    messages,
    userDB,
}: IChatScreen): React.ReactElement => {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const [inputMessage, setInputMessage] = React.useState<string>("");

    const refBottom = React.useRef<HTMLDivElement>(
        document.createElement("div")
    );
    const selectUser = userDB.filter((item) => item.email === chat.user[1]);

    const submitMessage = async (e) => {
        e.preventDefault();
        setInputMessage("");
        try {
            if (user) {
                await addDoc(collection(db, `chats/${chat.id}/messages`), {
                    message: inputMessage,
                    name: user.displayName,
                    img: user.photoURL,
                    timestamp: serverTimestamp(),
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        if (refBottom) {
            refBottom.current.scrollIntoView({
                behavior: "smooth",
            });
        }
    }, []);

    return (
        <ChatBlock>
            <HeaderBlok>
                <HeaderInfo>
                    <HeaderAvatar></HeaderAvatar>
                    <HeaderTitle>
                        <h3>{chat.user[1]}</h3>
                        {selectUser.length !== 0 && (
                            <p>
                                Последний визит :
                                <span>
                                    {new Date(
                                        selectUser[0].lastSeen.seconds * 1000
                                    ).toLocaleTimeString()}
                                </span>
                            </p>
                        )}
                    </HeaderTitle>
                </HeaderInfo>
                <HeaderIconBlok>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <DotsIcon />
                    </IconButton>
                </HeaderIconBlok>
            </HeaderBlok>
            <MessageContainer>
                {messages.length > 0 &&
                    messages.map((item) => (
                        <Message
                            key={item.id}
                            id={item.id}
                            text={item.message}
                            name={item.name}
                            time={item.timestamp.seconds}
                            img={item.img}
                        />
                    ))}
                <EndMessageBlock ref={refBottom}></EndMessageBlock>
            </MessageContainer>
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
        </ChatBlock>
    );
};

export default ChatScreen;

const ChatBlock = styled.div`
    background-color: #e6deda;
    position: relative;
    padding-bottom: 55px;
    flex: 1;
    overflow: scroll;
`;

const HeaderBlok = styled.div`
    background-color: #fff;
    padding: 15px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    z-index: 50;
    top: 0;
`;
const HeaderInfo = styled.div`
    display: flex;
    align-items: center;
`;
const HeaderAvatar = styled(Avatar)`
    margin-right: 20px;
`;
const HeaderTitle = styled.div`
    h3 {
        margin: 0;
    }
    p {
        margin: 0;
        span {
            display: inline-block;
            padding-left: 15px;
            color: grey;
        }
    }
`;

const HeaderIconBlok = styled.div``;
const MessageContainer = styled.div``;
const EndMessageBlock = styled.div``;
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
