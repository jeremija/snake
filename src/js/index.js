require(['ko/index', 'game/main', 'game/configurationForm'],
    function(bindings, main, configurationForm) {

    window.main = main;


    main.init({
        gameElement: document.getElementById('game'),
        keysElement: document
    });
    main.start();

    configurationForm.init(document.getElementById('config'));
});