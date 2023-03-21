import AlertMessage from './AlertMessage.vue';
import { createApp, App } from 'vue';
import { AlertConfig } from './interface';

let globalInstance: App | undefined = undefined;

function checkGlobalInstance() {
  const containerId = 'alert-messages';
  let container = document.getElementById('#' + containerId);
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    document.body.prepend(container);
  }
  if (!globalInstance) {
    globalInstance = createApp(AlertMessage);
    globalInstance.mount('#' + containerId);
  }
}

interface AlertOptions {
  raw?: boolean;
  duration?: number;
}

export const alert = {
  info(msg: string, options?: AlertOptions) {
    checkGlobalInstance();
    globalInstance!._instance!.exposed!.show(msg, 'info', options?.raw, options?.duration);
  },
  error(msg: string, options?: AlertOptions) {
    checkGlobalInstance();
    globalInstance!._instance!.exposed!.show(msg, 'error', options?.raw, options?.duration);
  },
  warn(msg: string, options?: AlertOptions) {
    checkGlobalInstance();
    globalInstance!._instance!.exposed!.show(msg, 'warn', options?.raw, options?.duration);
  },
  config(config: AlertConfig) {},
};

export default AlertMessage;
