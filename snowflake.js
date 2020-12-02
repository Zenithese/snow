class Snowflake {
    constructor(W, H, mp){
        this.x = Math.random() * W, //x-coordinate
        this.y = Math.random() * H, //y-coordinate
        this.r = Math.random() * 4 + 1, //radius
        this.d = Math.random() * mp //density
        this.settled = false
    }
}