import React from 'react';
import { v4 } from 'uuid';

interface iTextBlock {
  line: string;
}

const TextBlock: React.FC<iTextBlock> = ({ line }) => {
  return (
    <div>
      {line.split('\n').map((text) => {
        return (
          <React.Fragment key={v4()}>
            {text}
            <br />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default TextBlock;
