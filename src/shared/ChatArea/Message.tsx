// import classNames from 'classnames';
// import React from 'react';
// import SyntaxHighlighter from 'react-syntax-highlighter';
// import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// import { iMessage } from '../interfaces/interfaces';
// import styles from './styles/Message.module.scss';

// const Message: React.FC<iMessage> = ({ text, sender }) => {
//   const messageClass = classNames(styles.Message, {
//     [styles.UserMessage]: sender === 'user',
//     [styles.AiMessage]: sender === 'ai',
//   });

//   return (
//     <div>
//       <div className={messageClass}>{text}</div>
//       <SyntaxHighlighter
//         language='python'
//         style={atomOneDark}
//         customStyle={{
//           padding: '25px',
//         }}
//       >
//         {text}
//       </SyntaxHighlighter>
//     </div>
//   );
// };

// export default Message;

import classNames from 'classnames';
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { iMessage } from '../interfaces/interfaces';
import styles from './styles/Message.module.scss';

const Message: React.FC<iMessage> = ({ text, sender }) => {
  const messageClass = classNames(styles.Message, {
    [styles.UserMessage]: sender === 'user',
    [styles.AiMessage]: sender === 'ai',
  });

  const codeBlockRegex = /```([a-zA-Z]*)\n([\s\S]*?)\n```/gm;
  const parts = text.split(codeBlockRegex);

  return (
    <div className={messageClass}>
      {parts.map((part, index) => {
        if (index % 3 === 0) {
          return <div key={index}>{part}</div>;
        } else if (index % 3 === 2) {
          const language = parts[index - 1];
          return (
            <SyntaxHighlighter
              key={index}
              language={language}
              style={atomOneDark}
              customStyle={{
                padding: '25px',
                marginTop: '10px',
              }}
            >
              {part}
            </SyntaxHighlighter>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default Message;
