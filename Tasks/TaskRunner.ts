import { SendEmailNotification } from './TaskTypes/SendEmailNotification';
import { FileStorage } from '../Storage/File/FileStorage';
import { TaskRuntimeError } from '../errors/TaskRuntimeError';
import { getTime } from '../helpers/helper';

export function run() {
  const storage = new FileStorage();
  const res = storage.getData();

  try {
    const currentRegisteredTasks = res[getTime(Date.now())];
    for (const task of currentRegisteredTasks) {
      if (task.type === 'email') {
        const t = new SendEmailNotification();
        t.execute(task.data);
      }
    }
  } catch (error) {
    throw new TaskRuntimeError(getTime(Date.now()));
  }
}
