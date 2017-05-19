import { ToastAndroid } from 'react-native'

let paramAnnotation: {
  method?: string,
  url: string,
  headers?: typeof Headers,
  body?: any,
  onSuccess: Function,
  onError: Function,
}

export function sendHttpRequest(param: typeof paramAnnotation) {
  
  return fetch(param.url, {
      method: param.method ? param.method : 'GET',
      headers: param.headers,
      body: param.body
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(json => {
      param.onSuccess(json)
      return json
    })
    .catch((err) => {
      console.log(err.message)
      if (err.message == 'Network request failed') ToastAndroid.show('Koneksi gagal, mohon periksa jaringan internet Anda', ToastAndroid.LONG);
      else ToastAndroid.show(err.message, ToastAndroid.LONG);
      param.onError(err)
    });
}

async function handleErrors(response) {
  if (!response.ok) {
    switch (response.status) {
      case 400:
        if (response.data && response.data.message) {
          throw Error('Maaf terjadi kesalahan di aplikasi. Hubungi Tim IT. (' + response.data.message + ')')
        }

        throw Error('Maaf terjadi kesalahan di aplikasi. Hubungi Tim IT.')
      case 401:
        if (response.url.indexOf('login') !== -1) throw Error('Username atau Password salah')
        throw Error('Sesi Anda kadaluarsa, silahkan logut dan login kembali.')
      case 500:
        await response.json().then((json) => {
          if (json.message) throw Error(json.message)
          throw Error('Maaf terjadi kesalahan pada server. Hubungi Tim IT.')
        })

      // possible case for server RTO. src: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
      case 444:
      case 504:
        throw Error('Maaf, tidak ada respon dari server. Hubung Tim IT.')
    }
  }

  return response
}