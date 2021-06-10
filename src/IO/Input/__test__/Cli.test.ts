import { Cli } from '../Cli';

it('parses first argument as repo name', async () => {
  const cli = new Cli();
  process.argv = ['npm', 'start', 'testName'];
  const res = cli.parseInput();
  expect(res.repos[0].repoUser).toEqual('testName');
});

it('parses second argument as repo user', async () => {
  const cli = new Cli();
  process.argv = ['npm', 'start', 'testName', 'testRepo'];
  const res = cli.parseInput();
  expect(res.repos[0].repoName).toEqual('testRepo');
});

it('parses arguments after second one as emails', async () => {
  const cli = new Cli();
  process.argv = ['npm', 'start', 'testName', 'testRepo', 'email1', 'email2'];
  const res = cli.parseInput();
  expect(res.repos[0].emails).toEqual(['email1', 'email2']);
});
