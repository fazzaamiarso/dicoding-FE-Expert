import { Task } from "@lit-labs/task";
import { ReactiveControllerHost } from "lit";

export default class ApiController {
  private host: ReactiveControllerHost;

  private task: Task;

  constructor(host: ReactiveControllerHost) {
    this.host = host;
    this.task = new Task(host, () => {});
  }
}
