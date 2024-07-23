import { PostRepository } from './post-repository';

describe('PostRepository', () => {
  it('should be defined', () => {
    expect(new PostRepository()).toBeDefined();
  });
});
