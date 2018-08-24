<template>
  <div id="sourceList" class="music">
    <div>
      <modal id="createSource" name="createSource" class="modal">
        <h2 class="modal-header"><span>소스 생성</span><span class="btn-close" @click="$modal.hide('createSource')">&times;</span></h2>
        <div style="padding:5% 8%; width:100%;">
          <div style="float: left; padding-left:20px; line-height:28px">
              <form v-on:submit.prevent="createSource">
                <input type="text" id="pattern" placeholder="x_x_x--">
                <input type="text" id='musicName' placeholder="음악이름">
                <input type="submit" value="음악 소스 등록">
              </form>
          </div>
        </div>
      </modal>
      <modal id="uploadSource" name="uploadSource" class="modal">
        <h2 class="modal-header"><span>소스 등록</span><span class="btn-close" @click="$modal.hide('uploadSource')">&times;</span></h2>
        <div style="margin: 5% 10%;width:80% !important;">
          <form id="uploadForm" @submit.prevent="uploadMusic()" method="post" enctype="multipart/form-data">
            <input type="text" style="width:95%; margin-bottom: 10px;" class="inputtitle" name="title" id="title" placeholder="SourceName">
            <input type="text" class="input" name="artist" id="artist" v-bind:value="username" style="display:none;" placeholder="아티스트"><br>
            <label for="music"  style="width:95%; padding: 30px 10px; !important" id="musicLabel" class="iform"><i class="fas fa-file fa-lg"></i> UPLOAD FILE</label><input @change="uploadedMusic()" type="file" id="music" name="music" style="display:none">
            <input type="submit" style="width:95%; margin-top: 10px;" class="btn" value="등록">
          </form>
        </div>
      </modal>
      <modal id="viewSource" name="viewSource" class="modal">
          <h2 class="modal-header"><span>소스 상세보기</span><span class="btn-close" @click="$modal.hide('viewSource')">&times;</span></h2>
        <div class="modal-body">
          <img width="150px" style="float: left;" v-bind:src="this.$baseURL + music.cover" alt="">
          <div class="form-group" style="float: right; width:50%">
            <h3 class="modal-title">{{ music.title }}</h3>
            <p>ARTIST: {{ music.artist }}</p>
            <p>LIKE: {{music.rate.length}}</p>
            <p>TYPE: <span v-if="music.isMusic">MUSIC</span><span v-else>SOURCE</span></p>
            <p><button v-if="likeChk(music.rate)" @click="unlike(music._id)" class="btn ubtn">UNFAVORITE</button><button v-else @click="like(music._id)" class="btn">+ FAVORITE</button></p>
          </div>
        </div>
      </modal>
      <context-menu id="context-menu" ref="ctxMenu" @ctx-open="ctxOpen">
        <span v-if="chk">
          <li @click="$modal.show('viewSource')">상세 정보보기</li>
          <li @click="removeMusicSource()">삭제하기</li>
        </span>
        <span v-else>
          <li @click="$modal.show('uploadSource')">소스 등록하기</li>
          <li>소스 만들기</li>
          <li onclick="location.href='/music'">음악 목록</li>
        </span>
      </context-menu>
    </div>
    <div class="box">
      <h2 class="title">Music Sources</h2>
      <div class="list" @contextmenu.prevent="$refs.ctxMenu.open($event, music)">
        <h2>SOURCE LIST</h2>
        <draggable :options="{group:'music'}" @start="drag=true" @add="unrate($event)" @end="drag=false">
          <div v-if="!music.isMusic && rateChk(music)" v-bind:name="music._id" v-for="(music, index) in musics" :key="index" v-bind:id="'Source' + (index + 1)" @contextmenu.prevent="$refs.ctxMenu.open($event, music)"></div>
        </draggable>
      </div>
      <div class="list" @contextmenu.prevent="$refs.ctxMenu.open($event, music)">
        <h2>FAVORITE</h2>
        <draggable :options="{group:'music'}" @start="drag=true" @add="rate($event)" @end="drag=false">
          <div v-if="!music.isMusic && !rateChk(music)" v-bind:name="music._id" v-for="(music, index) in musics" :key="index" v-bind:id="'Source' + (index + 1)"  @contextmenu.prevent="$refs.ctxMenu.open($event, music)"></div>
        </draggable>
      </div>
      <!-- <button @click="$modal.show('uploadSource')">소스 등록</button> -->
      <a href="/" class="btn-home">Home @ usicMusic</a>
    </div>
    <section id="trash">
      <draggable :options="{group:'music'}" @start="drag=true" @add="remove($event)" @end="drag=false">
        <span class="trash">
          <span></span>
          <i></i>
        </span>
      </draggable>
    </section>
  </div>
