<template>
  <div id="boardList" class="board">
    <div>
      <modal name="creBoardModal" class="modal">
        <h2 class="modal-header"><span>글 작성</span><span class="btn-close" @click="$modal.hide('creBoardModal')">&times;</span></h2>
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
      <modal name="viewBoardModal" class="modal">
        <h2 class="modal-header"><span>글 보기</span><span class="btn-close" @click="$modal.hide('viewBoardModal')">&times;</span></h2>
        <div class="modal-body">
          <div>
            <p><strong>제목: {{board.title}}</strong>&nbsp;&nbsp;&nbsp;&nbsp;작성자: {{board.writer}}</p>
            <pre>내용: {{board.content}}</pre>
            <div class="btns">
              <button class="btn" @click="modifyForm(board)">수정</button>
              <button class="btn" @click="del(board._id, board.writer)">삭제</button>
            </div>
            <form @submit.prevent="comment(board._id)">
              <div class="form-group">
              <input type="text" name="comment" placeholder="comment" id="comment" style="width: 80% !important" @keyup.enter="comment">
              <button type="submit" class="btn btn-comment">댓글</button>
              </div>
            </form>
            <div  id="commentList">
            <table>
              <colgroup>
                <col width="5%">
                <col width="80%">
                <col width="15%">
              </colgroup>
              <tr v-if="board.comments.length" v-for="comment in board.comments" :key="comment._id">
                <td>{{comment.name}}:</td>
                <td>{{comment.comment}}</td>
                <td><button @click="deleteComment(board._id, comment._id, comment.name)" class="btn btn-delete">삭제</button></td>
              </tr>
              <tr v-else>
                <td colspan="4">댓글이 없습니다</td>
              </tr>
            </table>
            </div>
          </div>
        </div>
      </modal>
      <modal name="editBoardModal" class="modal">
        <h2 class="modal-header"><span>글 수정</span><span class="btn-close" @click="$modal.hide('editBoardModal')">&times;</span></h2>
        <div>
          <div>
            <form action='' method="post" @submit.prevent="edit(board._id)" enctype="multipart/form-data">
              <input type="text" name="title" placeholder="글 제목" id="etitle" v-bind:value="board.title">
              <textarea size="1" type="text" name="content" placeholder="글 내용" id="econtent" v-bind:value="board.content"></textarea><br>
              <input type="submit" value="글 수정" class="btn">
            </form>
          </div>
        </div>
      </modal>
    </div>
    <div class="wrap">
      <h2 class="title">게시판</h2>
      <div class="table-wrap">
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
            <td class="btitle" @click="viewBoard(board)">{{board.title}}</td>
            <td>{{board.writer}}</td>
            <td>{{date(board.date)}}</td>
            <td>{{board.count}}</td>
            </tr>
            <tr v-else>
              <td colspan="5">게시글이없습니다</td>
            </tr>
          </tbody>
      </table>
      </div>
      <button class="btn btn-write" @click="$modal.show('creBoardModal')">WRITE</button><br>
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
      boards: '',
      board: {comments: { length: 0 }}
    }
  },
  mounted () {
    this.getBoard()
  },
  methods: {
    move: function () {
      location.href = '/api/board/write/'
    },
    view: function (id) {
      location.href = '/api/board/view/viewBoard=' + id
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
            this.$http.get(`/api/board/${id}`).then(res => {
              this.$modal.hide('viewBoardModal')
              this.viewBoard(res.data.message)
              this.getBoard()
            })
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
              this.$http.get(`/api/board/${id}`).then(res => {
                this.$modal.hide('viewBoardModal')
                this.viewBoard(res.data.message)
                this.getBoard()
              })
            })
        })
      } else {
        this.$js.alert('권한이 없습니다', null, this.$js.Icons.Warning, '확인')
      }
    },
    modifyForm: function (board) {
      if (board.writer !== localStorage['username']) {
        this.$js.alert('권한이 없습니다', null, this.$js.Icons.Warning, '확인')
      } else {
        this.$modal.hide('viewBoardModal')
        this.$modal.show('editBoardModal')
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
            this.$http.get(`/api/board/${id}`).then(res => {
              this.$modal.hide('editBoardModal')
              this.viewBoard(res.data.message)
            })
            this.getBoard()
          })
        }).catch(e => {
          console.log(e)
        })
    },
    viewBoard: function (board) {
      this.board = board
      this.$modal.show('viewBoardModal')
      this.addCount(board._id)
    },
    getBoard: function () {
      this.$http.get(`/api/board`)
        .then((result) => {
          this.boards = result.data.boards
        })
    }
  }
}
</script>

<style scoped>
.wrap {
  height: 700px;
  width: 800px;
}
.form-group {
  margin: 0 0 10px 0;
}
.form-group input {
  margin-left: 0;
}
.btns { float: right; }
.btn {
  position: relative;
  margin: 10px 0 20px 0;
  color: rgb(204, 105, 105);
  border: 1px solid rgb(204, 105, 105);
  background-color: #fff;
  padding: 5px 20px !important;
}
.btn:hover { color: white; background-color: rgb(204, 105, 105); }
.btn-delete {
  float: right;
  font-size: .8em !important;
  padding: 4px 10px !important;
  width: 60px !important;
  margin: 4px 0 !important;
}
.btn-comment { width: 18.5% !important; }
.btn-write { position: relative; transform: translateX(360%)}
.wrap .table-wrap table {
  border-collapse: collapse;
  width: 80%;
  margin-top: 20px;
  margin-left:10%;
}
.wrap .btitle {
  color: rgb(204, 105, 105) !important;
  cursor: pointer;
}
.wrap .btitle:hover {
  color: rgb(145, 98, 255) !important;
}
.wrap .table-wrap table thead * {
  color: rgb(204, 105, 105);
}
.wrap .table-wrap table thead tr {
  line-height: 40px;
}
.wrap .table-wrap table tbody tr {
  line-height: 30px;
}
.wrap .table-wrap table tbody tr:hover {
  background-color: rgb(245, 245, 245);
}
.wrap .table-wrap > table {
  padding: 10px 10%;
}
.wrap #title, #etitle {
  outline: none;
  border: none;
  border-bottom: 1px solid gray !important;
  padding: 3px 0;
  margin-bottom: 7px;
}
.wrap #content, #econtent {
  border-radius: 2px;
  height: 200px !important;
  resize: none;
  outline: none;
}
.table-wrap {
  height: 390px;
  overflow-y: scroll;
}
</style>
