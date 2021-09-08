import React from "react";

import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";

import MessageIcon from "@material-ui/icons/Message";
import DotsIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";

function Navbar() {
    const [inputValue, setInputValue] = React.useState<string>("");
    const handleChange = (e: any) => {
        setInputValue(e.currentTarget.value);
    };
    return (
        <Container>
            <Header>
                <HeaderAvatar></HeaderAvatar>
                <HeaderIcon>
                    <IconButton>
                        <MessageIcon />
                    </IconButton>
                    <IconButton>
                        <DotsIcon />
                    </IconButton>
                </HeaderIcon>
            </Header>
            <Search>
                <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-amount">
                        Поиск
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
        </Container>
    );
}

export default Navbar;

const Container = styled.section`
    max-width: 320px;
    border-right: 1px solid rgba(250, 250, 250);
    box-shadow: 1px 0 5px #ccc;
    height: 100vh;
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
    :hover {
        opacity: 0.8;
    }
`;
const HeaderIcon = styled.div``;
const Search = styled.div`
    margin: 20px 10px;
    .MuiInputLabel-outlined.MuiInputLabel-shrink {
        transform: translate(18px, -6px) scale(0.75);
    }
`;
