import { Avatar } from "@material-ui/core";
import styled from "styled-components";

interface IMessage {
    id: string;
    text: string;
}

const Message: React.FC<IMessage> = ({
    id,
    text,
}: IMessage): React.ReactElement => {
    return (
        <MessageContainer>
            <MessageImg></MessageImg>
            <MessageBlock>
                <h4>
                    Username
                    {/* <span>{new Date(+time * 1000).toLocaleTimeString()}</span> */}
                </h4>
                <p>{text}</p>
            </MessageBlock>
        </MessageContainer>
    );
};

export default Message;

const MessageContainer = styled.div`
    margin: 15px;
    display: flex;
    width: 100%;
`;

const MessageImg = styled(Avatar)``;
const MessageBlock = styled.div`
    min-width: 40%;
    margin-left: 15px;
    padding: 10px;
    background-color: rgba(250, 250, 250);
    border-radius: 10px;
    position: relative;
    z-index: 10;
    ::after {
        content: "";
        position: absolute;
        width: 15px;
        height: 15px;
        background-color: rgba(250, 250, 250);
        top: 15px;
        left: -6px;
        transform: rotate(45deg);
        z-index: -1;
    }
    h4 {
        margin: 0;
        span {
            font-size: 14px;
            color: grey;
        }
    }
`;
