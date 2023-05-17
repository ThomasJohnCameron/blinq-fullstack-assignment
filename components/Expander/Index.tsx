import React from "react";
import styled from "@emotion/styled";

interface ExpanderPanelProps {
  title: React.ReactNode;
  children: React.ReactNode;
  expanded: boolean;
  onToggle: () => void;
}

const Container = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const Header = styled.button`
  background-color: #f9f9f9;
  border: none;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  width: 100%;
`;

const Arrow = styled.span<{ expanded: boolean }>`
  transition: transform 0.3s;

  ${({ expanded }) => expanded && "transform: rotate(180deg);"}
`;

const Content = styled.div`
  padding: 1rem;
`;

const ExpanderPanel: React.FC<ExpanderPanelProps> = ({
  title,
  children,
  expanded,
  onToggle,
}) => {
  return (
    <Container>
      <Header onClick={onToggle}>
        {title}
        <Arrow
          className={expanded ? "expanded" : "collapsed"}
          expanded={expanded}
        >
          ▼
        </Arrow>
      </Header>
      {expanded && <Content>{children}</Content>}
    </Container>
  );
};

export default ExpanderPanel;