</template>

<script>
import Aplayer from 'aplayer'
import draggable from 'vuedraggable'
import contextMenu from 'vue-context-menu'

export default {
  name: 'SourceList',
  data () {
    return {
      musics: '',
      music: {rate: {}, length},
      username: '',
      chk: ''
    }
  },
  components: {
    draggable,
    contextMenu
  },
  mounted () {
    this.username = localStorage['username']
    this.$http.get('/api/music').then(response => {
      console.log(response.data)
      this.musics = response.data.music
    }).catch(error => {
      console.log(error)
    }).then(() => {
      var sources = []
      for (var i = 1; i <= this.musics.length; i++) {
        if (this.musics[i - 1].isMusic) continue
        sources[i] = new Aplayer({
          container: document.getElementById(`Source${i}`),
          mini: true,
          audio: [{
            name: this.musics[i - 1].title,
            artist: this.musics[i - 1].artist,
            url: this.$baseURL + this.musics[i - 1].music,
            cover: this.$baseURL + this.musics[i - 1].cover
          }]
        })
        sources[i].pause()
      }
    })
  },
  methods: {
    remove: function ($event) {
      var id = $event.item.attributes.name.value
      this.$js.confirm('정말 삭제하시겠습니까?', null, this.$js.Icons.Warning, '확인', '취소').then(result => {
        if (!result) return
        this.$http.delete(`/api/music/${id}`).then(response => {
          console.log(response)
          this.$js.alert('삭제 완료', null, this.$js.Icons.Deleted, '확인')
        })
      }).catch(error => {
        location.reload()
        console.log(error)
      }).then(() => {
        location.reload()
      })
    },
    rate: function ($event) {
      var username = localStorage['username']
      var id = $event.item.attributes.name.value
      this.$http.post(`/api/music/${id}/rate`, {username}).then(response => {
        console.log(response)
      })
    },
    rateChk: function (music) {
      var username = localStorage['username']
      console.log(music)
      for (var i = 0; i < music.rate.length; i++) {
        if (username === music.rate[i].username) {
          return false
        }
      }
      return true
    },
    unrate: function ($event) {
      var username = localStorage['username']
      var id = $event.item.attributes.name.value
      this.$http.delete(`/api/music/${id}/rate/${username}`).then(response => {
        console.log(response)
      }).catch(error => {
        location.reload()
        console.log(error)
      })
    },
    removeMusicSource: function () {
      // console.log(event)
      this.$js.confirm('정말 삭제하시겠습니까?', null, this.$js.Icons.Warning, '확인', '취소').then(result => {
        if (!result) return
        this.$http.delete(`/api/music/${this.music._id}`).then(response => {
          console.log(response)
          this.$js.alert('삭제 완료', null, this.$js.Icons.Deleted, '확인')
        })
      }).catch(error => {
        location.reload()
        console.log(error)
      }).then(() => {
        location.reload()
      })
    },
    ctxOpen: function (locals, $event) {
      if (event.target.className === 'list') {
        this.chk = 0
      } else {
        this.chk = 1
      }
      this.music = locals
    },
    createSource: function () {
      let title = document.getElementById('musicName').value
      const pattern = document.getElementById('pattern').value
      const artist = localStorage['username']
      this.$http.post('/api/music/source', {title, artist, isMusic: false, pattern}).then(response => {
        this.$js.alert('음악 소스를 생성했습니다', null, this.$js.Icons.Success, '확인').then(() => {
          location.href = './'
        })
        console.log(response)
      }).catch(error => {
        this.$js.alert('음악소스를 만들지 못했습니다', null, this.$js.Icons.Warning, '확인')
        console.log(error)
      })
    },
    uploadMusic: function () {
      console.log('1')
      const form = document.getElementById('uploadForm')
      let formData = new FormData(form)
      this.$http.post('/api/music/upload', formData).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      }).then(() => {
        location.reload()
      })
    },
    likeChk: function (rate) {
      var username = localStorage['username']
      for (var i = 0; i < rate.length; i++) {
        return username === rate[i].username
      }
    },
    like: function (id) {
      var username = localStorage['username']
      this.$http.post(`/api/music/${id}/rate`, { username }).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
      location.reload()
    },
    unlike: function (id) {
      console.log(id)
      var username = localStorage['username']
      this.$http.delete(`/api/music/${id}/rate/${username}`).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
      location.reload()
    },
    uploadedMusic: function () {
      var fileName = event.target.files[0].name
      console.log(fileName)
      if (fileName !== undefined) document.getElementById('musicLabel').innerHTML = fileName
    }
  }
}
</script>

