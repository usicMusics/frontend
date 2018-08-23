<template>
  <div id='userList' v-cloak>
      <loading :active.sync="isLoading" :is-full-page="true">
      </loading>
      <h1>회원 관리</h1>
      <table>
        <colgroup>
          <col style="width:10%;">
          <col style="width:30%;">
          <col style="width:30%;">
          <col style="width:15%;">
          <col style="width:15%;">
        </colgroup>
        <thead>
          <tr>
              <th>번호</th>
              <th>회원이름</th>
              <th>닉네임</th>
              <th>관리자</th>
              <th>삭제</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(user, index) in users" :key="index">
              <td>{{index + 1}}</td>
              <td>{{user.username}}</td>
              <td>{{user.nickname}}</td>
              <td>
                <button class="btn enable" v-if="user.admin" @click="assignAdmin(user.username)">ENABLE</button>
                <button class="btn disable" v-else @click="assignAdmin(user.username)">DISABLE</button>
              </td>
              <td><i @click="userDelete(user._id)" class="del far fa-trash-alt">삭제</i></td>
          </tr>
          </tbody>
          </table>
          <a href="/" class="last" id="index">Home @ usicMusic</a>
  </div>
</template>

<script>
import Loading from 'vue-loading-overlay'

export default {
  name: 'UserList',
  data () {
    return {
      users: '',
      isLoading: 'false'
    }
  },
  components: {
    Loading
  },
  mounted () {
    this.isLoading = true
    this.$http.get(`/api/user/list`)
      .then(response => {
        this.users = response.data.users
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
    assignAdmin: function (username) {
      // console.log(username)
      this.$http.post(`/api/user/assign-admin/${username}`)
        .then(response => {
          console.log(response)
          this.$js.alert(response.data.message, null, this.$js.Icons.Success, '확인').then(() => {
            location.reload()
          })
        }).catch(error => {
          console.log(error)
        }).then(() => {
        })
    },
    userDelete: function (id) {
      this.$js.confirm('정말 회원을 삭제하시겠습니까?', null, this.$js.Icons.Warning, '확인', '취소').then(result => {
        if (!result) return
        this.$http.delete(`/api/user/${id}`).then(response => {
          this.$js.alert('삭제 완료', null, this.$js.Icons.Deleted, '확인').then(() => {
            location.reload()
          })
        }).catch(error => {
          console.log(error)
          this.$js.alert('삭제 실패', null, this.$js.Icons.Warning, '확인')
        })
      })
    }
  }
}
</script>

<style scoped>
[v-cloak] {
  display: none;
}
#userList h1 {
  background: url('../../assets/back.png');
  background-position: 20% 10%;
  background-size: 100%;
  color: white;
  line-height: 150px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}
#userList table {
  margin-top: 20px;
  width: 84% !important;
  text-align: center;
  margin-left: 8%;
}
#userList * {
  border-radius: .2em;
}
#userList {
  border-radius: .2em;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  background-color: #fff;
  box-shadow: 1px 1px 1px 1px lightgray;
  width: 32%;
  height: 53%;
  margin: auto;
  text-align: center;
}
#userList table th {
  color: rgb(204, 77, 115);
  padding: 10px 0;
}
#userList table td {
  padding: 5px 0;
}
#userList table {
  width: 100%;
  border-collapse: collapse;
}
#userList .btn {
  cursor: pointer;
  background: none;
  border: 1px solid rgb(204, 77, 115);
  color:rgb(204, 77, 115);
  width: 80%;
}
#userList .btn:hover {
  background: rgb(204, 77, 115);
  color: white;
}
.enable {
  background: rgb(204, 77, 115) !important;
  color: white !important;
}
.enable:hover {
  background: none !important;
  color: rgb(204, 77, 115) !important;
}
#userList .last {
  top: 30px !important;
  position: relative;
}
#userList tbody tr:hover {
  background-color: rgb(245,245,245);
}
.del {
  cursor: pointer;
  color: #666;
}
.del:hover {
  color: rgb(204, 77, 115);
}
</style>
