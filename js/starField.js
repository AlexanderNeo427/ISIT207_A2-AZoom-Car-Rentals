'use strict'

class Vec2D {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class Star {
    constructor(pos, vel) {
        this.pos = pos
        this.vel = vel
    }
}

class Starfield {
    constructor(canvasID, numStars = 80) {
        this.NUM_STARS = numStars

        this.canvas = document.getElementById(canvasID)
        this.ctx = this.canvas.getContext('2d')
        this.mousePos = new Vec2D(0, 0)
        this.isMouseInCanvas = false
    }

    onInit() {

        // Handle window resize
        this.canvas.width = this.canvas.offsetWidth
        this.canvas.height = this.canvas.offsetHeight
        window.addEventListener('resize', function () {
            this.canvas.width = this.canvas.offsetWidth
            this.canvas.height = this.canvas.offsetHeight
        }.bind(this))

        // Initialize star objects
        this.allStars = []
        for (let i = 0; i < this.NUM_STARS; i++) {
            const velRadians = Utils.randFloat(0, 2 * Math.PI)
            const velMagntitude = Utils.randFloat(0.01, 0.04)
            const vel2D = new Vec2D(
                Math.cos(velRadians) * velMagntitude,
                Math.sin(velRadians) * velMagntitude
            )
            const pos2D = new Vec2D(
                Utils.randFloat(0, this.canvas.width),
                Utils.randFloat(0, this.canvas.height)
            )
            this.allStars.push(new Star(pos2D, vel2D))
        }

        // Mouse position event listener
        const faqSection = document.querySelector(".FAQ-section")
        faqSection.addEventListener('mousemove', function (evt) {
            const faqSectionRect = this.canvas.getBoundingClientRect()
            this.mousePos.x = Math.round(evt.clientX - faqSectionRect.x)
            this.mousePos.y = Math.round(evt.clientY - faqSectionRect.y)
        }.bind(this))

        new ResizeObserver(entries => {
            entries.forEach(_ => {
                if (this.canvas.width !== this.canvas.offsetWidth ||
                    this.canvas.height !== this.canvas.offsetHeight) {

                    this.canvas.width = this.canvas.offsetWidth;
                    this.canvas.height = this.canvas.offsetHeight;
                    this.onRender()
                }
            })
        }).observe(faqSection)

        // Mouse enter/leave canvas event listener(s)
        faqSection.addEventListener('mouseenter', () => this.isMouseInCanvas = true)
        faqSection.addEventListener('mouseleave', () => this.isMouseInCanvas = false)
    }

    onTick(deltaTime) {
        this.allStars.forEach(star => {
            // Update position
            star.pos.x += star.vel.x * deltaTime
            star.pos.y += star.vel.y * deltaTime

            // Screen wrap
            if (star.pos.x < 0) star.pos.x += this.canvas.width
            if (star.pos.x > this.canvas.width) star.pos.x -= this.canvas.width
            if (star.pos.y < 0) star.pos.y += this.canvas.height
            if (star.pos.y > this.canvas.width) star.pos.y -= this.canvas.height
        })
    }

    onRender() {
        this.ctx.globalAlpha = 1
        const linearGrad = this.ctx.createLinearGradient(0, 0, this.canvas.width * 1.2, 0);
        linearGrad.addColorStop(0, "#0b0118");
        linearGrad.addColorStop(1, "#410891");
        this.ctx.fillStyle = linearGrad
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.fillStyle = 'lightgray'

        this.allStars.forEach(star => {
            this.ctx.globalAlpha = 1
            this.ctx.beginPath()
            this.ctx.arc(star.pos.x, star.pos.y, 2, 0, Math.PI * 2)
            this.ctx.fill()

            if (!this.isMouseInCanvas) {
                return
            }
            const dx = star.pos.x - this.mousePos.x
            const dy = star.pos.y - this.mousePos.y
            const distanceToLine = Math.sqrt(dx * dx + dy * dy)
            const MAX_DIST = 180
            if (distanceToLine <= MAX_DIST) {
                this.ctx.globalAlpha = 1 - (distanceToLine / MAX_DIST)
                this.ctx.strokeStyle = `lightgray`
                this.ctx.beginPath()
                this.ctx.moveTo(star.pos.x, star.pos.y)
                this.ctx.lineTo(this.mousePos.x, this.mousePos.y)
                this.ctx.stroke()
            }
        })
    }
}
