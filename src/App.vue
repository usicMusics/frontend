<template>
    <div id="app">
        <!-- router-->
        <router-view/>
    </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
    /* init */
    @font-face {
        font-family: usicMusic;
        src: url('./assets/font/ClementePDae-Light.woff');
    }
    @font-face {
        font-family: goyang;
        src: url('./assets/font/Goyang.ttf');
    }
    #app {
        text-align: center;
    }
    * {
        margin: 0;
        padding: 0;
        color: #333;
        font-family: usicMusic, goyang, serif;
        box-sizing: border-box;
    }
    body {
        background-color: rgb(245, 245, 245);
    }
    h1, h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li a {
        font-size: 1.2em;
    }
    a { text-decoration: none; cursor: pointer; }

    /* box style */
    .box {
        overflow: hidden;
        background-color: white; border-radius: 10px;
        box-shadow: 1px 1px 10px 1px lightgray;
        position: absolute; top: 50%; left: 50%; transform: translateY(-50%) translateX(-50%);
        width: calc(100% * (1/3));
        padding-bottom: 30px;
    }
    .title {
        background: black url('./assets/back.png') no-repeat; background-size: 100%;
        padding: 70px; font-size: 2em; color: white; font-weight: bold;
    }
    /* btn*/
    .btn-group {
        margin-top: 30px;
    }
    .btn { cursor: pointer; border-radius: 4px; padding: 10px;}
    .btn-home { color: gray; font-size: .9em; }
    /* auth btns */
    .auth .btn {
        line-height: 25px;
        display: inline-block;
        width: 45%;
        border: none;
        background-color: rgb(240, 86, 132);
        color: white;
        font-weight: bold;
        margin-right: 5%;
    }
    .auth .btn:hover {
        background-color: rgb(255, 111, 154);
    }
    .auth .btn:nth-child(2) {
        margin-right: 0;
        background-color: rgb(190, 190, 190);
    }
    .auth .btn:nth-child(2):hover {
        background-color: rgb(218, 218, 218);
    }

    form {
        padding: 40px 10%;
    }
    .form-group {
        margin: 15px 0;
    }
    .form-group input {
        font-size: .8em;
        width: 70%;
        margin-left: 10%; margin-top: 5px;
        line-height: 20px;
        border: none; outline: none; color: gray;
        border-bottom: 1px solid gray;
    }
    .form-group input:focus {
        border-bottom: 1px solid rgb(240, 86, 132);
    }

    /* modal */
    .v--modal-overlay {
        background: rgba(0, 0, 0, .3) !important;
    }
    .v--modal {
        border-radius: 5px !important;
    }
    .modal-header { background: url('./assets/back.png'); line-height: 40px; padding: 5px 10px; background-size: 100%; text-align: right; }
    .modal-header span:first-child { color: white; left: 50%; transform: translateX(-50%); position: absolute; }
    .btn-close { cursor: pointer; font-size: 1.4em; color:white; }
    .modal form input, .modal form textarea { width: 100% !important; resize: none !important; }
    .modal form textarea { height: 170px !important; outline: none; }
    .modal form textarea:focus {  border-color: rgb(204, 105, 105); }

    #boardList .v--modal {
        width: 500px !important;
        height: 400px !important;
        position: absolute;
        left: 50% !important;
        top: 50% !important;
        transform: translateX(-50%) translateY(-50%);
    }

    /*#boardList div[alt='aa'] .v--modal {*/
        /*margin: 0 !important;*/
        /*width: 500px !important;*/
        /*margin-left: 50px !important;*/
        /*height: 400px !important;*/
    /*}*/
    #musicList .v--modal {
        margin-left: 70px !important;
        width: 430px !important;
        height: 280px !important;
    }
    #uploadSource .v--modal {
        width: 240px !important;
        margin-left: 180px !important;
        height: 200px !important;
    }
    /*#boardList .v--modal {*/
        /*width: 40% !important;*/
        /*height: 40% !important;*/
        /*position: absolute;*/
        /*margin-top: 10px !important;*/
        /*left: 10px !important;*/
        /*z-index: 9999;*/
        /*!*margin: 0 !important;*!*/
        /*!*width: 500px !important;*!*/
        /*!*margin-left: -142px !important;*!*/
        /*!*height: 400px !important;*!*/
    /*}*/
    #viewSource .v--modal {
        width: 400px !important;
        height: 280px !important;
        margin-left: 95px !important;
    }
    .page {
        cursor: pointer;
        line-height: 50px;
        color: rgb(236, 104, 126);
    }
</style>
