import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
 
    to {
    transform: rotate(360deg);
    }
`

export const LoaderWrapper = styled.div`
  position: fixed;
  background-color: rgb(240, 237, 237, 0.5);
  z-index: 10;
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
`

export const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  border: 6px solid purple;
  border-bottom-color: transparent;
  border-radius: 22px;
  animation: ${rotate} 1s infinite linear;
`
