var scrollLeft;
var startX;
var isDown = false;

export function moveScroll(scrolls) {
  scrolls.forEach((event) => {
    event.current.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.clientX;
      scrollLeft = event.current.scrollLeft; 
    }); 

    event.current.addEventListener("mouseup", () => {
      isDown = false;
    });

    event.current.addEventListener("mouseleave", (e) => {
      isDown = false;
    });

    event.current.addEventListener("mousemove", (e) => {
      if (!isDown) return;

      e.preventDefault();
      const walt = e.pageX - startX;
      event.current.scrollLeft = scrollLeft - walt;
    });
  });
}
