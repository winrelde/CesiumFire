import axios from 'axios'

export function getWeather() {
    return axios({
        url: 'https://devapi.qweather.com/v7/weather/3d?location=119.514,27.444&key=589d699389904131a904dab25872c6a9',
        method: 'get',
        // params: {
        //     location: '119.514,27.444',
        //     key: '589d699389904131a904dab25872c6a9',
        //     lang: 'zh',
        // },
        dataType: 'json',
        async: false,
    })
}