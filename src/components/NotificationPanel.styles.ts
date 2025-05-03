import styled from 'styled-components';

export const Panel = styled.div`
  position: absolute;
  left: 270px;
  width: 400px;
  max-height: 520px;
  height: 520px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  border: 2px solid #3C855B;
  z-index: 200;
  top: 24px;
  display: flex;
  flex-direction: column;
  @media (max-width: 900px) {
    left: 0;
    top: 4px;
    bottom: 12px;
    right: 10px;
    width: 360px;
  }
`;

export const NotificationsList = styled.div`
  flex: 0 1 80%;
  max-height: 80%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
    background: #e6f2ec;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #3C855B;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #2e6846;
  }
  &::-webkit-scrollbar-button:single-button {
    display: none;
    width: 0;
    height: 0;
  }
  &::-webkit-scrollbar-button {
    display: none;
    width: 0;
    height: 0;
  }
  scrollbar-width: thin;
  scrollbar-color: #3C855B #e6f2ec;
`;

export const NotificationItem = styled.div<{ expanded?: boolean }>`
  position: relative;
  padding: 16px 24px 8px 24px;
  border-bottom: 1px solid #ccc;
  background: ${({ expanded }) => (expanded ? '#f6faf7' : 'transparent')};
  transition: background 0.2s;
  &:last-child { border-bottom: none; }
`;

export const UnreadDot = styled.div`
  width: 10px;
  height: 10px;
  background: #FF5A5F;
  border-radius: 50%;
  z-index: 2;
`;

export const TitleRow = styled.div<{ padding?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4px;
  padding: ${({ padding }) => padding || "0px"};
`;

export const ClearAll = styled.span`
  font-weight: bold;
  color: #3C855B;
  cursor: pointer;
  margin-right: 12px;
  font-size: 1rem;
  &:hover {
    text-decoration: underline;
    transition: text-decoration 2s;
  }
`;

export const Title = styled.div`
  font-weight: bold;
  text-align: center;
  flex: 1;
  color: #3C855B;
`;

export const Close = styled.span`
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 8px;
  color: #3C855B;
`;

export const Text = styled.div`
  font-size: 0.98rem;
  color: #222;
  margin-bottom: 4px;
`;

export const More = styled.div`
  color: #2196f3;
  font-size: 0.95rem;
  margin-top: 8px;
  cursor: pointer;
  font-weight: 500;
`; 