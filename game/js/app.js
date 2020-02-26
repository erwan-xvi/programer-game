let app =
{
    counter: 1,

    init() {
        app.welcomeVisiteur();
        app.welcomeInterval();
    },

    welcomeVisiteur() {
        let target = document.querySelector('.welcome');
        target.textContent = "Bonjour à toi";  
    },


    welcome() {
        let decreaseCounter = app.counter - 1;
        app.counter = decreaseCounter;
        
        if(app.counter < 0) {
            app.clearInterval();
            let message = document.querySelector('.welcome');
            message.textContent = "Trois commandes pour arriver à la case verte : avancer, tourner à gauche et tourner à droite. Bon courage!";   
        }  
    },

    welcomeInterval() {
        let interval = setInterval(app.welcome, 1000);
        return interval;
    },

    clearInterval() {
        clearInterval(app.welcomeInterval);
    },





}

app.init();