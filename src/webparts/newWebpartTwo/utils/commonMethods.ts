import { COUNTRIES } from "./constants";

export const GetCurrency = (country) => {
    switch (country) {
        case COUNTRIES.India:
            return "INR";
            break;

        case COUNTRIES.Germany:
            return "Euro";
            break;
        case COUNTRIES.Canada:
            return "Dollar Canada";
            break;
        case COUNTRIES.USA:
            return "Dollar USA";
            break;

        default:
            break;
    }
}