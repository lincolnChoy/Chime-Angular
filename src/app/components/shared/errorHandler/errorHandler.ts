export const errorHandler = (code: number) => {


    let message = '';
    switch (code) {
        case 1:
            message = 'Incorrect password/email.';
            break;
        case 2:
            message = 'Incorrect password/email.';
            break;
        case 3:
            message = 'Please fill out all the fields';
            break;
        case 4:
            message = 'Please do not use special characters';
            break;
        case 6:
            message = 'A user with that email exists.';
            break;
        default:
            message = 'Something went wrong. Please try again.'
    }

    return message;
}