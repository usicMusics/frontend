<template>
  <div id='userList' class="user">
      <div class="box">
      <h2 class="title">회원 관리</h2>
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
              <td><span @click="userDelete(user._id)" class="del far fa-trash-alt">삭제</span></td>
          </tr>
          </tbody>
          </table>
          <a href="/" class="btn-home">Home @ usicMusic</a>
      </div>
  </div>
</template>

<script>
export default {
  name: 'UserList',
  data () {
    return {
      users: ''
    }
  },
  mounted () {
    this.$http.get(`/api/user/list`)
      .then(response => {
        this.users = response.data.users
      }).catch(error => {
        console.log(error)
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
.box {
  height: 500px;
}
.box table {
  margin-top: 20px;
  width: 84% !important;
  text-align: center;
  margin-left: 8%;
}
.box table th {
  color: rgb(204, 77, 115);
  padding: 10px 0;
}
.box table td {
  padding: 5px 0;
}
.box table {
  width: 100%;
  border-collapse: collapse;
}
.btn {
  padding: 4px 5px !important;
  background: white;
  border: 1px solid rgb(204, 77, 115);
  color:rgb(204, 77, 115);
  width: 80%;
}
.box .btn:hover {
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
.box .last {
  top: 30px !important;
  position: relative;
}
.box tbody tr:hover {
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
