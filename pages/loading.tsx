import styled from "styled-components";
import Loader from "react-loader-spinner";

function Loading() {
    return (
        <ContainerLoading>
            <LoadingBlock>
                <img
                    src="../static/logo.png"
                    alt="logo"
                    style={{ width: 120, height: 120 }}
                />
                <Loader type="Rings" color="#3cbb28" height={40} width={40} />
            </LoadingBlock>
        </ContainerLoading>
    );
}

export default Loading;

const ContainerLoading = styled.div`
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
