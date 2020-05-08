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

export function add(type, json, next) {
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
    if (!next)
        fetch(url, (postGet)).then(response=>response.json())
    if (next)
        fetch(url, (postGet)).then(response=>response.json()).then(response => next() )
}

export function load(type, id, func) {
    let url = getUrl(type);
    url += '/' + id;

    const postGet = {
        method: 'POST',
        headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        'Accept': 'application/json'
        },
    };
    fetch(url, (postGet)).then(resolve => resolve.json()).then(resolve => func(resolve));
}


    
    