const http = require('http');

const app = http.createServer((request, response) => {
  response.setHeader('Content-Type', 'application/json');

  if(request.url === '/agents') {

    response.end(JSON.stringify({
      'agents': [
        {
        'william zhang': {
          'company': 'berkshire hathaway homeservice',
          'company address': '18600 macarthur blvd ste 150',
          'city': 'irvine, ca'
        }
      },
      {
        'deborah see': {
            'company': 'big block realty, inc.',
            'company address': '1172 robin pl',
            'city': 'vista, ca'
        }
      },
      {
        'juana gonzalez': {
          'company': 'century 21 a better service',
          'company address': '9235 priscilla st',
          'city': 'downey, ca'
        }
      },
      {
        'kyle warner': {
          'company': 'compass(sebastopol)',
          'company address': '800 mission blvd ste 18',
          'city': 'santa rosa, ca'
        }
      }
      ]
    }));
  }
  if(request.url === '/owners') {
    response.end(JSON.stringify({
      'owners': [
        {
          'amiee mccloskey': {
            'property address': '3445 hunter st',
            'city': 'los angeles, ca',
            'property type': 'residential'
          }
        },
        {
          'lelah espiritu': {
            'property address': '1158 rosalind ave',
            'city': 'los angeles, ca',
            'property type': 'residential'
          }
        },
        {
          'kirby leard': {
            'property address': '1178 s lorena st',
            'city': 'los angeles, ca',
            'property type': 'commercial'
          }
        },
        {
          'chandra pereira': {
            'property address': '1109 1/2 euclid ave',
            'city': 'los angles, ca',
            'property type': 'residential'
          }
        }
      ]
    }));
  }
});

app.listen(3032);
