var Circle = function(x, y, r, name, imgPath) {
    this.left = x - r;
    this.top = y - r;
    this.right = x + r;
    this.bottom = y + r;

    // name
    name = name || "Name"; 
    this.name = name; 
    this.getName = function(){
        return this.name; 
    }

    // image 
    this.imgPath = imgPath; 
    this.getImg = function(){ 
        this.img = new Image();
        this.img.src = imgPath;

        return this.img;  
    }   

    this.getX = function(){
        return (this.left + this.right) / 2; 
    }

    this.getY = function(){
        return (this.top + this.bottom) / 2; 
    }
}

// litle circles 
var radius = 55; 
var links = [
    "linkedin.com",
    "github.com",
    "stackoverflow.com",
    "facebook.com",
    "plus.google.com",
    "pinterest.com",
    "tumblr.com",
    "wordpress.com",
    "youtube.com",
    "twitter.com",
    "skype", 
    "mail", 
]; 
var imgsPath = [
    "./icos/linkedin.png",
    "./icos/github.png",
    "./icos/stackoverflow.png",
    "./icos/facebook500.png",
    "./icos/googleplus-revised.png",
    "./icos/pinterest.png",
    "./icos/tumblr.png",
    "./icos/wordpress.png",
    "./icos/youtube.png",
    "./icos/twitter.png",
    "./icos/skype.png",
    "./icos/email.png",
]; 
// number of circles
var num = imgsPath.length; 
var circles = [];

var canvas = document.getElementById('mainCanvas');
var context = canvas.getContext('2d');

// 
function createImages(){
    var h = canvas.height / 2; 
    var w = canvas.width / 2; 
    var r = radius; 
    var R = Math.min(h, w) - r; 
    var alfa = 2 * Math.PI / num; 

    for (var i=0; i<num; i++){
        var a = R * Math.cos(i*alfa);
        var b = R * Math.sin(i*alfa); 
        var x = Math.round(h - b)
        var y = Math.round(w - a);  

        var circle = new Circle(x, y, r, "Name ", imgsPath[i]);
        circles.push(circle); 
    }
}

function draw(circle) {
    context.beginPath();

    c = circle; 
    var x = c.getX();
    var y = c.getY();

    img = c.getImg(); 
    var iw = img.naturalWidth;
    var ih = img.naturalHeight;
    if (iw > 64 || ih > 64){
        iw = ih = 64; 
    }
    context.drawImage(img, c.getX() - iw/2, c.getY() - ih/2, iw, ih);         
}

function drawImages(){
    setTimeout(drawImages, 0); 

    for (var i=0; i<circles.length; i++){
        draw(circles[i]); 
    }
}

function addCanvasEvents(){
    canvas.addEventListener('mouseover', function(e){
    var x = e.pageX - this.offsetLeft; 
    var y = e.pageY - this.offsetTop; 

    alert("mouse over " + x + " " + y ); 
});

}

window.onload = function(){
    createImages();
    drawImages(); 

    // TODO: finish this event
    // when mouse over a image show name of site where it redirect 
    // addCanvasEvents(); 
}


// events 
$('#mainCanvas').click(function (e) {
    var clickedX = e.pageX - this.offsetLeft;
    var clickedY = e.pageY - this.offsetTop;
    
    for (var i = 0; i < circles.length; i++) {
        if (clickedX < circles[i].right 
                && clickedX > circles[i].left 
                && clickedY > circles[i].top 
                && clickedY < circles[i].bottom) {


            var goTo = links[i]; 
            if (goTo == 'skype'){
                alert("Cannot open."); 
                break; 
            }
            if (goTo == 'mail'){
                goTo = 'gmail.com'
            }

            var win = window.open("http://www." + goTo, '_blank'); 
            win.focus();
        }
    }
});


