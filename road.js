class Road {
    constructor(middle, width, laneCount) {
        this.middle = middle;
        this.width = width;
        this.laneCount = laneCount;

        this.left = middle - width / 2;
        this.right = middle + width / 2;
    }

    getLaneCenter(laneIndex) {
        // decrement laneIndex by 1 because index starts from 0
        const safeIndex = Math.min(laneIndex - 1, this.laneCount - 1)

        const laneWidth = this.width / this.laneCount;
        return this.left + laneWidth / 2 + (safeIndex * laneWidth);
    }

    draw(ctx) {

        const screenTop = 0;
        const screenBottom = ctx.canvas.height;

        const lines = [...Array(this.laneCount + 1).keys()]; // convert laneCount to an iterable Array

        // loop through all the lanes and determine the lines
        for (const i of lines) {
            // use linear interpolation or lerp to determine the position of the lines along x-axis
            const x = lerp(
                this.left,
                this.right,
                i / this.laneCount
            );

            // outer lines have different properties
            if (i === 0 || i === this.laneCount) {
                ctx.lineWidth = 8;
                ctx.strokeStyle = "yellow";
                ctx.setLineDash([]);
            } else {
                // inner lines have different properties
                ctx.lineWidth = 5;
                ctx.strokeStyle = "white";
                ctx.setLineDash([20, 20]);
            }

            // draw the lines from memory
            ctx.beginPath();
            ctx.moveTo(x, screenTop);
            ctx.lineTo(x, screenBottom);
            ctx.stroke();
        }
    }
}