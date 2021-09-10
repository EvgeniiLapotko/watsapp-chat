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
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
} from "@firebase/firestore";
import Message from "./Message";
import InputBlock from "./InputBlock";
import TimeAgo from "timeago-react";

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
    const [messageList, setMessageList] = React.useState(messages);

    const refBottom = React.useRef<HTMLDivElement>(
        document.createElement("div")
    );
    const selectUser = userDB.filter((item) => item.email === chat.user[1]);

    React.useEffect(() => {
        if (refBottom) {
            refBottom.current.scrollIntoView({
                behavior: "smooth",
            });
        }
    }, [messages, messageList]);
    React.useEffect(() => {
        onSnapshot(
            query(
                collection(db, `chats/${chat.id}/messages`),
                orderBy("timestamp", "asc")
            ),
            (querySnapshot) => {
                const messages = [];
                querySnapshot.forEach((doc) => {
                    messages.push({ id: doc.id, ...doc.data() });
                });
                setMessageList(messages);
            }
        );
        if (refBottom) {
            refBottom.current.scrollIntoView({
                behavior: "smooth",
            });
        }
    }, [messages]);

    const showMessage = () => {
        if (messageList) {
            return messageList.map((item) => (
                <Message
                    key={item.id}
                    id={item.id}
                    text={item.message}
                    name={item.name}
                    time={item.timestamp ? item.timestamp.seconds : null}
                    img={item.img}
                    email={item.email}
                />
            ));
        } else {
            return messages.map((item) => (
                <Message
                    key={item.id}
                    id={item.id}
                    text={item.message}
                    name={item.name}
                    time={item.timestamp.seconds}
                    img={item.img}
                    email={item.email}
                />
            ));
        }
    };

    return (
        <ChatBlock>
            <HeaderBlok>
                <HeaderInfo>
                    <HeaderAvatar
                        src={selectUser[0] ? selectUser[0].photoUrl : ""}
                    ></HeaderAvatar>
                    <HeaderTitle>
                        <h3>{chat.user[1]}</h3>
                        {selectUser.length !== 0 && (
                            <p>
                                Последний визит :
                                <span>
                                    {new Date(
                                        +selectUser[0].lastSeen.seconds * 1000
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
                {showMessage()}
                <EndMessageBlock ref={refBottom}></EndMessageBlock>
            </MessageContainer>
            <InputBlock idChat={chat.id} />
        </ChatBlock>
    );
};

export default ChatScreen;

const ChatBlock = styled.div`
    background-color: #e6deda;
    position: relative;
    padding-bottom: 55px;
    flex: 1;
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
const MessageContainer = styled.div`
    max-height: 85vh;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
`;
const EndMessageBlock = styled.div``;
