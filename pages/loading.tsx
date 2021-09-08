import styled from "styled-components";
import Loader from "react-loader-spinner";

function Loading() {
    return (
        <Container>
            <LoadingBlock>
                <img src="../static/logo.png" alt="logo" />
                <Loader type="Rings" color="#3cbb28" height={40} width={40} />
            </LoadingBlock>
        </Container>
    );
}

export default Loading;

const Container = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const LoadingBlock = styled.div`
    text-align: center;
    margin-top: 100px;
    img {
        margin-bottom: 10px;
    }
`;
