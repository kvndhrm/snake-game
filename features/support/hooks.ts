import { Before, After, AfterAll } from '@cucumber/cucumber';
import { ICustomWorld } from './world';

Before(async function (this: ICustomWorld) {
  await this.init();
});

After(async function (this: ICustomWorld) {
  await this.close();
});

AfterAll(async function () {
  // Final cleanup if needed
});
