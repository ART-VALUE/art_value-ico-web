import { FunctionComponent } from "react";
import styled from "styled-components";
import { baseText, baseTitle } from "./styledComponents";
import { TextClock } from "./TextCountdown";

const endDate = Date.now() + 1000000

const Button = styled.button`
    ${baseTitle}
    border: 2px solid ${props => props.theme.color.border};
    background-color: ${props => props.theme.color.surface};
    padding: 0.7em;
    text-transform: uppercase;
    font-size: 15pt;
    font-weight: 800;
`

const PreIco: FunctionComponent<{}> = () => {
    return (
        <div>
            <TextClock date={endDate} />
            <Button>Login</Button>
        </div>
    )
}

export default PreIco
