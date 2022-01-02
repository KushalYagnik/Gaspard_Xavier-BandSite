const myKey2 = "?api_key=a6ece6ac-e3b8-4849-a699-f9497aa4991e";
const myKey = '?api_key=226c5472-44d6-4e27-afb5-4070724aba91';

const getShows = () => {
    axios.get('https://project-1-api.herokuapp.com/showdates'+myKey)
        .then(res => {
            console.log(res);
            let param = res.data;
            param.forEach(element => {
                parseShows(element); 
            });
        })    
}
getShows();

const parseShows = (param) => {
    let container = document.querySelector('.shows__container');

    let showsUnit = document.createElement('div');
    showsUnit.className = 'shows__unit';

    let label1 = document.createElement('label');
    label1.className = 'shows__date-label lbl';
    label1.innerText = 'Date';
    showsUnit.appendChild(label1);

    let date = document.createElement('h3');
    date.className = 'shows__date shows__align';
    date.innerText = param.date;
    showsUnit.appendChild(date);


    let label2 = document.createElement('label');
    label2.className = 'shows__venue-label lbl';
    label2.innerText = 'Venue';
    showsUnit.appendChild(label2);

    let venue = document.createElement('h5');
    venue.className = 'shows__venue shows__align';
    venue.innerText = param.place;
    showsUnit.appendChild(venue);


    let label3 = document.createElement('label');
    label3.className = 'shows__location-label lbl';
    label3.innerText = 'Location';
    showsUnit.appendChild(label3);

    let location = document.createElement('h5');
    location.className = 'shows__location shows__align';
    location.innerText = param.location;
    showsUnit.appendChild(location);


    let submit = document.createElement('button');
    submit.className = 'shows__tickets shows__align btn';
    submit.innerText = 'Buy Tickets';
    showsUnit.appendChild(submit);

    container.appendChild(showsUnit);
}

