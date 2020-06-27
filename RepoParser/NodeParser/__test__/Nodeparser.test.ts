import axios from 'axios';
import { NodeParser } from '../NodeParser';
import { GitRegistry } from '../../../Registry/git/GitRegistry';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

it('get empty object when parsed empty string response', async () => {
  const parser = new NodeParser();
  const registry = new GitRegistry();
  const resp = '';
  mockedAxios.get.mockResolvedValue(resp);
  await parser.parseConfig(
    { repoName: 'test', repoUser: 'testUser' },
    registry
  );

  return expect(parser.confContent).toEqual({});
});

it('parse method adds latest versions to result object', async () => {
  const parser = new NodeParser();
  const mockcheckVersion = jest.spyOn(parser, 'checkVersion');
  const resp = '3.1.1';
  mockcheckVersion.mockImplementation(async () => {
    return resp;
  });

  parser.confContent.dependencies = {
    test: '2.1.1',
  };

  const res = await parser.parse();

  return expect(res).toEqual({
    test: {
      currentVersion: '2.1.1',
      latestVersion: '3.1.1',
    },
  });
});