<style scoped>
.btn {
  color: rgb(219, 86, 104);
  background-color: #fff;
  border: 1px solid rgb(219, 86, 104);
  border-radius: 2px;
  /* padding: 0 10px !important; */
  /* line-height: 30px; */
}
#uploadSource form {padding: 5% 10% !important; width: 100% !important;}
.btn:hover {
  color: white;
  background-color: rgb(219, 86, 104);
}
.inputtitle {
  outline: none;
  border: none;
  border-bottom: 1px solid lightgray;
  line-height: 25px;
}
.inputtitle:focus {
  border-bottom: 1px solid rgb(219, 86, 104);
}
#context-menu ul {
  padding: 0;
}
#context-menu li {
  cursor: pointer;
  padding: 5px 10px;
}
#context-menu li:hover {
  background-color: rgb(245, 245, 245);
}
.ubtn {
  background: rgb(219, 86, 104);
  color: white;
}
.ubtn:hover {
    color:  rgb(219, 86, 104);
  background: none;
  border: 1px solid rgb(219, 86, 104);
}
.box > div {
  float: left;
  margin-left: 38px;
  margin-top: 60px !important;
  width: 43.8%;
  height: 300px;
  background-color: rgb(252,252,252);
  box-shadow: 1px 1px 2px 1px lightgray inset;
  padding: 12px;
}
.box {
  width: 700px;
}
.box > div:nth-child(3) {
  margin-right:20px;
  margin-left: 22px;
  margin-bottom: 30px;
}
.iform:hover *, .iform:hover {
  color: rgb(219, 86, 104);
}
.iform {
  margin: 0 !important;
  cursor: pointer;
  color: rgb(160, 160, 160);
}
.iform * {
  color: rgb(160, 160, 160);
}
.box > div > div {
  margin: 18px !important;
}
#sorceList > div > div:nth-child(n+2) {
  margin-left: 0 !important;
}
.box > div > h2 {
  font-size: 1.2em;
  font-weight: bold;
  color: rgb(255, 149, 158);
  background-color: #fff;
  margin-top:-45px;
  margin-bottom: 20px !important;
}
.aplayer  {
  float: left;
  transform: scale(1.24);
}
section {
  position: fixed;
  left: 0;
  bottom: 0;
  margin:0;
  display: flex;
  padding:20px;
  align-items: center;
}
.trash {
  background: #c5aeb0;
  width: 66px;
  height: 80px;
  display: inline-block;
  margin:0 auto;
  position: relative;
  -webkit-border-bottom-right-radius: 6px;
  -webkit-border-bottom-left-radius: 6px;
  -moz-border-radius-bottomright: 6px;
  -moz-border-radius-bottomleft: 6px;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
}
.trash:after {
  position: absolute;
  left: -99px;
  right: 0;
  bottom: -50px;
  width: 300px;
}
.trash span {
  position: absolute;
  height: 12px;
  background: #c5aeb0;
  top: -19px;
  left: -10px;
  right: -10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transform: rotate(0deg);
  transition: transform 250ms;
  transform-origin: 19% 100%;
}
.trash span:after {
  content: '';
  position: absolute;
  width: 27px;
  height: 7px;
  background: #c5aeb0;
  top: -10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  transform: rotate(0deg);
  transition: transform 250ms;
  transform-origin: 19% 100%;
  left: 27px;
}
.trash i {
  position:relative;
  width: 5px;
  height:50px;
  background:rgb(245, 245, 245);
  display:block;
  margin:14px auto;
  border-radius: 5px;
}
.trash i:after {
  content: '';
  width: 5px;
  height: 50px;
  /* background: #fff; */
  background:rgb(245, 245, 245);
  position: absolute;
  left: -18px;
  border-radius: 5px;
}
.trash i:before {
  content: '';
  width: 5px;
  height: 50px;
  background:rgb(245, 245, 245);
  position: absolute;
  right: -18px;
  border-radius: 5px;
}
.trash:hover span {
  transform: rotate(-45deg);
  transition: transform 250ms;
}
#trash > div > *:not(span) {
  visibility: hidden;
  margin-left: -1000px;
  float: left;
  width: 0;
  height: 0;
}
</style>
