import { reactive, readonly } from 'vue';

const defaults = {
  timeout: 5000,
  closeable: true,
};

const unique = () => Math.random().toString(36).substring(2);

/* Trust in JS hoisting for context injection */
/* eslint-disable no-use-before-define */

const TOASTS = reactive({});
export default readonly(TOASTS);

export const closeToast = toast => {
  delete TOASTS[toast.id];
  toast.onClose?.(toast, context);
};

export const showToast = (msg, options = {}) => {
  const id = unique();
  const { timeout, closeable, onClick, ...rest } = { ...defaults, ...options };
  const clickable = !!onClick || closeable;
  const click = () => {
    onClick?.(toast, context);
    if (closeable) closeToast(toast);
  };
  const toast = { id, msg, click, clickable, ...rest };
  TOASTS[id] = toast;
  if (timeout) setTimeout(() => closeToast(toast), timeout);
};

// Shorthand methods for specific toasts
export const showError = (msg, options) => showToast(msg, { ...options, type: 'error' });
export const showSuccess = (msg, options) => showToast(msg, { ...options, type: 'success' });
export const showWarning = (msg, options) => showToast(msg, { ...options, type: 'warning' });
export const showInfo = (msg, options) => showToast(msg, { ...options, type: 'info' });

// Capture an error thrown by an async callback and show an error toast
export const catchToast = (fn, options = {}) => {
  const {
    format = error => error.response?.data.detail || error.message,
    silent = true, // Stop error propagation by default
    ...rest
  } = options;
  return (...attrs) => fn(...attrs).catch(error => {
    showError(format(error), rest);
    if (!silent) throw error;
  });
};

const context = { showError, showSuccess, showWarning, showInfo, closeToast, catchToast };
