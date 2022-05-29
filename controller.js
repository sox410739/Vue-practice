const vm = new Vue({
    el: '#app',
    data: {
        videos: [],
        login: true,
        wrongMessage: false,
        username: '',
        password: '',
        popup: false,
        main: false,
        popUrl: '',
        appScriptUrl : 'https://script.google.com/macros/s/AKfycbwxJ2sERSTFkNtV74NoQ5319ReaiKqmcgJU9ryLg9G56D63dkYsz3x5CuThJatGwmTo/exec',
    },

    created() {
        const config = {
            method: 'GET',
            url: this.appScriptUrl,
            params: { type: 'getVideos' }
        };
        axios(config)
        .then(response => {
            const data = response.data;
            for (const videoNumber in data) {
                this.videos.push({
                    number: videoNumber,
                    id: data[videoNumber]
                })
            }
        })
    },

    methods: {
        videoNumberClicked(video) {
            this.popUrl = 'https://www.youtube.com/embed/' + video.id + '?modestbranding=1&autoplay=1&mute=1&disablekb=1';
            this.popup = true;
        },
        videoClose() {
            this.popup = false;
            this.popUrl = '';
        },
        loginClicked() {
            const config = {
                method: 'GET',
                url: this.appScriptUrl,
                params: {
                    type: 'login',
                    username: this.username,
                    password: this.password
                }
            }
            axios(config)
            .then(response => {
                const result = response.data;
                if (result === 'success') {
                    this.login = false;
                    this.main = true;
                } else if (result === 'failed') {
                    this.wrongMessage = true;
                    this.username = '';
                    this.password = '';
                }
            })
        }
    }
})