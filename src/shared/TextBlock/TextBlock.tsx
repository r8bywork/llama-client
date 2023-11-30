import React from 'react';
import { v4 } from 'uuid';

interface TextBlockProps {
  line: string;
}

const TextBlock = ({ line }: TextBlockProps) => {
  const lines = line.split('\n');
  const lastIdx = lines.length - 1;
  return (
    <>
      {line.split('\n').map((text, index) => {
        return (
          <React.Fragment key={v4()}>
            {text}
            {index !== lastIdx && <br />}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default TextBlock;
