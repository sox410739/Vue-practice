const vm = new Vue({
    el: '#app',
    data: {
        videos: [
            {
                number: 'Keynote I: Programming Heterogeneous Devices with MLIR', display: 'Dr. Stephen Neuendorffer, Xilinx (AMD)', id: null, slide: '1JTXdN8JfIEk2yGBEdmY3WGXLEwKl4vRt'
            },
            {
                number: 'Invited talk I: Accelerating Data Computation with RISC-V Processors', display: 'Mr. Simon Wang, Andes Technology', id: null, slide: '1bt5S4TfsDxXMlqysAfNlHnS_ioU7RU-D'
            },
            {
                number: 'Enable TVM QNN Flow via BYOC for MediaTek Neuropilot (9900)', display: 'Chun-Ping Chung, Sheng-Yuan Cheng, Chao-Lin Lee, Geng-Ming Liang, Robert Lai, and Jenq-Kuen Lee', id: '4SUZBTFW03g', slide: '1eBXHf9OxEw6PiCptwOlb55M34-AUhSYG'
            },
            {
                number: 'A Hybrid Pruning for Accelerating CNN Models on Sparse Tensor Core (5953)', display: 'An-Tai Chen, Pangfeng Liu, Ding-Yong Hong, and Jan-Jan Wu', id: 'gxnTHkyXd4k', slide: '16HVHPLiBJddRexeVEO6MfEliADZwzRzL'
            },
            {
                number: 'Identifying Function Positions in Assembly Code with Machine Learning Techniques (8171)', display: 'Jia-Lun Yu and Wuu Yang', id: 'b1_zjnVj9vA', slide: '1xGDvA3T6xehIzTiYCQBHU5AJa7eUFIWF'
            },
            {
                number: 'Offloading Support for Parallel JavaScript Programs (3133)', display: 'An-Chi Liu and Yi-Ping You', id: 'L2pcNX0oymg', slide: null
            },
            {
                number: 'An Algorithm for Solving the Blocking between Instruction Sink and Division-Modulo Combine (3725)', display: 'Ting-Wei Lin and YungYu Zhuang', id: 'ZQCrrqyYZpA', slide: null
            },
            {
                number: 'A GCC-based Compliance Checker for Single-translation-unit Rules in MISRA-C (9200)', display: 'Chih-Yuan Chen, Yung-An Fang, Guan-Ren Wang, and Peng-Sheng Chen', id: 'DT36EoRrBFE', slide: '1pgckMx2P5qPJtEq5VI0PlGVRKzxuAaAn'
            },
            {
                number: 'Update with Sail Specification for RISC-V (3950)', display: 'Chiahui Su, Chun-Ping Chung, Yu-Tse Huang, Ti-Han Wu, Yu-Wen Shao, Bow-Yaw Wang, Chuanhua Chang, Charlie Su, and Jenq-Kuen Lee', id: 'YxybCdwtx0g', slide: '1Fg_BMLlOIqcTDRds7RiyM9alFVsT-Ikl'
            },
            {
                number: 'A Pruning-Based MCTS Approach to Moldable Job Scheduling on Parallel Computing Platforms (1249)', display: 'Shu-Jun Yang and Kuo-Chan Huang', id: '819UBzj4JJw', slide: '1qNxQ88u1T_Xsk43GZTrPoBZQHgjXpHF6'
            },
            {
                number: 'Towards Fine-grained Behavior-based Analysis for Linux CPU Scheduler (6987)', display: 'Hui-Chun Feng, Ching-Chun Huang, and Kuo-Hui Tsai', id: 'wzKjrGCpZaQ', slide: '14XcMIRCiTgutDIaVXKZxSj-9PgJm5vZE'
            },
            {
                number: 'An Asynchronous I/O Interface for Scalable and Low-Latency Network Services (1257)', display: 'Yu-Cheng Cheng, Ching-Chun Huang and Chia-Heng Tu', id: 'DQqRgypavO0', slide: '1Tuj2Wu1zgTMxTPJf47ueIjT01olIDUkf'
            },
            {
                number: 'Briefing on Pointer-Based Divergence Analysis (2395)', display: 'Shao-Chung Wang, Lin-Ya Yu, Li-An Her, Yuan-Shin Hwang, and Jenq-Kuen Lee', id: null, slide: '1jvuRyQ3ANK_JV9ikSJ_brtv4SRYZzKUu'
            },
            {
                number: 'Execution Flow Aware Profiling for ROS-based Autonomous Vehicle Software (9391)', display: 'Shaohua Wang, Chia-Heng Tu, and Jyh-Ching Juang', id: 'zzR4TaZnsyQ', slide: null
            },
            {
                number: 'Pragmatic Node Size Profiler for Decision Trees (7716)', display: 'Chiahui Su, Chao-Lin Lee, Jenq-Kuen Lee, and Kuan-Hsun Chen', id: 'tWzJT1REW9Y', slide: '17ME0Pe25MCGdGS6kxgSYjOuvkQgfcFgX'
            },
        ],
        login: true,
        wrongMessage: false,
        username: '',
        password: '',
        popup: false,
        main: false,
        popUrl: '',
        appScriptUrl: 'https://script.google.com/macros/s/AKfycbyP2jWg44KK2BFxdoGNcY8JfwR7uNPRzMeDoD9vlQsP5emIhuEp6dDu0dEc6M-PLxQ1/exec',
    },

    // created() {
    //     const config = {
    //         method: 'GET',
    //         url: this.appScriptUrl,
    //         params: { type: 'getVideos' }
    //     };
    //     axios(config)
    //     .then(response => {
    //         const data = response.data;
    //         for (const videoNumber in data) {
    //             this.videos.push({
    //                 number: videoNumber,
    //                 id: data[videoNumber]
    //             })
    //         }
    //     })
    // },

    methods: {
        slideNumberClicked(video) {
            window.open('https://drive.google.com/file/d/' + video.slide + '/view');
        },
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