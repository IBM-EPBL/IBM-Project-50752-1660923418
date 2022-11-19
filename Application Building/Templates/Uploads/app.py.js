const   chooseButton = document.querySelector('button.primary-button'),
        classifyButton = document.querySelector('button.secondary-button');
let     userFile;

// Event Listeners
chooseButton.addEventListener('click', (e)=>{
    // Creating an input element to select the file
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/png, image/jpeg, image/jpg');
    input.setAttribute('name', 'file');
    input.click();
    input.onchange = function(){
        const imageViewer = document.querySelector('#image-viewer');
        
        // Displaying Image selected on the web page
        const reader = new FileReader();
        reader.onload = function(event){
            imageViewer.src = event.target.result;
            imageViewer.style.marginTop = '2rem';
            imageViewer.style.height = '300px';
            imageViewer.style.width = '300px';
        }
        reader.readAsDataURL(input.files[0]);
        userFile = input.files[0];
    }
})

classifyButton.addEventListener('click', (e)=> {
    const formData = new FormData();
    formData.append('file', userFile);
    fetch('/predict', {
        method: 'POST', 
        body: formData
    })
    .then((response)=> response.json())
    .then((res)=> {
        const   result = document.querySelector('#output-result'), 
                apiResult = document.querySelector('#output-api-result'), 
                outputWrapper = document.querySelector('#output-wrapper'), 
                p = document.querySelector('#output > p');
                
        
        console.log(res.apiResult[0])
        
        result.innerText = res.result;
        apiResult.innerHTML = `${JSON.stringify(res.apiResult[0])}`;
        p.style.display = 'block';
        outputWrapper.style.display = 'block';
    })
})
