import { Application } from './Application';
import { FileStorage } from './Storage/File/FileStorage';
import { TaskRegistrer } from './Tasks/TaskRegistrar';

const run = async () => {
  const storage = new FileStorage();
  const taskRegistrar = new TaskRegistrer(storage);

  const app = new Application(taskRegistrar);

  app.setOptions({
    input: 'cli',
    registery: 'git',
    output: 'cli',
    config: 'package.json',
  });

  await app.process();
};

try {
  run();
} catch (error) {
  console.log(error);
}
