import styled from "styled-components";
import Loader from "react-loader-spinner";

function Loading() {
    return (
        <ContainerBlock>
            <LoadingBlock>
                <img
                    src="../static/logo.png"
                    alt="logo"
                    style={{ width: 120, height: 120 }}
                />
                <Loader type="Grid" color="#3cbb28" height={40} width={40} />
            </LoadingBlock>
        </ContainerBlock>
    );
}

export default Loading;

const ContainerBlock = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const LoadingBlock = styled.div`
    text-align: center;

    img {
        margin-bottom: 10px;
    }
`;
