import React from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Head from "next/head";

function Chat() {
    return (
        <ContainerChat>
            <Head>
                <title>Chat</title>
            </Head>
            <Navbar />
            <ChatBlock>
                <h1>Chat</h1>
            </ChatBlock>
        </ContainerChat>
    );
}

export default Chat;

const ContainerChat = styled.section`
    display: flex;
`;
const ChatBlock = styled.div``;
