<template>
<div class="login">
    <div id="login">LOGIN</div>
    <div id="loginForm">
      <form id="form" v-on:submit.prevent="login()">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" placeholder="회원 이름을 입력해 주세요">
        </div>
        <div class="form-group">
          <label class="Label" for="password">Password</label>
          <input type="password" id="password" placeholder="비밀번호를 입력해 주세요">
        </div>
        <div id="btns">
          <input class="btn" type="submit" value="SIGN IN">
          <input class="btn" type="button" onclick="location.href = '/auth/register'" value="SIGN UP">
        </div>
      </form>
      <a href="/" id="home">Home @ usicMusic</a>
    </div>
</div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      token: ''
    }
  },
  methods: {
    login: function () {
      const username = document.getElementById('username').value
      const password = document.getElementById('password').value
      if (username === '') {
        this.$js.alert('회원 이름을 입력해주세요', null, this.$js.Icons.Warning, '확인')
      } else if (password === '') {
        this.$js.alert('비밀번호를 입력해주세요', null, this.$js.Icons.Warning, '확인')
      } else {
        this.$http.post('/api/auth/login', {username, password})
          .then((result) => {
            this.token = result.data.token
            // localStorage['token'] = this.token
            localStorage.setItem('token', this.token)
            localStorage.setItem('username', username)
            this.$js.alert(`환영합니다 ${username}님`, '로그인 성공', this.$js.Icons.Success, '확인').then(() => {
              location.replace('/')
            })
          }).catch(error => {
            console.log(error)
            this.$js.alert('회원이름 또는 비밀번호가 확인해주세요', '로그인 실패', this.$js.Icons.Warning, '확인')
          })
      }
    }
  }
}

</script>

<style scoped>
#home {
  color: gray;
  text-decoration: none;
  position: relative;
  top: 15px;
  font-size: .9em;
}
.login {
  background-color: white;
  border-radius: 10px;
  box-shadow: 1px 1px 10px 1px lightgray;
  margin: 0;
  position: absolute;
  width: 600px;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}
.login #login {
  background-image: url('../../assets/back.png');
  background-size: 100%;
  background-color: black;
  padding: 80px 50px;
  font-size: 30px;
  color: white;
  font-weight: bold;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.login #loginForm {
  padding: 40px 12%;
}
.login .form-group {
  margin: 15px 0;
}
.login .form-group label {
  text-align: left;
  width: 20%;
}
.login .form-group input {
  font-size: .8em;
  width: 70%;
  color: gray;
  margin-left: 10%;
  margin-top: 5px;
  line-height: 20px;
  padding-right: 0 !important;
  border: none;
  border-bottom: 1px solid gray;
  outline: none;
}
.login .form-group input:focus {
  border-bottom: 1px solid rgb(240, 86, 132);
}
.login #btns {
  margin: 30px 0;
}
.login .btn {
  line-height: 25px;
  display: inline-block;
  width: 45%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: rgb(240, 86, 132);
  color: white;
  font-weight: bold;
  margin-right: 5%;
}
.login .btn:hover {
  background-color: rgb(255, 111, 154);
}
.login .btn:nth-child(2) {
  margin-right: 0;
  background-color: rgb(190, 190, 190);
}
.login .btn:nth-child(2):hover {
  background-color: rgb(218, 218, 218);
}
</style>
