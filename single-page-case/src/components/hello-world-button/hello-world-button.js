import './hello-world-button.css';

class HelloWorldButton{

   buttonCssClass = 'hello-world-button';

   render(){
       const button = document.createElement('button');
       button.innerHTML = "hello world";
       button.classList.add(this.buttonCssClass);
       button.onclick = ()=>{
           const p = document.createElement('p');
           p.innerHTML = 'Hello World inside <p>';
           p.classList.add('hello-world-text');
           body.appendChild(p);
       }

       const body = document.querySelector('body');
       body.appendChild(button);
   }
}
export default HelloWorldButton;