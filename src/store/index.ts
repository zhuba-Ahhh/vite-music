import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
  state: () => ({
    isLogin: false,
    loginDialogVisible: false,
    isPlayed: false,
    playList: [],
    userInfo: null,
    playIndex: 0,
    isShowPlayListTips: false
  }),
  getters: {
    isLogin: (state) => state.isLogin || JSON.parse(window.localStorage.getItem('isLogin') || ''),
    isPlayed: (state) => state.isPlayed,
    loginDialogVisible: (state) => state.loginDialogVisible,
    userInfo: (state) =>
      state.userInfo || JSON.parse(window.localStorage.getItem('userInfo') || '{}'),
    playList: (state) =>
      state.playList.length
        ? state.playList
        : JSON.parse(window.localStorage.getItem('playList') || '') || [],
    playIndex: (state) =>
      state.playIndex || JSON.parse(window.localStorage.getItem('playIndex') || '') || 0,
    isShowPlayListTips: (state) => state.isShowPlayListTips
  },
  actions: {
    loginSuc(val: boolean) {
      this.loginDialogVisible = val;
    }
    // playAll({ list }) {
    //   this.setPlayList(concatPlayList(list));
    //   this.setPlayStatus(true);
    //   this.setPlayIndex(0);
    // },
    // selectPlay({ list }) {
    //   const playList = concatPlayList(list, this.playList);
    //   this.setPlayList(playList);
    //   this.setPlayStatus(true);
    //   this.setPlayIndex(findIndex(list[0], playList));
    // },
    // addList({ list }) {
    //   const playList = concatPlayList(list, this.playList);
    //   this.setPlayList(playList);
    //   this.setPlayListTips(true);
    // }
  }
});
// setLogin(val = false) {
//   this.isLogin = val;
// },
// setUserInfo(val) {
//   this.userInfo = val;
// },
// setLoginDialog(val) {
//   this.loginDialogVisible = val;
// },
// setPlayStatus(val = false) {
//   this.isPlayed = val;
// },
// setPlayList(val = null) {
//   this.playList = val;
//   window.localStorage.setItem('playList', JSON.stringify(val));
// },
// setPlayIndex(val = 0) {
//   this.playIndex = val;
//   window.localStorage.setItem('playIndex', val);
// },
// setPlayListTips(val = false) {
//   this.isShowPlayListTips = val;
// }
