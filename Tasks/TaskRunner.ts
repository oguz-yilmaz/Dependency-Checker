import { SendEmailNotification } from './TaskTypes/SendEmailNotification';
import { FileStorage } from '../Storage/File/FileStorage';
import { TaskRuntimeError } from '../errors/TaskRuntimeError';
import { getTime } from '../helpers/helper';

export function run() {
  let storage = new FileStorage();

  let res = storage.getData();

  // const currentRegisteredTasks = res[getTime(Date.now())];

  try {
    const currentRegisteredTasks = res['a63fc8c5d915e1f1sa40f40e6c7499863'];
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
