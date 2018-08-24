<template>
<div id="register" class="auth">
  <div class="box">
    <div class="title">REGISTER</div>
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
        <div class="btn-group">
          <input class="btn" type="submit" value="SIGN UP">
          <input class="btn" type="button" onclick="location.href = '/auth/login'" value="SIGN IN">
        </div>
      </form>
      <a href="/" class="btn-home">Home @ usicMusic</a>
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
</style>
