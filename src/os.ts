/**
 * OSに関する初期化
 */
const init = () => {
  const platform = window.navigator.platform.toLocaleLowerCase();

  if (platform.indexOf('win') > -1) {
    window.document.body.classList.add('is-windows');
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  init
}
