import React, { useEffect, useRef, useState } from "react";

import platformImg from "./assets/img/platform.png";
import platformSmallImg from './assets/img/platformSmall.png';
import backgroundImg from "./assets/img/background.png";
import spriteStandRight from './assets/img/standingSprite.png';
import spriteRunLeft from './assets/img/spriteRunLeft.png';
import spriteRunRight from './assets/img/spriteRunRight.png';
import spriteDown from './assets/img/spriteDown.png';
import treeImg from './assets/img/tree.png';
import box1 from './assets/img/boxes/weather-forecast.png';
import box2 from './assets/img/boxes/shopping-cart.png';
import box3 from './assets/img/boxes/construction-company.png';
import box4 from './assets/img/boxes/2048.png';
import box5 from './assets/img/boxes/modern-bakery.png';
import box6 from './assets/img/boxes/music-app.png';
import contacts from './assets/img/contacts.png';


import Portfolio from "./components/aboutMe";
import ModalWindow from './components/projectDescription';
import Contacts from './components/contacts';
import './App.css'

const gravity = 1;

function createImage(imageSrc) {
    const image = new Image();
    image.src = imageSrc;
    return image;
}
 
class Player {
    constructor() {
        this.position = { x: 100, y: 100 };
        this.velocity = { x: 0, y: 0 };
        this.width = 69;
      this.height = 130;
      this.speed = 10;
      this.image = createImage(spriteStandRight);
      this.frames = 0; 
      this.sprites = {
        stand: {
          right: createImage(spriteStandRight),
          cropWidth: 68,
          width: 68
        },
        run: {
          left: createImage(spriteRunLeft),
          right: createImage(spriteRunRight),
          cropWidth: 130,
          width: 130
        },
        down: {
          down: createImage(spriteDown),
          cropWidth: 68,
          width: 68
        }
      }
      this.currentSprite = this.sprites.stand.right;
      this.currentCropWidth = 68;
    }

  draw(context) {
      context.globalCompositeOperation = "source-over"
      context.drawImage(this.currentSprite, this.currentCropWidth * this.frames, 0, this.currentCropWidth, 130,
        this.position.x, this.position.y, this.width, this.height); 
    }

  update(canvas, context) {
    this.frames++;
    if (this.frames > 40 && (this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left)) {
      this.frames = 0;
    } else if (this.frames > 39 &&( this.currentSprite === this.sprites.run.right || this.currentSprite === this.sprites.run.left)) {
      this.frames = 0;
    } else if (this.frames > 29 && (this.currentSprite === this.sprites.down.down)) {
      this.frames = 0;
    }
        this.draw(context);
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;

        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity;
        }
    }
}

class Platform {
    constructor({ x, y, image}) {
        this.position = { x, y };
        this.image = image;
        this.width = image.width;
        this.height = image.height;
    }

    draw(context) {
        context.drawImage(this.image, this.position.x, this.position.y);
    }
}

class GenericObject {
    constructor({ x, y, image}) {
        this.position = { x, y };
        this.image = image;
        this.width = image.width;
        this.height = image.height;
    }

    draw(context) {
        context.drawImage(this.image, this.position.x, this.position.y);
    }
}

class Box {
  constructor({ x, y, image, id, setActiveBox }) { 
    this.position = { x, y };
    this.originalY = y; // Store the original position for bump effect
    this.image = image;
    this.width = 90;
    this.height = 90;
    this.bumped = false; // Track if the box has been bumped
    this.id = id;
  }

  bump() {
    if (!this.bumped) {
      this.bumped = true;
      this.position.y -= 10; // Move the box up slightly
      setTimeout(() => {
        this.position.y = this.originalY; // Reset after bump effect
        this.bumped = false;
      }, 200);
    }
  }

  draw(context) {
    context.drawImage(this.image, this.position.x, this.position.y);
  }
}


