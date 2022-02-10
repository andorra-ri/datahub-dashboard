import { reactive, computed, readonly } from 'vue';

const unique = () => Math.random().toString(36).substring(2);

const TASKS = reactive({});
export default readonly(TASKS);

export const startWait = (name = unique()) => {
  TASKS[name] = Date.now();
  return name;
};

export const endWait = name => {
  if (Array.isArray(name)) name.forEach(endWait);
  else delete TASKS[name];
};

export const waitTask = (task, name = unique()) => (...attrs) => {
  startWait(name);
  return task(...attrs).finally(result => {
    endWait(name);
    return result;
  });
};

export const isWaiting = computed(() => !!Object.keys(TASKS).length);
export const isWaitingFor = name => computed(() => !!TASKS[name]);
