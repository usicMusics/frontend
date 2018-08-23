<template>
    <div id="index">
        <!-- loading -->
        <loading :active.sync="isLoading" :can-cancel="true" :is-full-page="true"></loading>
        <!-- background -->
        <div id="background"></div>
        <ul class="left-menu mainmenu">
            <li><a class="nh" href="/" style="font-size:1.8em; padding:10px !important; font-weight: 400;">usicMusic</a></li>
            <span v-if="username" style="margin-left: 70px !important;">
        <li>
          <a href="/board">커뮤니티</a>
          <ul class="submenu">
            <li><a class="nh">ㅡ</a></li>
            <li><a href="/board">게시판</a></li>
          </ul>
        </li>
        <li>
          <a href="/music">음악</a>
          <ul class="submenu">
            <li><a class="nh">ㅡ</a></li>
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
        <div id="welcome">
            <h1 id="title">usicMusic</h1>
            <h2 id="sub-title">Express Your Feeling</h2>
            <button class="btn" id="lets" @click="lets()">Let's Feel</button>
        </div>
        <!--<modal name="userModal" class="modal">-->
            <!--<h2 class="modal-header" style="text-align:right">회원 정보-->
                <!--<span style="padding-left:178px; cursor:pointer; padding-right:16px; font-size:.8em;"-->
                      <!--@click="$modal.hide('userModal')">X</span></h2>-->
            <!--<div style="padding:5% 8%; width:100%;">-->
                <!--<div style="float: left; padding-left:20px; line-height:28px">-->
                    <!--&lt;!&ndash; {{user.name}} &ndash;&gt;-->
                <!--</div>-->
            <!--</div>-->
        <!--</modal>-->
    </div>
</template>

<script>
import Loading from 'vue-loading-overlay'

export default {
  name: 'Index',
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
    this.username = localStorage['username']
    this.isLoading = true
    this.$http.get('/api/auth/check')
      .then(response => {
        this.check = response.data.info.admin
      }).catch(error => {
        console.log(error)
      }).then(() => {
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
    #index * { color: white; }
    #background {
        background: #fff url("../assets/back.png") no-repeat center; position: fixed;
        left: 0; top: 0; bottom: 0; right: 0; z-index: -9999;
    }
    /* main menu */
    .mainmenu { padding: 10px; }
    .mainmenu li { width: 100px; display: inline-block; }
    .mainmenu li:hover .submenu { display: block; }
    /* sub menu */
    .submenu { display: none; position: absolute; width: 20px; }
    .left-menu { float: left; }
    .right-menu { float: right; }
    .left-menu *:hover { color: rgb(146, 153, 255) !important; }
    .right-menu *:hover { color: rgb(255, 111, 154) !important; }
    .mainmenu .nh { color: white !important}

    /* welcome */
    #welcome { position: absolute; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%); }
    #title { font-size: 8em; }
    #sub-title { margin-top: -30px; font-size: 2.2em; margin-left: -160px; margin-bottom: 50px; }

    /* let's start btn */
    #lets { background: rgba(255, 255, 255, .005); width: 200px; font-size: 30px; border: 1px solid white; padding: 10px 0; }
    #lets:hover { color: #493e66; background: rgb(255, 255, 255); }
</style>
