
    var height = 500;
    var width = 500;

    const pwidth = 10;
    const pheight = 130;

    const p1position_x = 10;
    let p1position_y;
    const p2position_x = width - pwidth - 10;
    let p2position_y;

    let p1pts;
    let p2pts;

    let orientation_x, orientation_y, bx, by;

    let p1key;
    let p2key;
    
    var count = 0;

    function start() {
        const canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");
        
        p1pts = 0;
        p2pts = 0;

        p1position_y = (height / 2) - (pheight/2);
        p2position_y = (height / 2) - (pheight/2);
        setInterval(loop60, 1000/60);
        ball();

    }

    function loop60() {
        draw();
        count++;
        // verify colision with p1
        if(bx >= p1position_x && bx <= p1position_x + 10 && by >= p1position_y && by <= p1position_y + pheight){
        orientation_x = 1;
        }
        // verify colision with p2
        if(bx >= p2position_x && bx <= p2position_x + 10 && by >= p2position_y && by <= p2position_y + pheight){
        orientation_x = -1;
        }

        if(bx + 10 > width) {
            p1pts++;
            ball();
        } 
        if(bx < 0) {
            p2pts++;
            ball();
        }
        // verify colision on floor or roof
        if(by + 10 >= height || by <= 0) 
        orientation_y *= -1;

        //move X and Y ball
        if(count <= 300) {
        bx += 4.5 * orientation_x;
        by += 4.5 * orientation_y;
        }
        if(count > 300) {
        bx += 5 * orientation_x;
        by += 5 * orientation_y;
        }

        if(p1key == 87 && p1position_y > 0){
        p1position_y -= 10;
        }
        if(p1key == 83 && p1position_y + pheight < height){
        p1position_y += 10;
        }

        if(p2key == 38 && p2position_y > 0){
        p2position_y -= 10;
        }
        if(p2key == 40 && p2position_y + pheight < height){
        p2position_y += 10;
        }

    }

    document.addEventListener("keydown", function(ev) {
    // w, s
    if(ev.keyCode == 87 || ev.keyCode == 83){
        p1key = ev.keyCode;
    }
    // up, down
    if(ev.keyCode == 38 || ev.keyCode == 40) {
        p2key = ev.keyCode;
    }
})

    function ball() {
        console.log(p1pts + "x" + p2pts)
        orientation_y = Math.pow(2, Math.floor( Math.random() * 2 )+1) - 3;
        orientation_x = Math.pow(2, Math.floor( Math.random() * 2 )+1) - 3;
        bx = width / 2 -10;
        by = height / 2 -10;
    }

    function createRectangle(x,y,w,h,color="#fff"){
    context.fillStyle = color;
    context.fillRect(x,y,w,h);

    }

    function createPoints(color="#fff") {
    context.font = "30px Verdana";
    context.fillStyle = color;
    context.fillText(p1pts, width/4, 50);
    // context.fillText("", width/2.07, 50);
    context.fillText(p2pts, (width/1.4), 50);
    
    }

    function draw() {
    createRectangle(0,0,width,height,"#191970");
    // p1
    createRectangle(p1position_x, p1position_y, pwidth, pheight, "#808080");
    // p2
    createRectangle(p2position_x, p2position_y, pwidth, pheight, "#808080");
    // bars
    createRectangle(width/1.365 -1, 0 , 1, height, "#000");
    createRectangle(width/2 -2, 0 , 2, height)
    createRectangle(width/3.72 -1, 0 , 1, height, "#000");
    // ball
    createRectangle(bx, by, 10, 10);
    createPoints();
    }
    start();