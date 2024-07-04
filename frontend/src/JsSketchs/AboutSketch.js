import myIma from "../assets/images/profil.png";

const sketchAbout =(p, theme) => {
    let ima;
    let effect;
    let canvas;
    let day;
    let newWidth, newHeight; 
    p.preload = () => {
        //ima = p.loadImage('/public/profil.png');
        ima = p.loadImage(myIma);
    }
    const updateTheme = (newTheme) => {
        if(newTheme === 'dark'){
           day = false;
        }else if(newTheme === 'light'){
           day = true;
        }
    };
    updateTheme(theme);
    
    const windowResized = () => {
        let renderTarget = p._userNode; 
        let computedStyle = getComputedStyle(renderTarget);
         newWidth = renderTarget.offsetWidth - (parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight));
         newHeight = renderTarget.offsetHeight - (parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom));
        p.resizeCanvas(newWidth, newHeight);
        if (effect){
            effect.updateDimensions(newWidth, newHeight);
        } 
        ima.resize(newWidth, newHeight);
    }
    p.setup = () => {
        windowResized();
        effect = new Effect();
    }
    class Cell {
        constructor(effect, x, y, index) {
            this.effect = effect;
            this.index = index;
            this.x = x;
            this.y = y;
            this.px = p.random() * newWidth / 2;
            this.py = newWidth;
            this.vx;
            this.vy;
            this.width = this.effect.cellW;
            this.height = this.effect.cellH;
            this.slideX = 0;
            this.slideY = 0;
            this.vx = 0;
            this.vy = 0;
            this.ease = 0.1;
            this.friction = 0.8;
            this.rand = p.random() * 10 + 2;

            setTimeout(() => {
                this.start();
            }, this.index * 10);
        }
        draw() {
            if (ima.width && ima.height) {
                let imgAspectRatio = ima.width / ima.height;
                let targetW = this.width;
                let targetH = targetW / imgAspectRatio;
                if (targetH > this.height) {
                    targetH = this.height;
                    targetW = targetH * imgAspectRatio;
                }
                p.image(ima, this.px, this.py, targetW, targetH, this.x + this.slideX, this.y + this.slideY, this.width, this.height);
                
            }
            p.stroke(5);
            p.strokeWeight(0.1);
            p.noFill();
            // p.rect(this.px + this.slideX, this.py + this.slideY, this.width, this.height);
        }
        start() {
            this.vx = (this.x - this.px) / this.rand;
            this.vy = (this.y - this.py) / this.rand;
        }
        easeOutBounce(x){
            const n1 = 7.5625;
            const d1 = 2.75;
            
            if (x < 1 / d1) {
                return n1 * x * x;
            } else if (x < 2 / d1) {
                return n1 * (x -= 1.5 / d1) * x + 0.75;
            } else if (x < 2.5 / d1) {
                return n1 * (x -= 2.25 / d1) * x + 0.9375;
            } else {
                return n1 * (x -= 2.625 / d1) * x + 0.984375;
            }
        }
        update() {
            if (p.abs(this.vx) > 0.1 || p.abs(this.vy) > 0.1) {
                this.vx = (this.x - this.px) / this.rand;
                this.vy = (this.y - this.py) / this.rand;
                this.px += this.vx;
                this.py += this.vy;
            }

            let dx = p.mouseX - this.x;
            let dy = p.mouseY - this.y;
            let dist = p.sqrt(dx * dx + dy * dy);
            if (dist < this.effect.mouseRadio) {
                let angle = p.atan2(dy, dx);
                let f = (dist * this.effect.mouseRadio)*(dist / this.effect.mouseRadio1*this.ease);
               
                this.vx = f * p.cos(angle);
                this.vy = f * p.sin(angle);
            }
            this.slideX += (this.vx *= this.friction) - this.slideX * this.ease;
            this.slideY += (this.vy *= this.friction) - this.slideY * this.ease;
        }
    }
    class Effect {
        constructor() {
            this.cellW = newWidth / 25;
            this.cellH = newHeight / 25;
            this.mouseRadio = 30;
            this.mouseRadio1 = 200;
            this.imaGrid = [];
            this.createGrid();
        }

        createGrid() {
            let index;
            for (let y = 0; y < newHeight; y += this.cellH) {
                for (let x = 0; x < newWidth; x += this.cellW) {
                    index++;
                    this.imaGrid.push(new Cell(this, x, y, index));
                }
            }
        }
        updateDimensions(width, height) {
            this.cellW = width / 25;
            this.cellH = height / 25;
            this.imaGrid = [];
            this.createGrid();
        }
        render() {
            this.imaGrid.forEach(cell => {
                cell.update();
                cell.draw();
            });
        }
    }
    p.mousePressed = () => {
        p.setup();
    }
    p.draw = () => {
        p.clear();
        p.background(0);
        effect.render();
    }
    p.updateTheme = updateTheme;
    p.windowResized = () => {
        windowResized(); // Adjust canvas size on window resize
    }
    };

export default sketchAbout;

