require(['ko/index', 'events/hotkeys', 'game/main', 'game/customGame-mod',
    'game/menu-mod'],
    function(bindings, hotkeys, main, customGameModule, menuModule) {

    window.main = main;

    hotkeys.init(document, document.getElementById('game-module'));

    main.init({
        gameElement: document.getElementById('game-module')
    });
    main.start();

    customGameModule.init(document.getElementById('custom-game-module'));
    menuModule.init(document.getElementById('menu-module'));

    var wrapper = document.getElementById('wrapper');
    wrapper.className = wrapper.className.replace(/\bhidden\b/, '');
});