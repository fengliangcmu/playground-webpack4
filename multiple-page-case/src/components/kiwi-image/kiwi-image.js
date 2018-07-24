import Kiwi from './Kiwi.jpeg';
import './kiwi-image.css';

class KiwiImage {
    render(){
        const img = document.createElement('img');
        img.src = Kiwi;
        img.alt = 'kiwi';
        img.classList.add('kiwi-image');

        const bodyDom = document.querySelector('body');
        bodyDom.appendChild(img);
    }
}

export default KiwiImage;