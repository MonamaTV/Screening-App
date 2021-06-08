

export function clientValidator(client) {

        if(client.name === "" || client.name.length < 1) return "Your name cannot be empty";

        if(client.surname === "" || client.surname.length < 1) return "Your surname cannot be empty";

        if(client.age === "") return "Enter client age";

        if(client.sex === "") return "Select client sex";

        if(client.cellphone === "" || client.cellphone.length !== 10) return "Cellphone number is invalid";

        return null;
}

export function addressValidator(address) {

    console.log(address)
    if(address.streetAddress === "") 
        return "Enter street address";

    if(address.town === "") 
        return "Enter town";

    if(address.postalCode === "") 
        return "Enter postal code";

    return null;

}
export function questionsValidator(questions) {
    
    if(questions.fever === "") return "Answer Fever question.";

    if(questions.cough === "") return "Answer Cough question.";

    if(questions.shortnessBreath === "") return "Answer shortness of breath question.";

    if(questions.soreThroat === "") return "Answer sore throat question.";

    if(questions.musclePain === "") return "Answer muscle pain question.";

    if(questions.lostTasteSmell === "") return "Answer lost taste or smell question.";

    return null;
}