const App = () => {
    const canvasRef = useRef(null);
    const playerRef = useRef(new Player());
    const [canvasSize, setCanvasSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [textPosition, setTextPosition] = useState(0); 
  const [portfolioOffset, setPortfolioOffset] = useState(0);
  const [activeBox, setActiveBox] = useState(null);
  const handleClose = () => setActiveBox(null); // Close overlay
  const [isContactsModalOpen, setIsContactsModalOpen] = useState(false);

  

  // const [boxes, setBoxes] = useState([]);
  let platformImage;
  let contactsImage;
    
  let platformsRef = useRef([]);
  let boxesRef = useRef([]);
    
  let genericObject = useRef([]);
  let treeImage;
    
    const keys = useRef({ right: { pressed: false }, left: { pressed: false }, down:{pressed:false} });
    
    let lastKey;
  
  let backgroundImage;
  let scrollOffset = 0;
  let contactsBoxPosition ={}
  
    
    function init() {
      playerRef.current = new Player();
      scrollOffset = 0;
      setTextPosition(0);
      setPortfolioOffset(0);
      
      platformImage = createImage(platformImg);

    platformsRef.current = [
    new Platform({ x: -1, y: window.innerHeight - platformImage.height, image: platformImage }),
    new Platform({ x: platformImage.width - 3 +250, y: window.innerHeight - platformImage.height, image: platformImage }),
    new Platform({ x: platformImage.width * 2 - 6, y: window.innerHeight - platformImage.height, image: platformImage }),
      new Platform({ x: platformImage.width * 3 - 9, y: window.innerHeight - platformImage.height, image: platformImage }), 
      new Platform({ x: platformImage.width * 4 - 12, y: window.innerHeight - platformImage.height, image: platformImage }),  
    new Platform({ x: platformImage.width * 5 + 150, y: window.innerHeight - platformImage.height, image: platformImage }), 
      new Platform({ x: platformImage.width * 7 - 50, y: window.innerHeight - platformImage.height, image: platformImage }),
      new Platform({ x: platformImage.width * 8-50, y: window.innerHeight - platformImage.height, image: platformImage }),
      new Platform({ x: platformImage.width * 9-50, y: window.innerHeight - platformImage.height, image: platformImage }), 
      new Platform({ x: platformImage.width * 11-150, y: window.innerHeight - platformImage.height, image: platformImage }), 
    new Platform({ x: platformImage.width * 12-150, y: window.innerHeight - platformImage.height, image: platformImage }), 
    new Platform({ x: platformImage.width * 13 -150, y: window.innerHeight - platformImage.height, image: platformImage }), 
    new Platform({ x: platformImage.width * 14-150, y: window.innerHeight - platformImage.height, image: platformImage }), 
    
    
    
      new Platform({ x: platformImage.width * 6 - 50, y: window.innerHeight - platformImage.height * 2, image: createImage(platformSmallImg) }), 
    new Platform({ x: platformImage.width * 10-50, y: window.innerHeight - platformImage.height, image: createImage(platformSmallImg) }), 
    // new Platform({ x: platformImage.width * 10+100+platformSmallImg.width, y: window.innerHeight - platformImage.height, image: createImage(platformSmallImg) }), 
    
    
];

      treeImage = createImage(treeImg);
      backgroundImage = createImage(backgroundImg);
      contactsImage = createImage(contacts);
      
    genericObject.current = [
      new GenericObject({ x: -1, y: -1, image: backgroundImage }), // // //
      new GenericObject({ x: backgroundImage.width-10, y: -1, image: backgroundImage }),
      new GenericObject({ x: -1, y: window.innerHeight - (platformImage.height + treeImage.height), image: treeImage }),
      new GenericObject({ x: platformImage.width * 2, y: window.innerHeight - (platformImage.height + treeImage.height), image: treeImage }),
      new GenericObject({ x: platformImage.width * 6, y: window.innerHeight - (platformImage.height + treeImage.height), image: treeImage }),
      new GenericObject({ x: platformImage.width * 9+250, y: window.innerHeight - (platformImage.height + contactsImage.height), image: contactsImage}),

    ];
      contactsBoxPosition = { x: platformImage.width *3, y: window.innerHeight - platformImage.height, width: contactsImage.width, height: contactsImage.height };
      
      boxesRef.current =  [
    new Box({ x: platformImage.width*8 -150, y: 300, image: createImage(box1), id: 1}),
    new Box({ x: platformImage.width*8+ 70, y: 300, image: createImage(box2), id: 2}),
    new Box({ x: platformImage.width*8 +290, y: 300, image: createImage(box3), id: 3}),
    new Box({ x: platformImage.width*8 + 510, y: 300, image: createImage(box4), id: 4}),
    new Box({ x: platformImage.width*8 + 730, y: 300, image: createImage(box5), id: 5}),
   new Box({ x: platformImage.width*8 +950, y: 300, image: createImage(box6), id: 6}),
  ];
    
    keys.current = { right: { pressed: false }, left: { pressed: false }, down:{pressed: false} };
  }
  
  

    useEffect(() => {
        const handleResize = () => {
            setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
        };
        
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  useEffect(() => {
  const hasVisited = sessionStorage.getItem("hasVisited");
  if (!hasVisited) {
    sessionStorage.setItem("hasVisited", "true");
    window.location.reload();
  }
}, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        canvas.width = canvasSize.width;
        canvas.height = canvasSize.height;

        const animate = () => {
            requestAnimationFrame(animate);
          context.clearRect(0, 0, canvas.width, canvas.height);
          genericObject.current.forEach(genericObject => {
            genericObject.draw(context);
          });
          boxesRef.current.forEach(box => {
            box.draw(context);
          });

            platformsRef.current.forEach(platform => platform.draw(context));
            playerRef.current.update(canvas, context);

            if (keys.current.right.pressed && playerRef.current.position.x <= canvas.width * 0.4) {
                playerRef.current.velocity.x = playerRef.current.speed;
            } else if ((keys.current.left.pressed && playerRef.current.position.x >= canvas.width * 0.1) ||( keys.current.left.pressed && playerRef.current.position.x > 0 && scrollOffset === 0)) {
                playerRef.current.velocity.x = -playerRef.current.speed;
            } else {
                playerRef.current.velocity.x = 0;

              if (keys.current.right.pressed) {
                if (scrollOffset < 7500) {
                  scrollOffset += playerRef.current.speed;
                  platformsRef.current.forEach(platform => {
                    platform.position.x -= playerRef.current.speed;
                  });
                  genericObject.current.forEach(genericObject => {
                    genericObject.position.x -= playerRef.current.speed * 0.66;
                  });
                  boxesRef.current.forEach(box => {
                    box.position.x -= playerRef.current.speed;
                  });
                  setTextPosition(prev => prev - playerRef.current.speed * 0.1);
                  // Move portfolio sections with player
                  setPortfolioOffset(scrollOffset);
                  
                } 
              } else if (keys.current.left.pressed && scrollOffset > 0) {
                  scrollOffset -= playerRef.current.speed;
                  platformsRef.current.forEach(platform => {
                    platform.position.x += playerRef.current.speed;
                  });
                  genericObject.current.forEach(genericObject => {
                    genericObject.position.x += playerRef.current.speed * 0.66;
                  });

                  boxesRef.current.forEach(box => {
                    box.position.x += playerRef.current.speed;
                  });
                  setTextPosition(prev => prev + playerRef.current.speed * 0.1);
                  // Move portfolio sections with player
                  setPortfolioOffset(scrollOffset);
                  
                }else {
  playerRef.current.velocity.x = 0; // Stop player from moving further
}
            }

            platformsRef.current.forEach(platform => {
                if (
                    playerRef.current.position.y + playerRef.current.height <= platform.position.y &&
                    playerRef.current.position.y + playerRef.current.height + playerRef.current.velocity.y >= platform.position.y &&
                    playerRef.current.position.x + playerRef.current.width >= platform.position.x &&
                    playerRef.current.position.x <= platform.position.x + platform.width
                ) {
                    playerRef.current.velocity.y = 0;
                }
            });
          if (playerRef.current.position.y < 0) {
    playerRef.current.velocity.y = 0; // Stop upward movement
    playerRef.current.position.y = 0; // Keep the player within the screen
}
          
          //sprite switching condition

          if ( keys.current.right.pressed  &&
            lastKey === 'right' && playerRef.current.currentSprite !== playerRef.current.sprites.run.right) {
            playerRef.current.frames = 1;
            playerRef.current.currentSprite = playerRef.current.sprites.run.right;
            playerRef.current.currentCropWidth = playerRef.current.sprites.run.cropWidth;
            playerRef.current.width = playerRef.current.sprites.run.width;

          } else if ( keys.current.left.pressed &&
            lastKey === 'left' && playerRef.current.currentSprite !== playerRef.current.sprites.run.left) { 
              playerRef.current.currentSprite = playerRef.current.sprites.run.left;
                playerRef.current.currentCropWidth = playerRef.current.sprites.run.cropWidth;
                playerRef.current.width = playerRef.current.sprites.run.width;
          } else if ( !keys.current.left.pressed &&
            lastKey === 'left' && playerRef.current.currentSprite !== playerRef.current.sprites.stand.right) { 
              playerRef.current.currentSprite = playerRef.current.sprites.stand.right;
                playerRef.current.currentCropWidth = playerRef.current.sprites.stand.cropWidth;
                playerRef.current.width = playerRef.current.sprites.stand.width;
          }else if ( !keys.current.right.pressed &&
            lastKey === 'right' && playerRef.current.currentSprite !== playerRef.current.sprites.stand.right) { 
              playerRef.current.currentSprite = playerRef.current.sprites.stand.right;
                playerRef.current.currentCropWidth = playerRef.current.sprites.stand.cropWidth;
                playerRef.current.width = playerRef.current.sprites.stand.width;
          } else if (keys.current.down.pressed && lastKey === 'down') {
            playerRef.current.currentSprite = playerRef.current.sprites.down.down;
            playerRef.current.currentCropWidth = playerRef.current.sprites.down.cropWidth;
            playerRef.current.width = playerRef.current.sprites.down.width;
          }

          //Mystery box condition
          
          boxesRef.current.forEach((box) => {
  // **🔽 Player hits box from below**
  if (
        playerRef.current.velocity.y < 0 && // Player is moving upwards
        playerRef.current.position.y >= box.position.y + box.height && // Player is coming from below
        playerRef.current.position.y + playerRef.current.velocity.y <= box.position.y + box.height && // Player's head will collide
        playerRef.current.position.x + playerRef.current.width >= box.position.x && // X collision
        playerRef.current.position.x <= box.position.x + box.width
    ) {
        playerRef.current.velocity.y = 0; // Stop upward movement
        playerRef.current.position.y = box.position.y + box.height-3; // Prevent passing through

        setActiveBox(box.id); // Activate the box
        box.bump(); // Trigger the box bump animation
    }

  // **⬇️ Player lands on the box**
  if (
    playerRef.current.position.y + playerRef.current.height <= box.position.y &&
    playerRef.current.position.y + playerRef.current.height + playerRef.current.velocity.y >= box.position.y &&
    playerRef.current.position.x + playerRef.current.width >= box.position.x &&
    playerRef.current.position.x <= box.position.x + box.width
  ) {
    setActiveBox(null);
    playerRef.current.velocity.y = 0; // Stop falling
    playerRef.current.position.y = box.position.y - playerRef.current.height; // Place player on top
  }
});


          
          //lose condition
          if (playerRef.current.position.y > canvas.height) { 
            init();
          }

        };
      init();

      animate();


        const handleKeyDown = (event) => {
            switch (event.key) {
              case "ArrowUp":
                    playerRef.current.velocity.y = -20; 
                    break;
              case "ArrowDown":
                playerRef.current.currentSprite = playerRef.current.sprites.down.down;
            playerRef.current.currentCropWidth = playerRef.current.sprites.down.cropWidth;
            playerRef.current.width = playerRef.current.sprites.down.width;
                lastKey = 'down';
            const isNearContacts = scrollOffset > 7000

                if (isNearContacts) {
                  setIsContactsModalOpen(true);
                } else setIsContactsModalOpen(false);
                    break;
              case "ArrowLeft":
                keys.current.left.pressed = true;
                lastKey = 'left';

                    break;
              case "ArrowRight":
                keys.current.right.pressed = true;
                lastKey = 'right'
                break;
        default:
          break;
            }
        };

        const handleKeyUp = (event) => {
            switch (event.key) {
                case "ArrowLeft":
                keys.current.left.pressed = false;
                playerRef.current.currentSprite = playerRef.current.sprites.stand.right;
                playerRef.current.currentCropWidth = playerRef.current.sprites.stand.cropWidth;
                playerRef.current.width = playerRef.current.sprites.stand.width;
                    break;
                case "ArrowRight":
                keys.current.right.pressed = false;
                
                break;
              case "ArrowDown":
                playerRef.current.currentSprite = playerRef.current.sprites.stand.right;
            playerRef.current.currentCropWidth = playerRef.current.sprites.stand.cropWidth;
                playerRef.current.width = playerRef.current.sprites.stand.width;
            break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [canvasSize]);

  return (
    <>
      <div style={{position: "relative", width: "100vw", height: "100vh", overflow: "hidden"}}>
        <canvas ref={canvasRef} style={{ display: "block", width: "100vw", height: "100vh", position: "absolute",
    top: "0",
    left: "0",
          zIndex: 0
        }} />
        <Portfolio scrollOffset={portfolioOffset} style={{zIndex: 1, position: "absolute"}} />
        <div className='keys-box'>
          <img src={require('./assets/img/keys.svg').default}/>
        </div>
        <Contacts show={ isContactsModalOpen} onHide={() => setIsContactsModalOpen(false)}/>
        
{/* React-Bootstrap Modal */}
        <ModalWindow activeBox={activeBox} handleClose={handleClose} />

      </div>
    </>
  )
};

export default App;
