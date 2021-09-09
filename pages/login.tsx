import React from "react";

import Head from "next/head";
import styled from "styled-components";

import { Button } from "@material-ui/core";
import { signInWithRedirect } from "@firebase/auth";
import { auth, provider } from "../firebase";

const Login: React.FC = (): React.ReactElement => {
    const signIn = () => {
        try {
            signInWithRedirect(auth, provider);
        } catch (error) {
            alert("Не удалось зарегистрироваться");
        }
    };
    return (
        <Container>
            <Head>
                <title>Login </title>
            </Head>
            <LoginBlock>
                <LogoInner>
                    <img src="../static/logo.png" alt="logo" />
                </LogoInner>
                <LogoButton>
                    <ButtonGoogleContainer>
                        <Button fullWidth onClick={signIn}>
                            Sign in with Google
                        </Button>
                    </ButtonGoogleContainer>
                </LogoButton>
            </LoginBlock>
        </Container>
    );
};

export default Login;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #ddd;
`;

const LoginBlock = styled.div`
    background-color: #fff;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.5) 2px 0 3px rgba(0, 0, 0, 0.5);
    padding: 80px;
    border-radius: 10px;
`;
const LogoInner = styled.div`
    text-align: center;
    overflow: hidden;
    width: 120px;
    height: 120px;
    margin: 0 auto;
    margin-bottom: 55px;
    img {
        width: 120px;
        height: 120px;
    }
`;
const LogoButton = styled.div``;

const ButtonGoogleContainer = styled.div`
    button {
        margin-bottom: 10px;
        background-color: #00abde;
        color: #fff;
        :hover {
            background-color: #00abde;
            opacity: 0.8;
        }
    }
`;
const ButtonNumberContainer = styled.div`
    button {
        color: #fff;
        background-color: #3cbb28;
        display: block;
        margin-bottom: 10px;

        :hover {
            background-color: #3cbb28;
            opacity: 0.8;
        }
    }
`;
