import { ConversationSchema } from './conversation.schema';

describe('ConversationSchema', () => {
  it('should be defined', () => {
    expect(new ConversationSchema()).toBeDefined();
  });
});
