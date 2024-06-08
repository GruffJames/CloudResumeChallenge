let form = document.getElementsByTagName("form")[0];
if (form){
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        let theFormData = new FormData(form);
        let MessageBody = JSON.stringify({
        name: theFormData.get('name'),
        email: theFormData.get('email'),
        message: theFormData.get('message')
        });
        let ContactApiURL = `https://hbo8b661mc.execute-api.eu-west-2.amazonaws.com/prod/items`;
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
    });
}

const counter = document.querySelector(".counter-number");
async function updateCounter() {
    try{
      let ViewCountApiURL = `https://4dz632zab1.execute-api.eu-west-2.amazonaws.com/prod/items`;
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




