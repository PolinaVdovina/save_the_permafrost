function getUrl(type) {
    let url = '/api/';
    
    switch (type) {
        case 'house':
            url += 'houses';
            break;
        case 'tube':
            url += 'tubes';
            break;
        case 'sample':
            url += 'tubes/samples';
            break;
    }

    return url;
}

export function change(type, json) {
    let url = getUrl(type);
    url += '/change';

    const postGet = {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    };
    fetch(url, (postGet)).then(response=>response.json())
}

export function add(type, json) {
    let url = getUrl(type);
    url += '/add';

    const postGet = {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    };
    fetch(url, (postGet)).then(response=>response.json())
}

export async function load(type, id) {
    let url = getUrl(type);
    url += '/' + id;

    const postGet = {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
          'Accept': 'application/json'
        },
    };
    let response = await fetch(url, (postGet));
    response = await response.json();
    return response;

}