let highestZ = 1;

class Paper {
  holdingPaper = false;
  rotating = false;
  touchStartX = 0;
  touchStartY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;

  init(paper) {
    // Touch start
    paper.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.holdingPaper = true;
        this.rotating = false;
        paper.style.zIndex = highestZ++;
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
        this.prevTouchX = this.touchStartX;
        this.prevTouchY = this.touchStartY;
      } else if (e.touches.length === 2) {
        this.rotating = true;
        this.holdingPaper = false;
        // Optionally, store initial angle here for custom rotation logic
      }
    });

    // Touch move
    paper.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (e.touches.length === 2) {
        this.rotating = true;
        // Optionally, implement custom rotation logic here
        return;
      }
      if (this.holdingPaper && e.touches.length === 1) {
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        this.velX = touchX - this.prevTouchX;
        this.velY = touchY - this.prevTouchY;
        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;
        this.prevTouchX = touchX;
        this.prevTouchY = touchY;
        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    }, { passive: false });

    // Touch end
    paper.addEventListener('touchend', (e) => {
      if (e.touches.length === 0) {
        this.holdingPaper = false;
        this.rotating = false;
      }
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
