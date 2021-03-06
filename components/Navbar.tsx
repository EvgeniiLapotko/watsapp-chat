import React from "react";
import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";

import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";

import MessageIcon from "@material-ui/icons/Message";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";
import { addDoc, collection, onSnapshot, query } from "@firebase/firestore";
import { auth, db } from "../firebase";
import Snackbar from "@material-ui/core/Snackbar";
import { signOut } from "@firebase/auth";
import  ChatNavbar  from "./Chat";

function Navbar() {
    const [inputValue, setInputValue] = React.useState<string>("");
    const [snackValue, setSnackValue] = React.useState<boolean>(false);
    const [chatsList, setChatsList] = React.useState([]);
    const [user] = useAuthState(auth);

    React.useEffect(() => {
        onSnapshot(query(collection(db, "chats")), (querySnapshot) => {
            const chats = [];
            querySnapshot.forEach((doc) => {
                chats.push({ id: doc.id, ...doc.data() });
            });
            setChatsList(chats);
        });
    }, []);

    const chatsAlredyExist = (input: string): boolean => {
        if (chatsList) {
            const filterChat = chatsList.filter(
                (item) => item.user[1] === input
            );
            if (filterChat.length > 0) {
                return false;
            } else {
                return true;
            }
        }
    };

    const handleClose = () => {
        setSnackValue(false);
    };

    const handleChange = (e: any) => {
        setInputValue(e.currentTarget.value);
    };
    const createChat = (): void => {
        const input: string = prompt(
            "?????????????? e-mail ???????????????????????? ?? ?????????????? ?????????? ????????????????"
        );
        if (!input) {
            return;
        }
        if (
            EmailValidator.validate(input) &&
            input !== user.email &&
            chatsAlredyExist(input)
        ) {
            const addChat = async () => {
                try {
                    const docRef = await addDoc(collection(db, "chats"), {
                        user: [user.email, input],
                    });
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            };

            addChat();
        } else {
            setSnackValue(true);
        }
    };

    return (
        <Container>
            <Header>
                <HeaderAvatar src={user.photoURL}></HeaderAvatar>
                <HeaderIcon>
                    <IconButton>
                        <MessageIcon />
                    </IconButton>
                    <IconButton onClick={() => signOut(auth)}>
                        <ExitToAppIcon />
                    </IconButton>
                </HeaderIcon>
            </Header>
            <Search>
                <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-amount">
                        ??????????
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        value={inputValue}
                        onChange={handleChange}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                        labelWidth={60}
                    />
                </FormControl>
            </Search>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={snackValue}
                onClose={handleClose}
                message={"???????????????? ???????????? ??????????"}
                autoHideDuration={3000}
                key="123"
            />
            <NavbarButton onClick={createChat}>???????????????? ??????</NavbarButton>

            <NavbarChatList>
                {chatsList &&
                    chatsList.map((item) => (
                        <ChatNavbar
                            key={item.id}
                            users={item.user}
                            id={item.id}
                        />
                    ))}
            </NavbarChatList>
        </Container>
    );
}

export default Navbar;

const Container = styled.section`
    flex: 0.4;
    max-width: 320px;
    border-right: 1px solid rgba(250, 250, 250);
    box-shadow: 1px 0 5px #ccc;
    height: 100vh;
    display: flex;
    flex-direction: column;
`;
const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid rgba(245, 245, 245);
    box-shadow: 0 1px 5px #ccc;
    position: sticky;
    z-index: 1;
`;
const HeaderAvatar = styled(Avatar)`
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
    :hover {
        opacity: 0.8;
    }
`;
const HeaderIcon = styled.div``;
const Search = styled.div`
    margin: 20px 10px;
    &&& {
        fieldset {
            border: 1px solid #3cbb28;
        }
    }
`;

const NavbarButton = styled(Button)`
    width: 100%;
    &&& {
        border-bottom: 2px solid whitesmoke;
        border-top: 2px solid whitesmoke;
    }
`;
const NavbarChatList = styled.div`
    overflow-y: auto;
    ::-webkit-scrollbar {
        display: none;
    }
`;
