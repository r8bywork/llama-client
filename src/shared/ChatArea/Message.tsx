// ```python print("Hello, World!") ````
// В этом коде используется `print` функция в Python для вывода строки на экран. Эта строка содержит текст "Hello, World!", который будет печататься на экране с помощью `print`.
import classNames from 'classnames';
import React from 'react';
import { v4 } from 'uuid';
import CodeBlock from '../CodeBlock/CodeBlock';
import TextBlock from '../TextBlock/TextBlock';
import { iMessage } from '../interfaces/interfaces';
import styles from './styles/Message.module.scss';

const Message: React.FC<iMessage> = ({ text, sender }) => {
  const messageClass = classNames(styles.Message, {
    [styles.UserMessage]: sender === 'user',
    [styles.AiMessage]: sender === 'ai',
  });

  // const codeBlockRegex = /```([a-zA-Z]*)\n([\s\S]*?)\n```/gm;
  const codeBlockRegex = /`{1,3}([a-zA-Z]*)\n([\s\S]*?)\n`{1,3}/g;
  const parts = text.split(codeBlockRegex).filter(Boolean);
  return (
    <div className={messageClass}>
      {parts.map((part, index) => {
        const language = parts[index - 1];
        switch (index % 4) {
          case 2:
            return (
              <CodeBlock
                key={v4()}
                language={language}
                code={part}
              />
            );
          default:
            return (
              <TextBlock
                key={v4()}
                line={part}
              />
            );
        }
      })}
    </div>
  );
};

export default Message;
