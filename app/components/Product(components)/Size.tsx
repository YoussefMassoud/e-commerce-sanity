"use client";

import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  margin-left: 5px;
`;

const SizeButton = styled.button<{
  size: string;
  isactive: boolean;
}>`
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 15px;
  color: ${(props) => (props.isactive ? "white" : "black")};
  font-weight: 600;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 0px;
  margin-right: 9px;
  background-color: ${(props) =>
    props.isactive ? "#006FEE" : "#EBF4FE"}; // Set a default background color
  justify-content: center;
  padding: 2px 12px 2px 12px;
`;

const Size: React.FC = () => {
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const [activeSize, setActiveSize] = useState("");

  const handleSizeClick = (size: string) => {
    setActiveSize(size);
  };

  return (
    <Wrapper>
      <div className="sizes "></div>
      <div className="flex justify-center flex-row">
        {sizes.map((curSize, index) => (
          <SizeButton
            key={index}
            size={curSize}
            isactive={activeSize === curSize}
            onClick={() => handleSizeClick(curSize)}
          >
            {curSize}
          </SizeButton>
        ))}
      </div>
    </Wrapper>
  );
};

export default Size;
