import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #2a2a2a;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Press Start 2P', cursive;
  color: #fff;
`;

export const FormWrapper = styled.div`
  background-color: #3e3e3e;
  border: 4px solid #5d4037;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-width: 400px;
  width: 90%;
`;

export const Title = styled.h1`
  font-size: 24px;
  text-shadow: 2px 2px #000;
  margin: 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Input = styled.input`
  background-color: #1a1a1a;
  border: 2px solid #5d4037;
  color: #fff;
  padding: 10px;
  font-family: 'Press Start 2P', cursive;
  font-size: 12px;
  border-radius: 5px;
`;

export const SubmitButton = styled.button`
  padding: 10px;
  font-size: 12px;
  cursor: pointer;
  background-color: #4a1f1f;
  border: 3px solid #5d4037;
  color: #fff;
  border-radius: 5px;
  text-transform: uppercase;
  font-family: 'Press Start 2P', cursive;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
  width: 100%;
  text-align: center;
  height: fit-content;

  &:hover {
    filter: brightness(1.2);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
`;

export const SecondaryButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  cursor: pointer;
  margin-top: 10px;
  text-transform: uppercase;
  width: fit-content;
  transition: color 0.2s;

  &:hover {
    color: #2980b9;
  }
`;

export const ErrorMessage = styled.div`
  background-color: #4a1a1a;
  border: 2px solid #d32f2f;
  border-radius: 5px;
  padding: 10px;
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  color: #ffcdd2;
  text-align: center;
  box-shadow: 0 2px 4px rgba(211, 47, 47, 0.3);
  animation: shake 0.5s ease-in-out;
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
`;

export const SuccessMessage = styled.div`
  background-color: #1a4a1a;
  border: 2px solid #4caf50;
  border-radius: 5px;
  padding: 10px;
  font-family: 'Press Start 2P', cursive;
  font-size: 10px;
  color: #c8e6c9;
  text-align: center;
  box-shadow: 0 2px 4px rgba(76, 175, 80, 0.3);
`;