import { getRepository } from 'typeorm';

import Message from '../models/Message';

interface Response {
  message_type: string;
  messages: Message[];
}

class ListMessagesSerive {
  public async execute(): Promise<Response[]> {
    const messageRepository = getRepository(Message);

    const messages = await messageRepository.find();

    const serialiazedMessages = messages.map(message => ({
      ...message,
      message_content: `http://10.0.0.102:3333/files/messages/${message.message_content}`,
    }));

    const reducedTypes = serialiazedMessages.filter(
      (selectItem, index, array) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        array
          .map(mapItem => mapItem.message_type)
          .indexOf(selectItem.message_type) === index,
    );

    const reducedMessages = reducedTypes.map(message => {
      const typeMessage = serialiazedMessages.filter(serialiazedMessage => {
        if (serialiazedMessage.message_type === message.message_type) {
          return serialiazedMessage.message_content;
        }

        return null;
      });

      return {
        message_type: message.message_type,
        messages: typeMessage,
      };
    });

    return reducedMessages;
  }
}

export default ListMessagesSerive;
