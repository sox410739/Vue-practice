const vm = new Vue({
    el: '#app',
    data: {
        startPopup: true,
        endPopup: false,
        timer: 15
    },
    methods: {
        startPlay() {
            this.startPopup = false;
            player.playVideo();
            setInterval(this.nextSecond, '1000');
        },
        nextSecond() {
            if (this.timer > 0) this.timer--;
        },
        endClicked() {
            history.go(-1);
        }
    },
    watch: {
        timer(newValue) {
            if (newValue === 0) {
                player.pauseVideo();
                this.endPopup = true;
            }
        }
    }
})