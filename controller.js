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
            canvas.height = canvas.height; //清除畫布

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


    /**
     * 畫整個時鐘
     * @param {} ctx 
     * @param {*} time 
     */
    function drawClock(ctx, time) {
        drawCircle(ctx); 
        drawHoursHand(ctx, time);
        drawMinuteHand(ctx, time);
        drawSecondHand(ctx, time);
    }


    /**
     * 畫時鐘外圈
     * @param {*} ctx 
     */
    function drawCircle(ctx) {

        ctx.translate(250, 250); // 把畫布原點設為(250, 250)
        ctx.save(); // 儲存當前畫布原點
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 8;
        ctx.arc(0, 0, 220, 0, 2*Math.PI, true);
        ctx.closePath();
        ctx.stroke();

    }


    /**
     * 畫秒針
     * @param {}} ctx 
     * @param {*} time 
     */
    function drawSecondHand(ctx, time) {
        let second = parseInt(time.substring(6));
        
        ctx.rotate(Math.PI*2*(second/60));

        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 10);
        ctx.lineTo(0, -150);
        ctx.closePath();
        ctx.stroke();

        ctx.restore(); // 恢復畫布原點
        ctx.save();
    }


    /**
     * 畫分針
     * @param {*} ctx 
     * @param {*} time 
     */
    function drawMinuteHand(ctx, time) {
        let second = parseInt(time.substring(6));
        let minute = parseInt(time.substring(3, 5));

        ctx.rotate(Math.PI*2*(minute/60 + second/3600));

        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 10);
        ctx.lineTo(0, -150);
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
        ctx.save();
    }


    function drawHoursHand(ctx, time) {
        let second = parseInt(time.substring(6));
        let minute = parseInt(time.substring(3, 5));
        let hour = parseInt(time.substring(0, 2));

        ctx.rotate(Math.PI*2*(hour/24 + minute/(60*24) + second/(3600*24)));

        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 5);
        ctx.lineTo(0, -75);
        ctx.closePath();
        ctx.stroke();

        ctx.restore();
        ctx.save();
    }

}