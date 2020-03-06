import React, { PureComponent } from 'react'
import Axios from 'axios';
import cookie from 'react-cookies';
import styleGod, { DEFAULT, INDEX } from '../js/styleGod';

class RealSignIn extends PureComponent {
  state = {
    username: cookie.load('username') || '',
    password: '',
    checked: Boolean(cookie.load('username'))
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    Axios.post('http://13.209.68.218/auth/signin', { username, password })
    .then(res => {
      if (res.status === 200) {
        const { beforeToken } = res.data;
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        cookie.save('username', username, { expires })
        localStorage.setItem('beforeToken', beforeToken);
        this.props.setStateTrue();
      }
    }).catch(err => {
      if (err.status === 400) {
        alert('로그인 정보 틀림');
      } else {
        console.error(err);
      }
    });
  }

  onChangeUsername = (e) => {
    this.setState({ username: e.target.value });
  }

  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  }

  componentDidMount() {
    styleGod(document, INDEX, DEFAULT);
  }

  onChangeChecked = () => {
    this.setState({ checked: !this.state.checked });
  }

  render() {
    const { username, password, checked } = this.state;
    return (
      <>
        <div id="whole-wrap">
          <header>
            <p>오</p>
            <p>늘도</p>
            <p>행복한</p>
            <p>학교생활</p>
          </header>
          <section>
            <form onSubmit={this.onSubmit}>
              <input onChange={this.onChangeUsername} value={username} type="text" name="id" id="id" placeholder="아이디를 입력해주세요." />
              <input onChange={this.onChangePassword} value={password} type="password" name="password" id="password" placeholder="비밀번호를 입력해주세요." />
              <input type="checkbox" checked={checked} onChange={this.onChangeChecked} name="check" id="check" />
              <label htmlFor="check"><span></span> 아이디 기억하기</label>
              <input type="submit" value="로그인" />
            </form>
          </section>
          <footer id="default-footer">
            <div id="default-footer-left">대덕소프트웨어마이스터고등학교</div>
            <div id="default-footer-right">DMI</div>
          </footer>
        </div>
      </>
    )
  }
}

export default RealSignIn;