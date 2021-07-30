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
            let canvas = document.querySelector('#clock');
            let ctx = canvas.getContext('2d');

            drawClock(ctx, this.time);
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


    function drawClock(ctx, time) {
        drawCircle(ctx);
        drawSecondHand(ctx, time);
    }


    function drawCircle(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 8;
        ctx.arc(250, 250, 220, 0, 2*Math.PI, true);
        ctx.closePath();
        ctx.stroke();
    }

    function drawSecondHand(ctx, time) {
        let second = parseInt(time.substring(6));
        
        // ctx.beginPath();
        // ctx.moveTo(125,125);
        // ctx.lineTo(125,45);
        // ctx.lineTo(45,125);
        // ctx.closePath();
        // ctx.stroke();
    }

}