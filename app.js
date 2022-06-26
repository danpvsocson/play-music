// $(document).ready(() => {
var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
const heading = $('header h2')
const imgSong = $('.cd-thumb')
const audio = $('audio')
const cd = $('.cd')
const btnPlay = $('.btn-toggle-play')
const btnNext = $('.btn-next')
const btnPrev = $('.btn-prev')
const btnRandom = $('.btn-random')
const btnRepeat = $('.btn-repeat')
const playIng = $('.player')
const timeLoading = $('.progress')
const app = {
    random: false,
    repeat: false,
    songIndex: 0,
    songs: [
        {
            name: 'Nevada',
            singer: 'Vicetone',
            path: './assets/music/song1.mp3',
            image: './assets/img/song1.jpg'
        },
        {
            name: 'Summer-Time',
            singer: 'K-391',
            path: './assets/music/song2.mp3',
            image: './assets/img/song2.png'
        },
        {
            name: 'Monody',
            singer: 'TheFatRat',
            path: './assets/music/song3.mp3',
            image: './assets/img/song3.jpg'
        },
        {
            name: 'Reality',
            singer: 'Lost Frequencies',
            path: './assets/music/song4.mp3',
            image: './assets/img/song4.jpg'
        },
        {
            name: 'Vì Mẹ Bắt Chia Tay',
            singer: 'Miu Lê',
            path: './assets/music/song5.mp3',
            image: './assets/img/song5.jpg'
        },
        {
            name: 'Dế Vương',
            singer: 'ACV',
            path: './assets/music/song6.mp3',
            image: './assets/img/song6.jpg'
        },
        {
            name: 'Monody 2',
            singer: 'TheFatRat',
            path: './assets/music/song3.mp3',
            image: './assets/img/song3.jpg'
        },
        {
            name: 'Reality 2',
            singer: 'Lost Frequencies',
            path: './assets/music/song4.mp3',
            image: '/assets/img/song4.jpg'
        },
        {
            name: 'Vì Mẹ Bắt Chia Tay 2',
            singer: 'Miu Lê',
            path: './assets/music/song5.mp3',
            image: './assets/img/song5.jpg'
        },
        {
            name: 'Dế Vương 2',
            singer: 'ACV',
            path: './assets/music/song6.mp3',
            image: './assets/img/song6.jpg'
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
        function play () {
            audio.onplay = function () {
                checkPlayIng = true
                playIng.classList.add('playing')
                animate.play()
            }
            audio.onpause = function () {
                checkPlayIng = false
                playIng.classList.remove('playing')
                animate.pause()
            }
            audio.ontimeupdate = function () {
                if (audio.duration) {
                    const time = Math.floor(audio.currentTime / audio.duration * 100)
                    timeLoading.value = time
                }
            }
            timeLoading.onchange = function (e) {
                const seekTime = audio.duration / 100 * e.target.value
                audio.currentTime = seekTime
            }
        }
        //* XỦ lý Img song
        const animate = imgSong.animate([
            { transform: 'rotate(360deg)' } //Quay 360
        ], {
            duration: 10000, // Quay trong 10s
            iterations: Infinity //Lặp vô hạn
        })
        animate.pause()
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
            play()
        }
        // * Next song
        btnNext.onclick = function () {
            if(app.random){
                app.playRandomSong()
            }else{
                app.nextSong()
            }
            audio.play()
            play()
        }
        // * Prev Song
        btnPrev.onclick = function () {
            if(app.random){
                app.playRandomSong()
            }else{
                app.prevSong()
            }
            audio.play()
            play()
            
        }
        // * Random Song
        btnRandom.onclick = function () {
            if(app.random){
                btnRandom.classList.remove('active')
                app.random = false
            }else{
                btnRandom.classList.add('active')
                app.random = true
            }
        }
        btnRepeat.onclick = function () {

        }
    },
    loadSongNow: function () {
        heading.innerText = this.songNow.name
        imgSong.style.backgroundImage = `url('${this.songNow.image}')`
        audio.src = this.songNow.path
    },
    nextSong: function () {
        this.songIndex++
        if (this.songIndex >= this.songs.length) {
            this.songIndex = 0
        }
        this.loadSongNow()
    },
    prevSong: function () {
        this.songIndex--
        if (this.songIndex < 0) {
            this.songIndex = this.songs.length -1
        }
        this.loadSongNow()
    },
    playRandomSong: function () {
        let newSongRandom
        do {
            newSongRandom = Math.floor(Math.random() * app.songs.length)
        } while (newSongRandom === this.songIndex)
        this.songIndex = newSongRandom
        this.loadSongNow()
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