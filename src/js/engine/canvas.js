/* global maxBalls, elementCounter */

/**
 * Объект конфигурации и управления игровым полем.
 * @returns {Canvas}
 */
function createCanvas() {
    return {

        // Флаг отрисовки поля.
        _hidden: false,

        // Количество созданных шариков в игре.
        _ballCouter: 0,

        // Сохраняем таймер.
        _timerId: null,

        // ИД блока.
        _id: "canvas",

        // Ход.
        _turn: 1,

        // ХТМЛ элемент компонента.
        _el: null,

        //  ХТМЛ элемент родительского блока.
        _parentEl: null,

        // Флаг отрисовки.
        _rendered: false,

        /**
         * Инициализация объекта.
         */
        init: function() {
            // Получаем элемент.
            this._el = createEl("div", this.getId());
        },

        /**
         * Проверить скрытие объекта.
         * @returns {Boolean} - Текущее значание. Если True - то скрыто.
         */
        isHidden: function() {
            return this._hidden;
        },

        /**
         * Задать скрытие объекта.
         * @param {Boolean} value - Флаг скрытия.
         */
        setHidden: function(value) {
            this._hidden = value;
        },

        /**
         * Получить ИД объекта.
         * @returns {String} - ИД объекта.
         */
        getId: function() {
            return this._id;
        },

        /**
         * Получить ХТМЛ блок объекта.
         * @returns {HTMLElement} - ХТМЛ елемент.
         */
        getEl: function() {
            return this._el;
        },

        /**
         * Получить ХТМЛ блок родителя.
         * @returns {HTMLElement} - ХТМЛ елемент.
         */
        getParentEl: function() {
            return this._parentEl;
        },

        /**
         * Задать элемент куда будет отрисован компонент.
         * @param {HTMLElement} htmlEl - ХТМЛ елемент.
         */
        renderTo: function(htmlEl) {
            this._parentEl = htmlEl;
        },

        /**
         * Отрисовать объект.
         */
        render: function() {
            // Не даем удалять удаленный компонент и наоборот.
            if (this.isHidden()) {
                if (this._rendered) {
                    this._el.remove();
                    this._rendered = false;
                }
            } else {
                if (!this._rendered) {
                    var parent = this.getParentEl();
                    parent.appendChild(this.getEl());
                    this._rendered = true;
                }
            }
        },

        /**
         * Сброс настроек поля.
         */
        reset: function() {
            this._el.innerHTML = "";
            this._turn = 1;
        },

        /**
         * Создать случайный цвет шарика.
         * @returns {BallConfig} - Значение цвета.
         */
        getRandomBallConfig: function() {
            // Инициируем переменные.
            var rnd, configList, config;
            configList = [
                { color: "LightSalmon",			type: "value_5"	},
                { color: "Coral",				type: "value_5" },
                { color: "Tomato" ,				type: "value_5" },
                { color: "OrangeRed",			type: "value_5" },
                { color: "DarkOrange",			type: "value_5" },
                { color: "Orange",				type: "value_5" },
                { color: "Beige",				type: "add_time" },
                { color: "Pink",				type: "value_4" },
                { color: "LightPink",			type: "value_4" },
                { color: "HotPink",				type: "value_4" },
                { color: "DeepPink",			type: "value_4" },
                { color: "MediumVioletRed",		type: "value_4" },
                { color: "PaleVioletRed",		type: "value_4" },
                { color: "SteelBlue",			type: "add_life" },
                { color: "IndianRed",			type: "value_3" },
                { color: "LightCoral",			type: "value_3" },
                { color: "Salmon",				type: "value_3" },
                { color: "DarkSalmon",			type: "value_3" },
                { color: "LightSalmon",			type: "value_3" },
                { color: "Crimson",				type: "value_3" },
                { color: "Red",					type: "value_3" },
                { color: "FireBrick",			type: "value_3" },
                { color: "DarkRed",				type: "value_3" },
                { color: "White",				type: "add_time" },
                { color: "Gold",				type: "value_2" },
                { color: "Yellow",				type: "value_2" },
                { color: "LightYellow",			type: "value_2" },
                { color: "LemonChiffon",		type: "value_2" },
                { color: "LightGoldenrodYellow",type: "value_2" },
                { color: "PapayaWhip",			type: "value_2" },
                { color: "Moccasin",			type: "value_2" },
                { color: "PeachPuff",			type: "value_2" },
                { color: "PaleGoldenrod",		type: "value_2" },
                { color: "Khaki",				type: "value_2" },
                { color: "DarkKhaki",			type: "value_2" },
                { color: "Black",				type: "rem_life" },
                { color: "GreenYellow",			type: "value_1" },
                { color: "Chartreuse",			type: "value_1" },
                { color: "LawnGreen",			type: "value_1" },
                { color: "Lime",				type: "value_1" },
                { color: "LimeGreen",			type: "value_1" },
                { color: "PaleGreen",			type: "value_1" },
                { color: "LightGreen",			type: "value_1" },
                { color: "MediumSpringGreen",	type: "value_1" },
                { color: "SpringGreen",			type: "value_1" },
                { color: "MediumSeaGreen",		type: "value_1" },
                { color: "SeaGreen",			type: "value_1" },
                { color: "ForestGreen",			type: "value_1" },
                { color: "Green",				type: "value_1" },
                { color: "DarkGreen",			type: "value_1" },
                { color: "YellowGreen",			type: "value_1" },
                { color: "OliveDrab",			type: "value_1" },
                { color: "Olive",				type: "value_1" },
                { color: "DarkOliveGreen",		type: "value_1" },
                { color: "MediumAquamarine",	type: "value_1" },
                { color: "DarkSeaGreen",		type: "value_1" },
                { color: "LightSeaGreen",		type: "value_1" },
                { color: "DarkCyan",			type: "value_1" },
                { color: "Teal",				type: "value_1" }
            ];
            // Получаем случайный номер цвета.
            rnd = random(configList.length - 1);
            // Получаем цвет/тип.
            config = configList[rnd];
            // Задаем начальное положение (лево/право)ж
            config["className"] = random(10) > 5 ? "left" : "right";

            return config;
        },

        /**
         * Создать шарики.
         */
        createBalls: function() {
            // Если компонент отрисован. (устранило артефакт, когда поле исчезало,
            // а таймер дорисовывал туда шарик.)
            if (this._rendered) {

                // Генерируем количество шариков.
                var count = random(1, maxBalls);

                // Пока количество больше нуля.
                while(count > 0) {
                    // Создаем шарик.
                    var ballConfig, ball;
                    ball = createBall();

                    // Получаем конфигурацию.
                    ballConfig = this.getRandomBallConfig();
                    ballConfig["id"] = ("ball_" + elementCounter++);

                    // Инициализируем шарик.
                    ball.init(ballConfig);

                    // Событие на наведении мышкой.
                    ball.onMouseOver(this.onBallEvent, this);

                    // Задаем размер шарика.
                    ball.setWidth(50);
                    ball.setHeight(50);

                    // Задаем куда отрисовывать и рисуем.
                    ball.renderTo(this.getEl());
                    ball.render();

                    // Устанавливаем задержку появления.
                    ball.setTimeout(this.onBallCreate, 200, this);

                    // минус нарисованный шарик ;)
                    count--;
                }

                // Увеличиваем "сложность"
                this._turn++;
            }
        },

        /**
         * Проверка, есть ли на поле шары.
         * @returns {Boolean} - Результат операции.
         */
        hasChilds: function() {
            var el = this.getEl();
            return el.childElementCount > 0;
        },

        /**
         * Создать шарики.
         * @param {Ball} ball - Указатель на шарик.
         * @param {Canvas} self - Игровое поле.
         */
        onBallCreate: function(ball, self) {
            var x, y;

            // Задаем случайные координаты.
            x = random(50, 590);
            y = random(50, 300);
            ball.setPositionXY(x, y);

            // Рисуем шарик.
            ball.setHidden(false);
            ball.render();

            // Начинаем "падение" после отрисовки.
            setTimeout(function(ball, scope){
                var el = ball.getEl();
                var timer = Math.round(200 / scope._turn);
                // конфигурируем анимацию.
                el.style.transition = "all 0s";

                // Задаем периодическую функцию падения.
                var timerBall = setInterval(function(ball, scope){
                    // Двигаем вниз.
                    ball.dropDown();

                    // Проверяем не упали ли.
                    var posXY = ball.getPositionXY(x, y);
                    if (posXY.y > 480) {

                        // Обрабатываем падение шарика.
                        scope.onBallEvent(ball, "drop", scope);

                        // Чистим "уши".
                        clearInterval(timerBall);
                    }
                }, (timer < 1 ? 1 : timer), ball, scope);
            }, 800, ball, self);
        },

        /**
         * Создать шарики.
         * @param {Ball} ball - Указатель на шарик.
         * @param {Canvas} scope - Указатель на объект обработки.
         */
        onBallDelete: function(ball, scope) {
            // Прачем и удаляем шарик.
            ball.setHidden(true);
            ball.render();
            ball = null;

            // Если нет больше шариковю
            if (!scope.hasChilds()) {
                // отрисовываем заново шарики.
                scope.createBalls();
            }
        },

        /**
         * Обработчик на  шарика.
         * @param {Ball} ball - Шарик.
         * @param {Event} event - Событие элемента.
         * @param {Canvas} scope - Игровое поле.
         */
        onBallEvent: function(ball, event, scope) {
            if (!ball.isDeleting()) {
                // Получаем шарик.
                var el = ball.getEl();

                // "Гасим" его.
                el.style.opacity = 0;

                // Вызываем обработчик нажатия.
                scope.onStartDelete(ball, event);

                // Удаляем шарик.
                ball.setDeleting(true);
                setTimeout(scope.onBallDelete, 1000, ball, scope);
            }
        },

        /**
         * Обработчик события на начало удаления шарика.
         * @param {Ball} ball - Шарик.
         */
        onStartDelete: function(ball) {}
    };
}