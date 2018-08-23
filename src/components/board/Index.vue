<template>
  <div id="boardList">
    <modal name="creBoardModal" class="modal">
      <h2 class="modal-header">
        <span>글 작성</span><span class="btn-close" @click="$modal.hide('creBoardModal')">&times;</span></h2>
      <div class="modal-body">
        <div>
          <form action='#' method="post" @submit.prevent="write()" enctype="multipart/form-data">
            <div class="form-group">
              <input type="text" name="title" placeholder="글 제목" id="title">
            </div>
            <textarea size="1" type="text" name="content" placeholder="글 내용" id="content"></textarea><br>
            <input type="submit" value="글 작성" class="btn">
          </form>
        </div>
      </div>
    </modal>
    <div class="box">
    <h2 style="font-size:2em;">게시판</h2>
    <table>
      <col width="5%">
      <col width="48%">
      <col>
      <col>
      <col width="7%">
      <thead>
        <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
            <th>조회수</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="boards" v-for="(board, index) in boards" :key="board._id">
          <td>{{index + 1}}</td>
          <td class="btitle" @click="$modal.show('viewBoardModal' + (index + 1)); addCount(board._id)">{{board.title}}</td>
          <td>{{board.writer}}</td>
          <td>{{date(board.date)}}</td>
          <td>{{board.count}}</td>
          <modal v-bind:name="'viewBoardModal' + (index + 1)" class="modal">
            <h2 class="modal-header" style="text-align:right">글 보기
              <span style="padding-left:140px; cursor:pointer; padding-right:16px; font-size:.8em; color:white;" @click="$modal.hide('viewBoardModal' + (index + 1))">X</span></h2>
              <div style="padding:5% 8%; width:100%;">
                <div style="float: left; padding-left:20px; line-height:28px">
                  <p><strong>제목: {{board.title}}</strong>&nbsp;&nbsp;&nbsp;&nbsp;작성자: {{board.writer}}</p>
                  <pre>내용: {{board.content}}</pre>
                  <button class="btn" style="padding:2px 20px !important; margin-top:110px; margin-left: -70px;" @click="modifyForm(board, index)">수정</button>
                  <button class="btn" style="padding:2px 20px !important; margin-top:100px;" @click="del(board._id, board.writer)">삭제</button>
                  <form @submit.prevent="comment(board._id); $modal.hide('viewBoardModal' + (index + 1));">
                    <input type="text" name="comment" class="comment" placeholder="comment" id="comment" @keyup.enter="comment">
                    <button type="submit" class="cbtn">댓글</button>
                  </form>
                  <table id="commentTable" style="margin: 0px;">
                    <col width="5%">
                    <col width="80%">
                    <col width="15%">
                      <tr v-if="board.comments.length !== 0" v-for="comment in board.comments" :key="comment._id">
                      <td>{{comment.name}}:</td>
                      <td style="text-align:left; padding-left:15px">{{comment.comment}}</td>
                      <td><button @click="deleteComment(board._id, comment._id, comment.name)" id="commentDelete">삭제</button></td>
                    </tr>
                    <tr v-else>
                      <td colspan="4">댓글이 없습니다</td>
                    </tr>
                </table>
                </div>
              </div>
            </modal>
            <modal alt="aa" v-bind:name="'editBoardModal' + (index + 1)" class="modal">
              <h2 class="modal-header" style="text-align:right">글 수정
                <span style="padding-left:178px; cursor:pointer; padding-right:16px; font-size:.8em; color:white;" @click="$modal.hide('editBoardModal' + (index + 1))">X</span></h2>
              <div style="padding:5% 8%; width:100%;">
                <div style="float: left; padding-left:20px; line-height:28px">
                  <form action='' method="post" @submit.prevent="edit(board._id)" enctype="multipart/form-data">
                    <input type="text" style="width:375px" name="title" placeholder="글 제목" id="etitle" v-bind:value="board.title">
                    <textarea style="width:375px; height:120px;" size="1" type="text" name="content" placeholder="글 내용" id="econtent" v-bind:value="board.content"></textarea><br>
                    <input type="submit" value="글 수정" class="tbtn btn">
                  </form>
                </div>
              </div>
            </modal>
          </tr>
          <tr v-else>
            <td colspan="5">게시글이없습니다</td>
          </tr>
        </tbody>
    </table>
      <button class="btn" @click="test()">WRITE</button><br>
      <a href="/" style="margin-top:20px; font-size:1em;" class="btn-home">Home @ usicMusic</a>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'BoardList',
  data () {
    return {
      boards: ''
    }
  },
  mounted () {
    this.$http.get(`/api/board`)
      .then((result) => {
        this.boards = result.data.boards
      })
  },
  methods: {
    move: function () {
      location.href = '/api/board/write/'
    },
    view: function (id) {
      location.href = '/api/board/view/test=' + id
      return false
    },
    write: function () {
      const title = document.getElementById('title').value
      const content = document.getElementById('content').value
      const writer = localStorage.getItem('username')
      this.$http.post('/api/board', {title, content, writer})
        .then((response) => {
          console.log(response.data)
        }).catch((error) => {
          console.log(error)
        }).then(
          location.reload()
        )
    },
    date: function (date) {
      console.log(date)
      return moment(date).format('YYYY-MM-DD hh:mm')
    },
    del: function (id, writer) {
      if (localStorage['username'] === writer) {
        this.$js.confirm('정말 삭제하시겠습니까?', null, this.$js.Icons.Warning, '확인', '취소').then(result => {
          if (!result) return false
          this.$http.delete(`/api/board/${id}`)
            .then(response => {
              location.replace('/board')
              this.$js.alert('삭제 완료', null, this.$js.Icons.Deleted, '확인')
            })
        })
      } else {
        this.$js.alert('권한이 없습니다', null, this.$js.Icons.Warning, '확인')
      }
    },
    addCount: function (id) {
      this.$http.get(`/api/board/${id}`)
    },
    comment: function (id) {
      const comment = document.getElementById('comment').value
      const name = localStorage['username']
      this.$http.post(`/api/board/${id}/comment`, {name, comment})
        .then((result) => {
          this.$js.alert('댓글이 작성되었습니다', null, this.$js.Icons.Success, '확인').then(() => {
            location.reload()
          })
        })
    },
    // 댓글 삭제
    deleteComment: function (id, cId, cName) {
      const name = localStorage.getItem('username')
      if (name === cName) {
        this.$js.confirm('댓글을 삭제합니다', null, this.$js.Icons.Warning, '확인', '취소').then(result => {
          if (!result) return false
          this.$http.delete(`/api/board/${id}/comment/${cId}`)
            .then((response) => {
              location.reload()
            })
        })
      } else {
        this.$js.alert('권한이 없습니다', null, this.$js.Icons.Warning, '확인')
      }
    },
    modifyForm: function (board, index) {
      if (board.writer !== localStorage['username']) {
        this.$js.alert('권한이 없습니다', null, this.$js.Icons.Warning, '확인')
      } else {
        this.$modal.hide('viewBoardModal' + (index + 1))
        this.$modal.show('editBoardModal' + (index + 1))
      }
    },
    edit: function (id) {
      const title = document.getElementById('etitle').value
      const content = document.getElementById('econtent').value
      const writer = localStorage['username']
      this.$http.put(`/api/board/${id}`, {title, content, writer})
        .then(response => {
          if (response.data.error) throw response.data.error
          this.$js.alert('수정 되었습니다', null, this.$js.Icons.Success, '확인').then(() => {
            location.reload()
          })
        }).catch(e => {
          // this.$js.alert(e)
          console.log(e)
        })
    },
    test: function () {
      this.$modal.show('creBoardModal')
    }
  }
}
</script>

