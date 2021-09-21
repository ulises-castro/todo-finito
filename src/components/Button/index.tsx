import styled from 'styled-components'

const Button = styled.button`
  border: 2px solid #80A1C1;
  background: white;
  border-radius: 5px;
  color: #80A1C1;
  padding: 0.3rem;
  cursor: pointer;
`
export const InvertedBtn = styled(Button)`
  background: white;
  color: #80A1C1;  
  font-weight: bold;
  border-color: white;
`

export default Button;
