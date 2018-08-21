<template>
  <div id="musicList">
    <modal id="createForm" name="createForm" class="modal">
      <h2 class="modal-header" style="text-align: right; line-height:45px; color:white;">음악 등록
        <span style="padding-left:158px; cursor:pointer; padding-right:16px; font-size:.8em; color:white;" @click="$modal.hide('createForm')">X</span>
      </h2>
      <div style="padding:5% 8%; width:100%;">
        <div style="float: left; padding-left:20px; line-height:28px">
          <form v-on:submit.prevent="createMusic()" method="post" enctype="multipart/form-data" style="">
            <label for="cover" style="cursor:pointer;"><img width="150px" id="coverImg" style="float: left; margin-right:15px;" v-bind:src="'/cover/cover.jpg'" alt=""></label>
            <input type="file" @change="previewImage('coverImg')" id="cover" name="cover" style="display:none">
            <input type="text" class="input" name="title" id="title" placeholder="타이틀">
            <input type="text" class="input" name="artist" id="artist" placeholder="아티스트"><br>
            <label for="music" id="musicLabel" class="iform">*upload to music</label><input type="file" name="music" id="music" style="display:none" @change="uploadedMusic()"><br>
            <label for="lrc" id="lrcLabel" class="iform">upload to lrc</label><input type="file" name="lrc" id="lrc" style="display:none" @change="uploadedLrc()"><br>
            <input type="submit" class="subbtn" value="등록">
          </form>
        </div>
      </div>
    </modal>
    <h1 style="font-size: 3.5em;">MUSIC</h1>
    <div id="ranking">
      <h2 style="letter-spacing: .1em; font-size:1.2em; margin-top:20px;">RANKING</h2>
      <div id="ranking2"></div>
      <div id="ranking1"></div>
      <div id="ranking3"></div>
    </div>
    <ul id="musics">
      <h2>MUSIC LIST</h2>
      <draggable @start="drag=true" @end="drag=false">
        <li v-if="music.isMusic" v-for="(music, index) in musics" :key="index">
          <div v-bind:id="'Music' + (index + 1)" style="cursor:pointer" @click="rate(index + 1)"></div>
          <modal v-bind:name="'modal' + (index + 1)" class="modal">
            <h2 class="modal-header" style="text-align: right; line-height:45px; color:white;">음악 상세보기<span style="padding-left:124px; cursor:pointer; padding-right:16px; font-size:.8em; color:white;" @click="$modal.hide('modal' + (index + 1))">X</span></h2>
            <div style="padding:5% 8%; width:100%;">
              <img width="150px" style="float: left;" v-bind:src="this.$baseURL + music.cover" alt="">
              <div style="float: left; padding-left:20px; line-height:28px">
                <h3 class="modal-title">{{ music.title }}</h3>
                <p>ARTIST: {{ music.artist }}</p>
                <p>LIKE: {{music.rate.length}}</p>
                <p>TYPE: <span v-if="music.isMusic">MUSIC</span><span v-else>SOURCE</span></p>
                <p><button v-if="rateCheck(music.rate)" @click="unlike(music._id)" class="ubtn">UNLIKE</button><button v-else @click="like(music._id)" class="mbtn">+ LIKE</button>
                <button v-if="listCheck(music)" @click="removePlaylist(music)" class="ubtn">UNPLAYLIST</button><button v-else @click="addPlaylist(music)" class="mbtn">+ PLAYLIST</button></p>
              </div>
            </div>
          </modal>
        </li>
      </draggable>
      <li></li>
      <div style="margin-top:40px;margin-right: -320px; position:relative; padding:10px;">
        <button class="mbtn" @click="$modal.show('createForm')">음악 등록</button>
        <button class="mbtn" onclick="location.href='/music/source'" style="margin:0;">음악 소스 창고</button>
      </div>
    </ul>
    <div id="playmusic">
      <h2>PLAY LIST</h2>
      <div id="playlist"><span style="line-height: 100px !important;">재생목록이 없습니다.</span></div>
    </div>
    <a href="/" style="position:relative;top: 150px; left:-230px; color:gray;">Home @ usicMusic</a>
    <div id='fixed'></div>
  </div>
</template>

<script>
import Aplayer from 'aplayer'
import draggable from 'vuedraggable'

