function main ()
{
    var request = new XMLHttpRequest();
    var url = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
    
    document.getElementById("errorPhotos").style.display = "none";
    if (!CheckIfOk()) return 0;

    request.open('GET', url + document.getElementById("rover").value + "/photos?sol=" + document.getElementById("sol").value + "&camera=" + document.getElementById("camera").value + "&api_key=DEMO_KEY" );
    request.responseType = 'json';
    request.send();

    request.onload = function()
    {
        var resp = request.response;
        
        console.log(resp);

        console.log(Object.keys(resp.photos).length);
        
        if (Object.keys(resp.photos).length === 0) 
        {
            document.getElementById("errorPhotos").style.display = "block";
            document.getElementById("images").style.display = "none";
            document.getElementById("images").innerHTML = "";
        }
        else 
        {  
            var images = document.getElementById("images");
            images.style.display = "block";
            images.innerHTML = "";

            var lenght;
            if (document.getElementById("checkbox").checked && Object.keys(resp.photos).length > parseInt(document.getElementById("count").value)) 
                lenght = parseInt(document.getElementById("count").value);
            else lenght = Object.keys(resp.photos).length;

            for (var i = 0; i < lenght; i++)
            {
                var img = document.createElement("img");
                img.style.margin = "10px 0 0 55px";
                img.src = resp.photos[i].img_src;
                images.appendChild(img);
            }
        }
    }
}

function CheckIfOk()
{
    var NoErrors = true;

    var count = parseInt(document.getElementById("count").value);
    var sol = parseInt(document.getElementById("sol").value);
    var rover = document.getElementById("rover");
    var cam = document.getElementById("camera");

    if (!CheckInt(sol)) NoErrors = false;
    if (!CheckInt(count) && document.getElementById("checkbox").checked) NoErrors = false;


    switch(rover.value)
    {
        case "curiosity":{
            switch(cam.value){
                case "PANCAM":{NoErrors = false; break;}
                case "MINITES":{NoErrors = false; break;}
            }
            break;}
        case "opportunity":{
            switch(cam.value){
                case "MAST":{NoErrors = false; break;}
                case "CHEMCAM":{NoErrors = false; break;}
                case "MAHLI":{NoErrors = false; break}
                case "MARDI":{NoErrors = false; break;}
            }
            break;}
        case "spirit":{
            switch(cam.value){
                case "MAST":{NoErrors = false; break;}
                case "CHEMCAM":{NoErrors = false; break;}
                case "MAHLI":{NoErrors = false; break}
                case "MARDI":{NoErrors = false; break;}
            }
            break;}
    }

    if (NoErrors) document.getElementById("errorButton").style.display = "none";
    else 
    {
        document.getElementById("images").innerHTML = "";
        document.getElementById("errorButton").style.display = "block";
    }

    return NoErrors;
}

function CheckInt(input)
{
    if ((Number.isInteger(input) && input >= 0)) return true;
    else false;
}