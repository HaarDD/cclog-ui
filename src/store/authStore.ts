import { makeAutoObservable } from 'mobx';
import RootStoreModel from './rootStore';
import { IUserStore, MessageInfo, SuccessUser, UserDataReg, typeMessage } from '../types';
import axios from 'axios';
import Password from 'antd/es/input/Password';
// import { auth } from '../firebase';

class AuthStore {
  rootStore: RootStoreModel;
  login: boolean;
  showLoginPage: boolean;
  user: SuccessUser;
  messageInfo: MessageInfo;
  loaderIsReady: boolean | undefined;

  constructor(rootStore: RootStoreModel) {
    this.rootStore = rootStore;
    this.login = false;
    this.showLoginPage = true;
    this.user = {
      login: '',
      id: '',
      token: '',
    };
    this.messageInfo = {
      isReady: false,
      type: 'success',
      content: '',
    };
    makeAutoObservable(this);
  }

  setLogin(oldUser: IUserStore) {

  return  axios.post('http://192.168.1.100:8092/api/auth/login', {
  login: oldUser.login,
  password: oldUser.password
  }, {
  withCredentials: true,
    headers: {
    "Content-Type": 'application/json',
    Accept: 'application/json'
  }
})
.then((response) => {
  console.log(response);
  return true;
})
.catch((error) => {
  console.error(error);
  return false;
});


    // return signInWithEmailAndPassword(auth, oldUser.email, oldUser.password)
    //   .then(async (userCredential) => {
    //     const user = userCredential.user;
    //     this.user.id = user?.uid;
    //     this.user.token = user?.refreshToken;
    //     this.toggleLogin(true);
    //     this.user.email = oldUser.email;
    //     return true;
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code.split('auth/')[1].split('-').join(' ');
    //     this.newMessage('error', `Error: ${errorCode[0].toUpperCase() + errorCode.slice(1)}.`);
    //     return false;
    //   })
    //   .finally(() => this.isReady(true));
  }

  setUser(newUser: UserDataReg) {

    // axios.post('/',
    //   {
    //     login: '',
    //     password: ''
    //   }
    //   {
    //     // query: this.queryValue,
    //     // variables: JSON.parse(this.variablesValue || '{}'),
    //   },
    //   // {
    //     // headers: JSON.parse(this.headersValue || '{}'),
    //   // }
    // )
    // axios.post(
    //   config.api.baseUrl,
    //   {
    //     query: this.queryValue,
    //     variables: JSON.parse(this.variablesValue || '{}'),
    //   },
    //   {
    //     headers: JSON.parse(this.headersValue || '{}'),
    //   }
    // ).then(result => {
    //     runInAction(() => {
    //       this.responseData = result.data;
    //       this.isLoading = false;
    //     });
    //   }
    // ).catch(error => {
    //   runInAction(() => {
    //     this.responseData = error.response.data;
    //     this.isError = true;
    //     this.errorMessage = error.message;
    //     this.isLoading = false;  
    //   });
    // });

    // return createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
    //   .then((userCredential) => {
    //     const user = userCredential.user;
    //     this.toggleLogin(true);
    //     this.user.id = user?.uid;
    //     this.user.token = user?.refreshToken;
    //     this.user.email = newUser.email;
    //     return true;
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code.split('auth/')[1].split('-').join(' ');
    //     this.newMessage('error', `Error: ${errorCode[0].toUpperCase() + errorCode.slice(1)}.`);
    //     return false;
    //   })
    //   .finally(() => this.isReady(true));
  }

  // logOutUser() {
  //   return signOut(auth)
  //     .then(() => {
  //     this.toggleLogin(false);
  //     this.clearUser();
  //     return true;
  //   })
  //     .catch((error) => {
  //       this.newMessage('error', `An error happened this ${error}.`);
  //       return false;
  //   })
  //     .finally(() => this.isReady(true));
  // }

  // onAuthState() {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       this.user.id = user?.uid;
  //       this.user.token = user?.refreshToken;
  //       this.user.email = user?.email ?? '';
  //     }
  //     });
  // }

  clearUser() {
    this.user.login = '';
    this.user.token = '';
    this.user.id = '';
  }

  toggleLoader(change: boolean) {
    this.loaderIsReady = change;
  }

  newMessage(type: typeMessage, content: string) {
    this.messageInfo.type = type;
    this.messageInfo.content = content;
    setTimeout(() => { this.isReady(false); }, 100);
  }

  isReady(change: boolean) {
    this.messageInfo.isReady = change;
  }

  toggleLogin(change: boolean) {
    this.login = change;
  }

  toggleLoginPage(change: boolean) {
    this.showLoginPage = change;
  }

}

export default AuthStore;
