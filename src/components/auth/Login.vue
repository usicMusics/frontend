<template>
  <div id="login" class="auth">
    <div class="box">
      <div class="title">LOGIN</div>
      <form id="form" v-on:submit.prevent="login()">
          <div class="form-group">
              <label for="username">Username</label>
              <input type="text" id="username" placeholder="회원 이름을 입력해 주세요">
          </div>
          <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" placeholder="비밀번호를 입력해 주세요">
          </div>
          <div class="btn-group">
              <input class="btn" type="submit" value="SIGN IN">
              <input class="btn" type="button" onclick="location.href = '/auth/register'" value="SIGN UP">
          </div>
      </form>
      <a href="/" class="btn-home">Home @ usicMusic</a>
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
</style>