export default {
  name: 'MusicList',
  data () {
    return {
      musics: '',
      rank1: '',
      rank2: '',
      rank3: ''
    }
  },
  components: {
    draggable
  },
  mounted () {
    // var baseURL = 'http://localhost:3000'
    var playlist = []
    if (localStorage['playlist'] === undefined) localStorage['playlist'] = JSON.stringify(playlist)
    playlist = JSON.parse(localStorage['playlist'])
    this.$http.get('/api/music').then(response => {
      console.log(response.data.music)
      this.musics = response.data.music
      // 정렬
      var ranking = this.musics.sort(function (a, b) {
        return b.rate.length - a.rate.length
      })
      this.rank1 = ranking[0]
      this.rank2 = ranking[1]
      this.rank3 = ranking[2]
    }).catch(error => {
      console.log(error)
    }).then(() => {
      var arr = []
      // console.log(this.musics)
      for (var i = 0; i < this.musics.length; i++) {
        if (!this.musics[i].isMusic) continue
        arr[i] = new Aplayer({
          container: document.getElementById(`Music${i + 1}`),
          // mini: true,
          audio: [{
            name: this.musics[i].title,
            artist: this.musics[i].artist,
            url: this.$baseURL + this.musics[i].music,
            cover: this.$baseURL + this.musics[i].cover
          }]
        })
        arr[i].pause()
      }
      // 랭킹 1
      var ranking1 = new Aplayer({
        container: document.getElementById('ranking1'),
        mini: true,
        audio: [{
          name: this.rank1.title,
          artist: this.rank1.artist,
          url: this.$baseURL + this.rank1.music,
          cover: this.$baseURL + this.rank1.cover
        }]
      })
      ranking1.pause()
      console.log('' + this.rank2)

      // 랭크 2
      var ranking2 = new Aplayer({
        container: document.getElementById('ranking2'),
        mini: true,
        audio: [{
          name: this.rank2.title,
          artist: this.rank2.artist,
          url: this.$baseURL + this.rank2.music,
          cover: this.$baseURL + this.rank2.cover
        }]
      })
      ranking2.pause()
      // 랭크 3
      var ranking3 = new Aplayer({
        container: document.getElementById('ranking3'),
        mini: true,
        audio: [{
          name: this.rank3.title,
          artist: this.rank3.artist,
          url: this.$baseURL + this.rank3.music,
          cover: this.$baseURL + this.rank3.cover
        }]
      })
      ranking3.pause()
      // 플레이리스트
      if (playlist.length !== 0) {
        const playlistPlayer = new Aplayer({
          container: document.getElementById('playlist'),
          mini: false,
          autoplay: false,
          theme: '#FADFA3',
          loop: 'all',
          order: 'random',
          preload: 'auto',
          volume: 0.7,
          mutex: true,
          listFolded: false,
          listMaxHeight: 90,
          lrcType: 3,
          audio: playlist
        })
        playlistPlayer.pause()
      }

      // ranking 3 music fixed
      const fixed = new Aplayer({
        container: document.getElementById(`fixed`),
        fixed: true,
        lrcType: 3,
        audio: [
          {
            name: this.rank1.title,
            artist: this.rank1.artist,
            url: this.$baseURL + this.rank1.music,
            cover: this.$baseURL + this.rank1.cover,
            lrc: this.$baseURL + this.rank1.lrc
          },
          {
            name: this.rank2.title,
            artist: this.rank2.artist,
            url: this.$baseURL + this.rank2.music,
            cover: this.$baseURL + this.rank2.cover,
            lrc: this.$baseURL + this.rank2.lrc
          },
          {
            name: this.rank3.title,
            artist: this.rank3.artist,
            url: this.$baseURL + this.rank3.music,
            cover: this.$baseURL + this.rank3.cover,
            lrc: this.$baseURL + this.rank3.lrc
          }
        ]
      })
      fixed.pause()
    })
  },
  methods: {
    rate: function (index, $event) {
      var target = event.target.className
      if (target === 'aplayer-music' || target === 'aplayer-info' || target === 'aplayer-author' || target === 'aplayer-title') {
        this.$modal.show(`modal${index}`)
      } else {
        console.log(target)
      }
    },
    addPlaylist: function (music) {
      var playlist = JSON.parse(localStorage['playlist'])
      var the = Math.floor(Math.random() * (1 - 0 + 1)) + 1
      var theme = ['#685eff', '#ff6d8f']
      // var baseURL = 'localhost:3000'
      var data = {}
      data.name = music.title
      data.artist = music.artist
      data.url = this.$baseURL + music.music
      data.cover = this.$baseURL + music.cover
      data.theme = theme[the]
      data.lrc = this.$baseURL + music.lrc
      playlist.unshift(data)
      localStorage['playlist'] = JSON.stringify(playlist)
      location.reload()
    },
    rateCheck: function (rate) {
      var username = localStorage['username']
      for (var i = 0; i < rate.length; i++) {
        if (username === rate[i].username) { return true } else return false
      }
    },
    like: function (id) {
      var username = localStorage['username']
      this.$http.post(`/api/music/${id}/rate`, { username }).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      }).then(() => {
        location.reload()
      })
    },
    unlike: function (id) {
      var username = localStorage['username']
      this.$http.delete(`/api/music/${id}/rate/${username}`).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      }).then(() => {
        location.reload()
      })
    },
    listCheck: function (music) {
      if (localStorage['playlist'] === undefined) return false
      var playlist = JSON.parse(localStorage['playlist'])
      for (var j = 0; j < playlist.length; j++) {
        if (music.title === playlist[j].name) {
          return true
        }
      }
      return false
    },
    removePlaylist: function (music) {
      var playlist = JSON.parse(localStorage['playlist'])
      for (var j = 0; j < playlist.length; j++) {
        if (music.title === playlist[j].name) {
          playlist.splice(j, 1)
        }
      }
      localStorage['playlist'] = JSON.stringify(playlist)
      location.reload()
    },
    show: function (name) {
      this.$modal.show(name)
    },
    previewImage: function (el, $event) {
      var files = event.target.files
      console.log(files[0])
      for (var i = 0; i < files.length; i++) {
        var file = files[i]
        var imageType = /image.*/
        if (!file.type.match(imageType)) continue
        var reader = new FileReader()
        reader.onload = function (e) {
          document.getElementById('coverImg').src = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    uploadedMusic: function ($event) {
      var fileName = event.target.files[0].name
      if (fileName !== undefined) document.getElementById('musicLabel').innerHTML = 'Music: ' + fileName
    },
    uploadedLrc: function ($event) {
      var fileName = event.target.files[0].name
      if (fileName !== undefined) document.getElementById('lrcLabel').innerHTML = 'LRC: ' + fileName
    },
    createMusic: function () {
      const form = document.getElementsByTagName('form')[0]
      let formData = new FormData(form)
      this.$http.post('/api/music', formData).then(response => {
        console.log(response)
      })
      this.$modal.hide('createForm')
    }
  }
}
</script>

<style scoped>
/* 음악 리스트 */
#musics *[class*='aplayer'] {
  cursor: pointer;
}
#musicList {
  margin: 50px auto;
  width: 42%;
  border-radius: 10px;
  box-shadow: 1px 1px 3px 2px lightgray;
  background-color: white;
  height: 800px;
}
#musicList > h1 {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: url('../../assets/back.png');
  background-size: 100%;
  color: white;
  line-height: 180px;
  background-position: 20% 20%;
}
#musicList > #musics, #musicList > #playmusic {
  margin-top: 20px;
  background-color: #fff;
  float: left;
}
#musicList > * > h2 {
  font-size: 1em;
  font-weight: bold;
  padding: 10px 0;
  color: rgb(240, 110, 127);
}
#musics {
  padding-left: 40px;
  width: 55%;
  margin-right: 1%;
}
#musicList #playmusic {
  width: 40%;
}
#createForm h2 span {
  padding-left: 130px !important;
}
#ranking > div {
  cursor: pointer;
  display: inline-block;
  border-radius: 2px;
  margin: 30px;
  transform: scale(1.5)
}
#ranking > div:hover {
  transition: .15s;
  transform: scale(1.4) !important;
}
#ranking > div:nth-child(3) {
  transform: scale(1.8) !important;
}
#ranking > div:nth-child(3):hover {
  transform: scale(1.7) !important;
}
#ranking3:hover {
  transform: scale(1.4) !important;
}
#ranking {
  margin: 0 auto;
  width: 400px;
  height: 150px;
}
#fixed .aplayer-miniswitcher {
  background-color: rgb(255, 255, 255);
}
#musicList .subbtn {
  cursor: pointer;
  margin-top: 5px;
  padding: 4px 60px;
  background: none;
  color: rgb(219, 86, 104);
  border: 1px solid rgb(219, 86, 104);
}
#musicList .subbtn:hover {
  background: rgb(219, 86, 104);
  color: white;
}
#musicList .input {
  border:none;
  outline: none;
  border-bottom: 1px solid gray;
}
.input:focus {
  border-bottom: 1px solid rgb(219, 86, 104);
}
#musicList #heart:hover {
  color: rgb(219, 86, 104);
}
.aplayer *{
  cursor: pointer !important;
}
#musicList .mbtn {
  outline: none;
  cursor: pointer;
  padding: 3px 6px;
  background: none;
  color: rgb(219, 86, 104);
  border: 1px solid rgb(219, 86, 104);
}
#musicList .ubtn {
  outline: none;
  cursor: pointer;
  padding: 3px 6px;
  border: 1px solid rgb(219, 86, 104);
  background-color: rgb(219, 86, 104);
  color: white;
}
#musicList .ubtn:hover {
  color: rgb(219, 86, 104);
  background: none;
}
#musicList .mbtn:last-child {
  margin-left:10px;
}
#musicList .mbtn:hover {
  background-color: rgb(219, 86, 104);
  color: white;
}
#musicList .iform {
  cursor: pointer;
}
#musicList .iform:hover {
  color: rgb(219, 86, 104);
}
#musicList #coverImg:hover {
  transform: scale(.98)
}
</style>
