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
