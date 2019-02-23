import config from '@/config/quiz';
import CONFIG_FIXTURES from '@/test/fixtures/config';

describe('Unit tests for config quiz', () => {
  it('Test if config has expected value', () => {
    expect(config).to.eql(CONFIG_FIXTURES);
  });
});
