import { collection, query, where, onSnapshot } from "@firebase/firestore";
import { Avatar } from "@material-ui/core";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { Component } from "react";
import styled from "styled-components";
import { db } from "../firebase";

interface IChat {
    id: string;
    users: string[];
}

export const ChatNavbar: React.FC<IChat> = ({
    id,
    users,
}: IChat): React.ReactElement => {
    const router = useRouter();

    const [userChat, setUserChat] = React.useState<any>({});

    React.useEffect(() => {
        const q = query(
            collection(db, "users"),
            where("email", "==", users[1])
        );
        onSnapshot(q, (querySnapshot) => {
            const user = [];
            querySnapshot.forEach((doc) => {
                user.push(doc.data());
            });
            setUserChat(user);
        });
    }, []);

    const enterChat = () => {
        router.push(`/chat/${id}`);
    };

    return (
        <ContainerChat onClick={enterChat}>
            {userChat.length > 0 ? (
                <ChatAvatar src={userChat[0].photoUrl}></ChatAvatar>
            ) : (
                <ChatAvatar>{users[1][0].toUpperCase()}</ChatAvatar>
            )}

            <ChatTitle>{users[1]}</ChatTitle>
        </ContainerChat>
    );
};

const ContainerChat = styled.div`
    overflow: auto;
    display: flex;
    padding: 10px 20px;
    align-items: center;
    cursor: pointer;
    :hover {
        background-color: #ddd;
    }
`;

const ChatAvatar = styled(Avatar)`
    margin-right: 10px;
    opacity: 0.8;
`;
const ChatTitle = styled.div``;

export {};
