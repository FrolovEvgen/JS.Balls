/* global maxBalls, elementCounter */

/**
 * Объект конфигурации и управления игровым полем.
 * @returns {Canvas}
 */
function createCanvas() {
    /**
     * @typedef {object} Canvas - 'Game Field' component.
     */
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
         * Get random ball configuration.
         * @returns {BallConfig}
         */
        getRandomBallConfig: function() {
            var ballConfig = { class: null, type: null, position: null, id: null, rotate: 0};
            ballConfig.type = this.getRandomBallType();
            ballConfig.position = this.getRandomBallPosition();
            ballConfig.class = this.getRandomBallClass(ballConfig.type);
            ballConfig.rotate = (random(360) - 180);
            return ballConfig;
        },

        /**
         * Get random ball type.
         * @returns {string}
         */
        getRandomBallType: function() {
            var rnd,  ballTypes = [ BallType.TYPE_1, BallType.TYPE_1, BallType.TYPE_1,
                BallType.TYPE_1, BallType.TYPE_1, BallType.TYPE_2,
                BallType.TYPE_2, BallType.TYPE_2, BallType.TYPE_2,
                BallType.TYPE_3, BallType.TYPE_3, BallType.TYPE_3,
                BallType.TYPE_4, BallType.TYPE_4, BallType.TYPE_5,
                BallType.EXTRA_LIFE, BallType.EXTRA_TIME, BallType.EXTRA_TIME,
                BallType.KILLER, BallType.KILLER, BallType.KILLER];
            // Get random type.
            rnd = random(ballTypes.length - 1);
            // Retyrn type value.
            return ballTypes[rnd];
        },

        /**
         * Get random ball start position.
         * @returns {string} Position "left" or "right".
         */
        getRandomBallPosition: function() {
            return random(10) > 5 ? "left" : "right";
        },

        /**
         * Get random ball class from specified type.
         *
         * @param {string} ballType Ball type.
         * @returns {string} Ball class;
         */
        getRandomBallClass: function(ballType) {
            var rnd, ballClasses = {};

            switch (ballType) {
                case BallType.KILLER:
                    return "removelife";

                case BallType.EXTRA_TIME:
                    return "extratime";

                case BallType.EXTRA_LIFE:
                    return "extralife";

                case BallType.TYPE_1:
                    ballClasses = ["greenyellow", "chartreuse",
                    "lawngreen", "lime", "limegreen", "palegreen", "lightgreen",
                    "mediumspringgreen", "springgreen", "mediumseagreen", "seagreen",
                    "forestgreen", "green", "darkgreen", "yellowgreen", "olivedrab",
                    "olive", "darkolivegreen", "mediumaquamarine", "darkseagreen",
                    "lightseagreen", "darkcyan", "teal"];
                    break;

                case BallType.TYPE_2:
                    ballClasses = ["gold", "yellow", "lightyellow",
                    "lemonchiffon", "lightgoldenrodyellow", "papayawhip", "moccasin",
                    "peachpuff", "palegoldenrod", "khaki", "darkkhaki"];
                    break;

                case BallType.TYPE_3:
                    ballClasses = ["indianred", "lightcoral", "salmon",
                    "darksalmon", "lightsalmon", "crimson", "red", "firebrick",
                    "darkred"];
                    break;

                case BallType.TYPE_4:
                    ballClasses = ["pink", "lightpink", "hotpink",
                    "deeppink", "mediumvioletred", "palevioletred"];
                    break;

                case BallType.TYPE_5:
                    ballClasses = ["lightsalmon", "coral", "tomato",
                    "orangered", "darkorange", "orange"];
                    break;

                default:
                    return "";
            }
            rnd = random(ballClasses.length - 1);
            return ballClasses[rnd];
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