require(['ko/index', 'events/hotkeys', 'game/main', 'game/customGameModule',
    'game/menuModule'],
    function(bindings, hotkeys, main, customGameModule, menuModule) {

    window.main = main;

    hotkeys.init(document);

    main.init({
        gameElement: document.getElementById('game-module')
    });
    main.start();

    customGameModule.init(document.getElementById('custom-game-module'));
    menuModule.init(document.getElementById('menu-module'));

    var wrapper = document.getElementById('wrapper');
    wrapper.className = wrapper.className.replace(/\bhidden\b/, '');
});