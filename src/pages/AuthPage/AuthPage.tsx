import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'antd';
import { StoreContext } from '../../store/StoreProvider';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import LogIn from '../../components/LogIn/LogIn';
// import SignUp from '../../components/SignUp/SignUp';
// import config from '../../../config.json';
import './AuthPage.scss'
import SignUp from '../../components/SignUp';

const AuthPage = () => {
  const store = useContext(StoreContext);
  const { page } = useParams();
  const navigate = useNavigate();
  // const locale = store.localeStore.locale;
  // const { authPage } = locale === 'ru' ? config.locale.ru : config.locale.en;
  // const { title, subtitle, titleAuth, subtitleAuth, registerBtn, signinBtn, titleMobile } = authPage;

  useEffect(() => {
    if (page === 'login' || page === 'signup') {
      return store.authStore.toggleLoginPage(page === 'login' ? true : false);
    }
    return navigate('/404');
  }, [page]);

  return (
    <>
      <div className='auth-page'>
        <div className='page-content'>
          <div
            className={`container ${store.authStore.showLoginPage ? '' : 'right-panel-active'}`}
          >
            <div
              className='form-container sign-up-container'
            >
              <SignUp />
            </div>
            <div
              className='form-container log-in-container'
            >
              <LogIn />
            </div>
            <div className='overlay-container'>
              <div className='overlay'>
                <div
                  className='overlay-panel overlay-left'
                >
                  {/* <h1>{titleAuth}</h1>
                  <p>{subtitleAuth}</p> */}
                  <img src="https://cdn.icon-icons.com/icons2/936/PNG/64/code_icon-icons.com_73620.png" alt=""/>
                  <p className='title-mobile'>{"Нажмите сюда, чтобы"}</p>
                  <NavLink to="/auth/login">
                    <Button className='ghost'>{"Войти"}</Button>
                  </NavLink>
                </div>
                <div
                  className='overlay-panel overlay-right'
                >
                  {/* <h1>{"title"}</h1>
                  <p>{"subtitle"}</p> */}
                  <img src="https://cdn.icon-icons.com/icons2/936/PNG/64/code_icon-icons.com_73620.png" alt="" />
                  <p className='title-mobile'>{"Нажмите сюда, чтобы"}</p>
                  <NavLink to="/auth/signup">
                    <Button className='ghost'>
                      {"Зарегистрироваться"}
                    </Button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(AuthPage);
