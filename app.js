// $(document).ready(() => {
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
const heading = $('header h2')
const imgSong = $('.cd-thumb')
const audio = $('audio')
const cd = $('.cd')
const btnPlay = $('.btn-toggle-play')
const playIng = $('.player')
const timeLoading = $('.progress')
const app = {
    songIndex: 0,
    songs: [
        {
            name: 'Nevada',
            singer: 'Vicetone',
            path: './assets/music/song1.mp3',
            image: '/assets/img/song1.jpg'
        },
        {
            name: 'Summer-Time',
            singer: 'K-391',
            path: './assets/music/song2.mp3',
            image: '/assets/img/song2.png'
        },
        {
            name: 'Monody',
            singer: 'TheFatRat',
            path: './assets/music/son3.mp3',
            image: '/assets/img/song3.jpg'
        },
        {
            name: 'Reality',
            singer: 'Lost Frequencies',
            path: './assets/music/song4.mp3',
            image: '/assets/img/song4.jpg'
        },
        {
            name: 'Vì Mẹ Bắt Chia Tay',
            singer: 'Miu Lê',
            path: './assets/music/song5.mp3',
            image: '/assets/img/song5.jpg'
        },
        {
            name: 'Dế Vương',
            singer: 'ACV',
            path: './assets/music/song6.mp3',
            image: '/assets/img/song6.jpg'
        },
        {
            name: 'Monody',
            singer: 'TheFatRat',
            path: './assets/music/song3.mp3',
            image: '/assets/img/song3.jpg'
        },
        {
            name: 'Reality',
            singer: 'Lost Frequencies',
            path: './assets/music/song4.mp3',
            image: '/assets/img/song4.jpg'
        },
        {
            name: 'Vì Mẹ Bắt Chia Tay',
            singer: 'Miu Lê',
            path: './assets/music/song5.mp3',
            image: '/assets/img/song5.jpg'
        },
        {
            name: 'Dế Vương',
            singer: 'ACV',
            path: './assets/music/song6.mp3',
            image: '/assets/img/song6.jpg'
        }
    ],
    render: function () {
        const htmls = this.songs.map(function (song) {
            return `
                    <div class="song">
                        <div class="thumb" style="background-image: url('${song.image}')"></div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                </div>
                `
        })
        $('.playlist').innerHTML = htmls.join('')
    },
    defineProperties: function () {
        Object.defineProperty(this, 'songNow', {
            get: function () {
                return this.songs[this.songIndex]
            }
        })
    },
    xuLySuKien: function () {
        // * Xử lý cuộn
        const cdWidth = cd.offsetWidth
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newWidthCd = cdWidth - scrollTop
            cd.style.width = newWidthCd > 0 ? newWidthCd + 'px' : 0
            cd.style.opacity = newWidthCd / cdWidth
        }
        // * Xử lý play
        var checkPlayIng = false
        btnPlay.onclick = function () {
            if (checkPlayIng) {
                audio.pause()
            } else {
                audio.play()
            }
            audio.onplay = function () {
                checkPlayIng = true
                playIng.classList.add('playing')
            }
            audio.onpause = function () {
                checkPlayIng = false
                playIng.classList.remove('playing')
            }
            audio.ontimeupdate = function () {
                if(audio.duration){
                    const time = Math.floor(audio.currentTime / audio.duration * 100)
                    timeLoading.value = time

                }
            }
            timeLoading.onchange = function (e) {
                const seekTime = audio.duration / 100 *  e.target.value
                audio.currentTime = seekTime
            }
        }
    },
    loadSongNow: function () {
        heading.innerText = this.songNow.name
        imgSong.style.backgroundImage = `url('${this.songNow.image}')`
        audio.src = this.songNow.path
    },
    start: function () {
        // ? Định nghĩa các thuộc tính
        this.defineProperties()

        // ? Xử lý các sự kiện
        this.xuLySuKien()

        // ? Tải thông tin bài hát đầu tiên
        this.loadSongNow()

        // ? In ra dữ liệu bài hát
        this.render()

    }
}
app.start();
// }) 