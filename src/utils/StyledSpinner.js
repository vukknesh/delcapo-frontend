import { ReactComponent as LogoOriginalSvg } from "../assets/logo.svg";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
      from {
        transform: rotate(0deg)
    
      }
      to{
        transform: rotate(360deg)
      }
    `;

const StyledSpinner = styled(LogoOriginalSvg)`
  animation: ${rotate} infinite 2s linear;
  border-radius: 50%;
`;

export default StyledSpinner;
