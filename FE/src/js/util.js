export function _$(selector, all, target = document) {
  return all
    ? target.querySelectorAll(selector)
    : target.querySelector(selector);
}

export function _c(target) {
  return {
    add(className) {
      target.classList.add(className);
    },
    remove(className) {
      target.classList.remove(className);
    }
  };
}

export function __(element) {
  const target = _$(element);
  return {
    on(event, func) {
      target.addEventListener(event, func);
    },
    show(className = "on-block") {
      target.classList.add(className);
    },
    hide(className = "on-block") {
      target.classList.remove(className);
    }
  };
}

export function __$(target) {
  return {
    on(event, func) {
      target.addEventListener(event, func);
    },
    show(className = "on-none") {
      target.classList.remove(className);
    },
    hide(className = "on-none") {
      target.classList.add(className);
    }
  };
}
