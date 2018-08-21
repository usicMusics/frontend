<template>
<div class="join">
    <div id="register">REGISTER</div>
    <div id="registerForm">
      <form id="form" v-on:submit.prevent="register()">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" placeholder="회원 이름을 입력해 주세요">
        </div>
        <div class="form-group">
          <label class="Label" for="password">Password</label>
          <input type="password" id="password" placeholder="비밀번호를 입력해 주세요">
        </div>
        <div class="form-group">
          <label class="Label" for="password2">Reconfirm</label>
          <input type="password" id="password2" placeholder="비밀번호를 재확인해주세요">
        </div>
        <div class="form-group">
          <label class="Label" for="nickname">Nickname</label>
          <input type="text" id="nickname" placeholder="닉네임을 입력해주세요">
        </div>
        <div id="btns">
          <input class="btn" type="submit" value="SIGN UP">
          <input class="btn" type="button" onclick="location.href = '/auth/login'" value="SIGN IN">
        </div>
      </form>
      <a href="/" id="home">Home @ usicMusic</a>
    </div>
</div>
</template>

<script>
export default {
  name: 'register',
  methods: {
    register: function () {
      const username = document.getElementById('username').value
      const password = document.getElementById('password').value
      const password2 = document.getElementById('password2').value
      const nickname = document.getElementById('nickname').value

      if (username === '') {
        this.$js.alert('회원 이름을 입력해주세요', null, this.$js.Icons.Warning, '확인')
      } else if (password === '') {
        this.$js.alert('비밀번호를 입력해주세요', null, this.$js.Icons.Warning, '확인')
      } else if (password2 === '') {
        this.$js.alert('비밀번호를 재확인해주세요', null, this.$js.Icons.Warning, '확인')
      } else if (password !== password2) {
        this.$js.alert('확인된 비밀번호가 다릅니다', null, this.$js.Icons.Warning, '확인')
      } else if (nickname === '') {
        this.$js.alert('닉네임을 입력해주세요', null, this.$js.Icons.Warning, '확인')
      } else {
        this.$http.post('/api/auth/register', {username, password, nickname}).then((response) => {
          console.log(response)
          this.$js.alert('로그인 화면으로 이동합니다', '회원가입 완료', this.$js.Icons.Success, '확인').then(() => {
            location.href = '/auth/login'
          })
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
}
</script>

<style scoped>
.join #home {
  color: gray;
  text-decoration: none;
  position: relative;
  top: 15px;
  font-size: .9em;
}
.join {
  background-color: white;
  border-radius: 10px;
  box-shadow: 1px 1px 10px 1px lightgray;
  margin: 0;
  position: absolute;
  width: 600px;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  /* position: absolute; */
}
.join #register {
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
.join #registerForm {
  padding: 40px 12%;
}
.join .form-group {
  margin: 15px 0;
  /* line-height: 30px; */
}
.join .form-group label {
  text-align: left;
  width: 20%;
  /* float: left; */
}
.join .form-group input {
  font-size: .8em;
  width: 70%;

  color: gray;
  margin-left: 10%;
  margin-top: 5px;
  /* padding: 5px; */
  line-height: 20px;
  padding-right: 0 !important;
  border: none;
  border-bottom: 1px solid gray;
  outline: none;
}
.join .form-group input:focus {
  border-bottom: 1px solid rgb(240, 86, 132);
}
.join #btns {
  margin: 30px 0;
}
.join .btn {
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
.join .btn:hover {
  background-color: rgb(255, 111, 154);
}
.join .btn:nth-child(2) {
  margin-right: 0;
  background-color: rgb(190, 190, 190);
}
.join .btn:nth-child(2):hover {
  background-color: rgb(218, 218, 218);
}
</style>
