import { collection, getDocs, query, where } from "@firebase/firestore";
import { Avatar } from "@material-ui/core";
import { Router, useRouter } from "next/dist/client/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { getRecipientEmail } from "../untils/getRecipientEmail";

interface IChat {
    id: string;
    users: string[];
}

const Chat: React.FC<IChat> = ({ id, users }: IChat): React.ReactElement => {
    const [user] = useAuthState(auth);
    const router = useRouter();

    const [userChat, setUserChat] = React.useState<any>([]);

    const q = query(collection(db, "users"), where("email", "==", users[1]));

    const querySnap = async () => {
        const querySnapshot = await getDocs(q);
        const users = [];
        querySnapshot.forEach((doc) => {
            users.push(doc.data());
        });
        setUserChat(users);
    };

    React.useEffect(() => {
        querySnap();
    }, []);

    const recipientEmail = getRecipientEmail(users, user);

    const enterChat = () => {
        router.push(`/chat/${id}`);
    };

    console.log(userChat);

    return (
        <ContainerChat onClick={enterChat}>
            {userChat.length > 0 ? (
                <ChatAvatar src={userChat.photoUrl}></ChatAvatar>
            ) : (
                <ChatAvatar>{users[1][0].toUpperCase()}</ChatAvatar>
            )}

            <ChatTitle>{users[1]}</ChatTitle>
        </ContainerChat>
    );
};

export default Chat;

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