<style scoped>
  .box {
    height: 700px;
  }
.comment {
  width: 260px;
  border: none;
  border-bottom: 1px solid rgb(204, 105, 105);
  outline: none;
}
.form-group {
  margin: 0 0 10px 0;
}
.form-group input {
  margin-left: 0;
}
.cbtn {
  background: none;
  padding: 2px 20px;
  border-radius: 2px;
  border: 1px solid rgb(204, 105, 105);
  color: rgb(204, 105, 105);
}
#commentTable {
  border-collapse: collapse;
  width: 328px !important;
}
#commentDelete {
  cursor: pointer;
  width: 100%;
  outline: none;
  background: white;
  border-radius: 2px;
  padding: 2px 10px;
  color: rgb(204, 105, 105);
  border: 1px solid rgb(204, 105, 105);
}
#commentDelete:hover {
  color: white;
  background: rgb(204, 105, 105);
}
.box > table {
  border-collapse: collapse;
  width: 80%;
  margin-top: 20px;
  margin-left:10%;
}
.box .btitle {
  color: rgb(204, 105, 105) !important;
  cursor: pointer;
}
.box .btitle:hover {
  color: rgb(145, 98, 255) !important;
}
.box > table thead * {
  color: rgb(204, 105, 105);
}
.box > table thead tr {
  line-height: 40px;
}
.box > table tbody tr {
  line-height: 30px;
}
.box > table tbody tr:hover {
  background-color: rgb(245, 245, 245);
}
.box > h2 {
  color:white;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  line-height: 150px;
  background: url('../../assets/back.png');
  background-size: 120%;
  background-position: 10% 12%;
}
.box > *:not(h2) {
  padding: 10px 10%;
}
.box #title, #etitle {
  outline: none;
  border: none;
  border-bottom: 1px solid gray !important;
  padding: 3px 0;
  margin-bottom: 7px;
}
.box #content, #econtent {
  border-radius: 2px;
  height: 200px !important;
  resize: none;
  outline: none;
}
.btn {
  position: relative;
  margin: 10px 0 20px 0;
  color: rgb(204, 105, 105);
  border: 1px solid rgb(204, 105, 105);
  background-color: #fff;
  padding: 5px 20px !important;
}
.btn:hover { color: white; background-color: rgb(204, 105, 105); }
</style>
