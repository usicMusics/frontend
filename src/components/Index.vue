<template>
  <div id="index">
    <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="true"></loading>
    <ul class="left-menu mainmenu">
      <li><a href="/" style="font-size:1.8em; padding:10px !important; font-weight: 400;">usicMusic</a></li>
      <span v-if="username" style="margin-left: 70px !important;">
        <li>
          <a href="/board">커뮤니티</a>
          <ul class="submenu">
            <li><a>ㅡ</a></li>
            <li><a href="/board">게시판</a></li>
          </ul>
        </li>
        <li>
          <a href="/music">음악</a>
          <ul class="submenu">
            <li><a>ㅡ</a></li>
            <li><a href="/music">음악 목록</a></li>
            <li><a href="/music/source">소스 창고</a></li>
          </ul>
        </li>
        <li v-if="check"><a href="/user/list">회원관리</a></li>
      </span>
    </ul>
    <ul class="right-menu mainmenu">
      <span v-if="username">
        <li>
          <a @click.prevent="$modal.show('')">{{username}}</a>
          <ul class="submenu">
            <li><a>ㅡ</a></li>
            <li><a href="/user/info">회원 정보</a></li>
          </ul>
        </li>
        <li><a @click="logout">로그아웃</a></li>
      </span>
      <span v-else>
        <li><a href='/auth/login'>로그인</a></li>
        <li><a href="/auth/register">회원가입</a></li>
      </span>
    </ul>
    <div id="start">
      <h1 id="title">usicMusic</h1>
      <h2 id="sub-title">Express Your Feeling</h2>
      <button id="lets" @click="lets()">Let's Feel</button>
    </div>
    <div id="back">
    </div>
    <modal name="userModal" class="modal">
      <h2 class="modal-header" style="text-align:right">회원 정보
        <span style="padding-left:178px; cursor:pointer; padding-right:16px; font-size:.8em; color:white;" @click="$modal.hide('userModal')">X</span></h2>
      <div style="padding:5% 8%; width:100%;">
        <div style="float: left; padding-left:20px; line-height:28px">
          <!-- {{user.name}} -->
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'

export default {
  name: 'Index',
  created () {
  },
  data () {
    return {
      username: '',
      check: '',
      isLoading: false
    }
  },
  components: {
    Loading
  },
  mounted () {
    this.username = localStorage.getItem('username')
    this.isLoading = true
    this.$http.get('/api/auth/check')
      .then(response => {
        this.check = response.data.info.admin
      }).catch(error => {
        console.log(error)
      }).then(() => {
        // console.log(this.check)
        var self = this
        setTimeout(function () {
          self.isLoading = false
        }, 300)
      })
  },
  methods: {
    logout: function () {
      this.$js.confirm('로그아웃 합니다', null, this.$js.Icons.Warning, '확인', '취소').then(result => {
        if (!result) return
        localStorage.removeItem('username')
        localStorage.removeItem('token')
        location.reload()
      })
    },
    lets: function () {
      if (localStorage.getItem('token') === null) {
        this.$js.alert('로그인 페이지로 이동합니다', '회원이 아닙니다', this.$js.Icons.Warning, '확인').then(() => {
          location.href = '/auth/login'
        })
      } else {
        // const username = localStorage.getItem('username')
        this.$js.alert('즐거운 시간 되세요~', null, this.$js.Icons.Success, '확인').then(() => {
          location.href = '/music'
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#index * {
  color: white;
}
#index .left-menu *:hover {
  color: rgb(146, 153, 255);
}
#index .right-menu *:hover {
  color: rgb(255, 111, 154);
}
.left-menu {
  position: fixed;
  top: 0;
  left: 0;
  float: left;
}
.right-menu {
  position: fixed;
  top: 10px;
  right: 0;
}
#start {
  margin-top: 17%;
}
#title {
  font-size: 8em;
}
#sub-title {
  margin-top: -30px;
  font-size: 2em;
  margin-left: -160px;
  margin-bottom: 50px;
}
#lets {
  background: rgba(255,255,255, .005);
  width: 200px;
  cursor: pointer;
  font-size: 30px;
  border: 1px solid white;
  border-radius: 5px;
  padding: 10px 0;
}
#lets:hover {
  color: #493e66;
  background: rgba(255,255,255);
}
#back {
  z-index: -9999;
  background-image: url('../assets/back.png');
  background-size: 100%;
  max-width: 100%;
  max-height: 100%;
  bottom: 0;
  left: 0;
  margin: auto;
  overflow: auto;
  position: fixed;
  right: 0;
  top: 0;
}
.mainmenu {
  padding: 10px;
}
.mainmenu li {
  width: 100px;
  display: inline-block;
}
.mainmenu li:hover .submenu {
  display: block;
}
.submenu {
  /* padding-top: 15px; */
  display: none;
  position: absolute;
  width: 20px;
}
.submenu:hover {
  display: block;
}
</style>
