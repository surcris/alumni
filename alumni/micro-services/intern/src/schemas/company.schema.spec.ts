import { CompanySchema } from './company.schema';

describe('CompanySchema', () => {
  it('should be defined', () => {
    expect(new CompanySchema()).toBeDefined();
  });
});
