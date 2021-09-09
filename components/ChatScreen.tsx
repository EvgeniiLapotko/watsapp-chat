import React from "react";

import { Avatar, IconButton } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";

import DotsIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { collection, onSnapshot, query } from "@firebase/firestore";
import Message from "./Message";

interface IChatScreen {
    chat: any;
    messages: any;
}

const ChatScreen: React.FC<IChatScreen> = ({
    chat,
    messages,
}: IChatScreen): React.ReactElement => {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const [messageList, setMessageList] = React.useState([]);

    const refBottom = React.useRef<HTMLDivElement>(
        document.createElement("div")
    );

    React.useEffect(() => {
        if (refBottom) {
            refBottom.current.scrollIntoView({
                behavior: "smooth",
            });
        }
    }, []);

    React.useEffect(() => {
        onSnapshot(
            query(collection(db, `chats/${chat.id}/messages`)),
            (querySnapshot) => {
                const messages = [];
                querySnapshot.forEach((doc) => {
                    messages.push({ id: doc.id, ...doc.data() });
                });
                setMessageList(messages);
            }
        );
    }, []);

    console.log(messageList);

    return (
        <ChatBlock>
            <HeaderBlok>
                <HeaderInfo>
                    <HeaderAvatar></HeaderAvatar>
                    <HeaderTitle>
                        <h3>Email here</h3>
                        <p>
                            last visit :<span>11:55</span>
                        </p>
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
                {messageList &&
                    messageList.map((item) => (
                        <Message key={item.id} id={item.id} text={item.text} />
                    ))}
                <EndMessageBlock ref={refBottom}></EndMessageBlock>
            </MessageContainer>
        </ChatBlock>
    );
};

export default ChatScreen;

const ChatBlock = styled.div`
    background-color: #e6deda;
    height: 100%;
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
