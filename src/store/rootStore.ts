import AuthStore from "./authStore";

class RootStore {
  authStore: AuthStore;

  constructor() {
    this.authStore = new AuthStore(this);
  }
}

export default RootStore;