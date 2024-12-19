import { newPluginPlugin } from './plugin';

describe('new-plugin', () => {
  it('should export plugin', () => {
    expect(newPluginPlugin).toBeDefined();
  });
});
