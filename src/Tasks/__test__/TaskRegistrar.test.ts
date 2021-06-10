import { TaskRegistrar } from '../TaskRegistrar';
import { FileStorage } from '../../Storage/File/FileStorage';
import fs from 'fs';

afterAll(() => {
    fs.writeFileSync(__dirname + '/data.cache', '');
});

it('registers task successfully with given params', async () => {
    const storage = new FileStorage(__dirname + '/data.cache');
    const taskRegistrar = new TaskRegistrar(storage);
    taskRegistrar.registerTask('email', 1593349424445, { data: {} });
    taskRegistrar.registerTask('email', 1593349724445, { data: {} });
    expect(Object.keys(taskRegistrar.tasks).length).toBe(2);
});
