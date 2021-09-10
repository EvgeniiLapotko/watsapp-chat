import { Avatar } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";

interface IMessage {
    id: string;
    text: string;
    name: string;
    time: any;
    img: string;
    email: string;
}

const Message: React.FC<IMessage> = ({
    id,
    text,
    name,
    time,
    img,
    email,
}: IMessage): React.ReactElement => {
    const [user] = useAuthState(auth);

    return (
        <>
            {user.email === email ? (
                <MyMessageContainer>
                    <MyMessageBlock>
                        <h4>
                            {name}
                            <span>
                                {new Date(+time * 1000).toLocaleTimeString()}
                            </span>
                        </h4>
                        <p>{text}</p>
                    </MyMessageBlock>
                    <MyMessageImg src={img}></MyMessageImg>
                </MyMessageContainer>
            ) : (
                <MessageContainer>
                    <MessageImg src={img}></MessageImg>
                    <MessageBlock>
                        <h4>
                            {name}
                            <span>
                                {new Date(+time * 1000).toLocaleTimeString()}
                            </span>
                        </h4>
                        <p>{text}</p>
                    </MessageBlock>
                </MessageContainer>
            )}
        </>
    );
};

export default Message;

const MessageContainer = styled.div`
    margin: 15px;
    display: flex;
`;

const MessageImg = styled(Avatar)``;
const MessageBlock = styled.div`
    min-width: 40%;
    margin-left: 15px;
    padding: 10px;
    background-color: #e1ffc7;
    border-radius: 10px;
    position: relative;
    box-shadow: 0 2px 2px #999;
    z-index: 10;
    ::after {
        content: "";
        position: absolute;
        width: 15px;
        height: 15px;
        background-color: #e1ffc7;
        top: 15px;
        left: -6px;
        transform: rotate(45deg);
        z-index: -1;
    }
    h4 {
        margin: 0;
        span {
            display: block;
            font-size: 14px;
            color: grey;
        }
    }
`;
const MyMessageContainer = styled.div`
    margin: 15px;
    display: flex;
    justify-content: flex-end;
`;

const MyMessageImg = styled(Avatar)``;
const MyMessageBlock = styled.div`
    min-width: 40%;
    margin-right: 15px;
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
    position: relative;
    box-shadow: 0 2px 2px #999;
    z-index: 10;
    ::after {
        content: "";
        position: absolute;
        width: 15px;
        height: 15px;
        background-color: #fff;
        top: 15px;
        right: -6px;
        transform: rotate(45deg);
        z-index: -1;
    }
    h4 {
        margin: 0;
        span {
            display: block;
            font-size: 14px;
            color: grey;
        }
    }
`;
