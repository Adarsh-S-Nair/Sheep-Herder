const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 576;

c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width, canvas.height);

const background = new Image();
background.src = './images/Barn.png'

const playerImage = new Image()
playerImage.src = './images/player.png';

background.onload = () => {
    c.drawImage(background, -1175, -650);
    const xCenter = (canvas.width / 2);
    const yCenter = (canvas.height / 2);
    c.drawImage(
        playerImage,
        0,
        0,
        playerImage.width / 4,
        playerImage.height / 5,
        xCenter,
        yCenter,
        playerImage.width / 4,
        playerImage.height / 5
    )
}

