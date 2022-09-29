
fetch('https://pokeapi.co/api/v2/ability/7/')
    .then(response => response.json())
    .then(data => mostrarApi(data))
    .catch(error => console.log(error))
    
    let mostrarApi = (data) => {
        let placeApi = '';
        console.log(data)
        data.forEach(function(p, i){
            placeApi += `<span>${data.p}`
        });
    document.getElementById('data').innerHTML = placeApi
}
