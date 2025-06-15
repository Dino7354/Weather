//Heper Function covert wind direction in degree

export const getWindDirection = (deg) => {

    if (deg > 337.5 || deg <= 22.5) return 'N';
    if (deg > 22.5 && deg <= 67.5) return 'NE';
    if (deg > 67.5 && deg <= 112.5) return 'E';
    if (deg > 112.5 && deg <= 157.5) return 'SE';
    if (deg > 157.5 && deg <= 202.5) return 'S';
    if (deg > 202.5 && deg <= 247.5) return 'SW';
    if (deg > 247.5 && deg <= 292.5) return 'W';
    if (deg > 292.5 && deg <= 337.5) return 'NW';
};

//This Function check the humidity value and return levels
export const getHumidityValue = (humidity) => {
    if (humidity < 30) return 'Low';
    if (humidity < 60) return 'Moderate';
    return 'High';
};



//This Function check the visibility value and return meter to kilometer
export const getVisibilityValue = (visibility) => {
    const km = visibility / 1000;
    return `${km.toFixed(1)} km`;
};

//This Function convert temperature from Celsius to Fahrenheit upto one decimal place
export const convertTemperature = (temp, unit) => {
    if (unit === 'F') {
        return (temp * 9 / 5 + 32).toFixed(1);
    }
    return temp.toFixed(1);
};

//This Function check wind speed and return levels
export const getWindSpeedValue = (speed) => {
    if (speed < 1) return 'Calm';
    if (speed < 5) return 'Light Air';
    if (speed < 12) return 'Light Breeze';
    if (speed < 20) return 'Moderate Breeze';
    if (speed < 30) return 'Fresh Breeze';
    if (speed < 40) return 'Strong Breeze';
    if (speed < 50) return 'Gale';
    if (speed < 60) return 'Strong Gale';
    if (speed < 75) return 'Storm';
    return 'Hurricane';
};

//This Function check the rain pressure and return levels
export const getPressureValue = (pressure) => {
    if (pressure < 1000) return 'Low';
    if (pressure < 1020) return 'Normal';
    return 'High';
};