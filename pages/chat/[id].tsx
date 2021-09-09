import React from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Head from "next/head";
import ChatScreen from "../../components/ChatScreen";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
} from "@firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Chat({ chats, messages }) {
    const [user] = useAuthState(auth);
    return (
        <ContainerChat>
            <Head>
                <title>Chat with {chats.user[1]}</title>
            </Head>
            <Navbar />
            <ChatBlock>
                <ChatScreen chat={chats} messages={messages} />
            </ChatBlock>
        </ContainerChat>
    );
}

export default Chat;

export async function getServerSideProps(context) {
    const queryMessages = await getDocs(
        query(
            collection(db, `/chats/${context.query.id}/message`),
            orderBy("timestamp", "asc")
        )
    );
    const messages: any = [];
    queryMessages.forEach((doc) => {
        messages.push({
            id: doc.id,
            ...doc.data(),
        });
    });

    const queryChats = await getDoc(doc(db, "chats", context.query.id));

    const chat = {
        id: queryChats.id,
        ...queryChats.data(),
    };
    return {
        props: {
            messages: JSON.stringify(messages),
            chats: chat,
        },
    };
}

const ContainerChat = styled.section`
    display: flex;
`;
const ChatBlock = styled.div`
    flex: 1;
    overflow: scroll;
    height: 100vh;

    ::-webkit-scrollbar {
        display: none;
    }
    ::-webkit-scrollbar-thumb {
        width: 0;
    }
`;
