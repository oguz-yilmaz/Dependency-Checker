import { Task } from '../Task';
export class SendEmailNotification implements Task {
  execute(data: any) {
    console.log('DATA', data);
    // const emails = data['emails'];
    // const repoUser = data['repoUser'];
    // const repoName = data['repoName'];
    // const outdatedPackages = data['outdatedPackages'];

    // for (const email of emails) {
    //   //send email notification
    // }
  }
}
