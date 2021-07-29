{

    var clock = new Vue({
        el: '.screen',
        data: {
            time: getTimeString(),
            canvas: document.querySelector('#clock'),
        },
        methods: {
            drawSecondHand,
        },
        mounted: updateTime,
        beforeUpdate() {
            this.drawSecondHand();
        }

    });


    /**
     * 把網頁載入時的時間變成字串
     * @returns 
     */
    function getTimeString() {
        let now = new Date();
        let options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        }

        let nowString = now.toLocaleString('zh-TW', options);
        if(now.getHours() == 0) {
            // 如果是零點會 hour 會顯示24，很醜
            return `00${nowString.substring(2)}`;
        }

        return nowString;
    }


    /**
     * 延遲毫秒數
     * @param {Number} million 
     * @returns 
     */
    function wait(million) {
        return new Promise((resolve)=> {
            setTimeout(()=>{
                resolve(true);
            }, million);
        });
    }


    /**
     * (Promise)
     * 網頁載入就 call，隨時更新時間
     */
    async function updateTime() {
        let now = new Date();
        await wait( 1000 - now.getMilliseconds() );
        this.time = getTimeString();

        while (true) {
            await wait(1000);
            this.time = getTimeString();
        }
    }

    function drawSecondHand() {
        let second = parseInt(this.time.substring(6));

        let canvas = document.querySelector('#clock');
        let ctx = canvas.getContext('2d');
        
        ctx.beginPath();
        ctx.moveTo(125,125);
        ctx.lineTo(125,45);
        ctx.lineTo(45,125);
        ctx.closePath();
        ctx.stroke();


    }

}