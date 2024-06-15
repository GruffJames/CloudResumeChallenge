
import { view_counter_http_api_Id} from '../../keys/view_counter_http_api.js';
import { My_HTTP_API_Id} from '../../keys/My_HTTP_API.js';

let form = document.getElementsByTagName("form")[0];
if (form){
    form.addEventListener("submit", async (e) => {

        try {
          e.preventDefault();
          let theFormData = new FormData(form);
          let MessageBody = JSON.stringify({
          name: theFormData.get('name'),
          email: theFormData.get('email'),
          message: theFormData.get('message')
          });
          let ContactApiURL = `https://${My_HTTP_API_Id}.execute-api.eu-west-2.amazonaws.com/prod/items`;
          let ContactResponse = await fetch(ContactApiURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: MessageBody
          })
          window.location.href = '#ContactSent';
          form.reset();      
        } catch (error) {
          // const errorMessage = document.querySelector(".ContactIntroMessage");
          // // window.location.href = '#ContactSentFailed';
          // errorMessage.innerHTML = "Fill in all of the fields";
        }
    });
}

const counter = document.querySelector(".counter-number");
async function updateCounter() {
    try{
      let ViewCountApiURL = `https://${view_counter_http_api_Id}.execute-api.eu-west-2.amazonaws.com/prod/items`;
      let response = await fetch(ViewCountApiURL, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
      });
      let data = await response.json();
      let output = `Views : ${data.view_counter}`;
      counter.innerHTML = output;
    }
    catch{
        let output = `could nae read it`;
        counter.innerHTML = output;
    }
}
updateCounter();




