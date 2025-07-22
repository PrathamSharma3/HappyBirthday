let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  currentPaperX = 0;
  currentPaperY = 0;
  rotation = Math.random() * 30 - 15;

  init(paper) {
    // Touch start
    paper.addEventListener('touchstart', (e) => {
      if (e.touches.length !== 1) return;
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
      this.prevTouchX = this.touchStartX;
      this.prevTouchY = this.touchStartY;
    });

    // Touch move
    paper.addEventListener('touchmove', (e) => {
      if (!this.holdingPaper || e.touches.length !== 1) return;
      e.preventDefault();
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      const deltaX = touchX - this.prevTouchX;
      const deltaY = touchY - this.prevTouchY;
      this.currentPaperX += deltaX;
      this.currentPaperY += deltaY;
      this.prevTouchX = touchX;
      this.prevTouchY = touchY;
      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    }, { passive: false });

    // Touch end
    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
