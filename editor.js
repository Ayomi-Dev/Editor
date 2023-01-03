const fileInput = document.querySelector('.fileInput'), 
chooseImgBtn = document.querySelector('.choose-img'),
saveImgBtn = document.querySelector('.save-img'),
imgPreview = document.querySelector('.img-panel img'),
filterOptions = document.querySelectorAll('.filter button'),
filterName = document.querySelector('.filter-info .name'),
filterSlider  = document.querySelector('.filter input'),
rotateOption  = document.querySelectorAll('.transform button'),
filterValue = document.querySelector('.value'),
resetBtn = document.querySelector('.filter-control'),
container = document.querySelector('.container');


let rotate = 0, flipHorizontal = 1, flipVertical = 1;
let brightness = 100, saturation = 100, inversion = 0, grayscale = 0, contrast = 100, blur = 0;


const applyFilters = () =>  //call function to apply selected filters
{
    imgPreview.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`
    imgPreview.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%)
    grayscale(${grayscale}%) contrast(${contrast}%)  blur(${blur}px)`;
}

filterOptions.forEach((option) =>   //adding active class on each filter button when clicked
    option.addEventListener('click', ()=>{
        document.querySelector('.filter .active').classList.remove('active');
        option.classList.add('active');
        filterName.innerText = option.innerText; // adding button name accordingly

        if (option.id === 'brightness') { //condition for brightness filter accordingly with value 
            filterSlider.max = 200;
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`
        }
        else if(option.id === 'saturation'){//condition for saturation filter accordingly with value 
            filterSlider.max = 200;
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`
        }
        else if(option.id === 'inversion'){ //condition for inversion filter accordingly with values 
            filterSlider.max = 100;
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`
        }
        else if(option.id === 'grayscale'){ //condition for grayscale filter accordingly with values 
            filterSlider.max = 100;
            filterSlider.value = inversion;
            filterValue.innerText = `${grayscale}%`
        }
        else if(option.id === 'contrast'){  //condition for contrast filter accordingly with values 
            filterSlider.max = 200;
            filterSlider.value = contrast;
            filterValue.innerText = `${contrast}%`
        }
        else{               //condition for blur filter accordingly with values 
            filterSlider.max = 10;
            filterSlider.value = blur;
            filterValue.innerText = `${blur}%`
        }
    })
);
const loadImg = () => {            // defining the load image function
    let file = fileInput.files[0];    //getting selected file
    if(!file) return;
    imgPreview.src = URL.createObjectURL(file) // creating a url of passed file as preview img src
    imgPreview.addEventListener('load', () => {
        resetBtn.click();// reset all filters when user selects another image
        document.querySelector('.container').classList.remove('disable')
    })
}

const updateFilter = ()=>{
    filterValue.innerText = `${filterSlider.value}`//updating filter value
    const currentFilter = document.querySelector('.filter .active');

    if(currentFilter.id === 'brightness'){
        brightness = filterSlider.value
    }
    else if(currentFilter.id === 'saturation'){
        saturation = filterSlider.value
    }
    else if(currentFilter.id === 'inversion'){
        inversion = filterSlider.value
    }
    else if(currentFilter.id === 'grayscale'){
        grayscale = filterSlider.value
    }
    else if(currentFilter.id === 'contrast'){
        contrast = filterSlider.value
    }
    else{
        blur = filterSlider.value
    }

    applyFilters();
}

rotateOption.forEach((option) =>{
    option.addEventListener('click', ()=> { //event listeners to individual rotate/flip buttons
        if(option.id === 'left'){       
            rotate -= 90;
        }
        else if(option.id === 'right') {
            rotate += 90;
        }
        else if(option.id === 'horizontal'){
            //if value of horizontal flip is 1, then set to -1 else set to 1
            flipHorizontal = flipHorizontal === 1 ? -1 : 1
        }
        else{
            flipVertical = flipVertical === 1 ? -1 : 1
        }
        applyFilters();
    })
})

const resetFilter = () => {
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    brightness = 100; saturation = 100; inversion = 0; grayscale = 0; contrast = 100; blur=0;
    applyFilters();
    filterOptions[0].click();
}

const saveImg = () => { //click function for saving image
    const canvas = document.createElement('canvas');   //creating a canvas element
    const ctx = canvas.getContext("2d"); //returning a drawing using the canvas getcontext method


    canvas.width = imgPreview.naturalWidth; //setting canvas width to image  widtth
    canvas.height = imgPreview.naturalHeight; //setting canvas height to image  widtth

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%)
    grayscale(${grayscale}%)  contrast(${contrast}%)  blur(${blur}px)`;

    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0){
        ctx.rotate(rotate * Math.PI / 180)
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(imgPreview, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    // container.appendChild(canvas); //declaring the image to be drawn and its properties


    const link = document.createElement('a'); //creating an anchor tag to download image
    link.download = 'image.jpg'; //passing the tag download value to image.jpg
    link.href = canvas.toDataURL(); // passing the tag href to canvas data url
    link.click(); //click function to download the image
    imgPreview.src = 'preview.png'
    document.querySelector('.container').classList.add('disable');
    resetBtn.click();
}

resetBtn.addEventListener('click', resetFilter)
saveImgBtn.addEventListener('click', saveImg)
filterSlider.addEventListener('input', updateFilter)
fileInput.addEventListener('change', loadImg);    //call function to display selected image
chooseImgBtn.addEventListener('click', () => fileInput.click());



//TIME FUNCTION
let time = document.getElementById('time-change');
    setInterval(() => {
        let d = new Date();
            time.innerHTML = d.toLocaleTimeString();
    }, 1000);