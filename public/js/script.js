// Start script.
console.log("Init...");

/**
 * ID counter for object's generator.
 * @type {number}
 */
var elementCounter = 0;
/**
 * Start number of lifes.
 * @type {number}
 */
var defaultLifes = 3;
/**
 * Default timer delay, sec.
 * @type {number}
 */
var defaultTimer = 60;
/**
 * Max ball quantity per throw.
 * @type {number}
 */
var maxBalls = 5;
/**
 * Generate random number between user defined range.
 * @param {number} min - Minimal value.
 * @param {number} max - (optional) Maximum value (include this!).
 * @returns {number} Generated number.
 */
function random(min, max) {
    // If 'max' is not defined, then 'min' is maximum and 0 is minimum.
    var _max = max || min;

    // If only minimum defined.
    if (_max === min) {
        // Generate number from 0 to maximum.
        return Math.floor(Math.random() * (_max + 1));
    } else {
        // Otherwise generate number between range.
        return (min + Math.floor(Math.random() * (max + 1 - min)));
    }
}
/**
 * Create HTML element with id.
 * @param {string} typeName - tag name.
 * @param {string} id - (optional) ID created element.
 * @returns {HTMLElement} - HTML element..
 */
function createEl(typeName, id) {
    id = id || null;

    // Create element.
    var htmlElement = document.createElement(typeName);

    // Apply ID.
    if (null !== id) {
        htmlElement.id = id;
    } else {
        // If not set we generate new.
        htmlElement.id = typeName + '_' + elementCounter++;
    }
    return htmlElement;
}








/**
 * Объект конфигурации и управления игровым приложением.
 * @returns {Game}
 */
function createGame() {
    /**
     * @typedef {object} Game
     */

    return {
        // Game field component.
        _canvas: null,

        // Header component
        _header: null,

        // Start game component.
        _startBlock: null,

        // Finish game component.
        _endBlock: null,

        // Game started.
        _gameStarted: false,

        // Timer function's id.
        _timerId: null,

        // Component's id.
        _id: "app",

        // Component's html element.
        _el: null,

        // Parent's html element.
        _parentEl: document.body,

        // Rendered flag.
        _rendered: false,

        /**
         * Initiate component.
         */
        init: function() {
            this.renderTo(document.body);

            // Create component's element.
            this._el = createEl("div");
            this._el.id = this._id;

            // Create and init 'Game field' component.
            this._canvas = createCanvas();
            this.initCanvas();

            // Create and init 'Header' component.
            this._header = createHeader();
            this.initHeader();

            // Create and init 'Game start' component.
            this._startBlock = createStartBlock();
            this.initStartBlock();

            // Create and init 'Game end' component.
            this._endBlock = createEndBlock();
            this.initEndBlock();
        },

        /**
         * Initiate 'Game field' component.
         * @private
         */
        initCanvas: function(){
            var self, canvas;
            // Handle itself.
            self = this;

            // Get component.
            canvas = this.getCanvas();
            canvas.renderTo(this.getEl());

            // Add listener to deleting ball.
            canvas.onStartDelete = function(ball, event) {
                self.onBallDelete(ball, event);
            };

            // Init component.
            canvas.init();
        },

        /**
         * Initiate 'Header' component.
         * @private
         */
        initHeader: function(){
            // Get component.
            var header = this.getHeader();
            header.renderTo(this.getEl());

            // Init component.
            header.init();
        },

        /**
         * Initiate 'Start game' component.
         * @private
         */
        initStartBlock: function(){
            var self, startBlock;
            // Handle itself.
            self = this;

            // Get component.
            startBlock = this.getStartBlock();
            startBlock.renderTo(this.getEl());

            // Add listener to click on 'Start' button.
            startBlock.onStartButtonClick = function() {
                self.onStartButtonClick();
            };

            // Init component.
            startBlock.init();
        },

        /**
         * Initiate 'End game' component.
         * @private
         */
        initEndBlock: function(){
            // Получить финишный блок.
            var endBlock = this.getEndBlock();
            endBlock.renderTo(this.getEl());
            // Инициировать.
            endBlock.init();
            // Задать обработчики.
            endBlock.onButtonClick(this.onRestartButtonClick, this);
        },

        /**
         * Get ID.
         * @returns {string} - Component's id.
         */
        getId: function() {
            return this._id;
        },

        /**
         * Get component's HTML element.
         * @returns {HTMLElement} - Components element.
         */
        getEl: function() {
            return this._el;
        },

        /**
         * Get parent's HTML element.
         * @returns {HTMLElement} - Components element.
         */
        getParentEl: function() {
            return this._parentEl;
        },

        /**
         * Set HTML element where we render this component.
         * @param {HTMLElement} htmlEl - Parent's HTML element.
         */
        renderTo: function(htmlEl) {
            this._parentEl = htmlEl;
        },

        /**
         * Get 'Game Field' component.
         * @returns {Canvas} - Component.
         */
        getCanvas: function() {
            return this._canvas;
        },

        /**
         * Get 'Header' component.
         * @returns {Header} - Component.
         */
        getHeader: function() {
            return this._header;
        },

        /**
         * Get 'Start game' component.
         * @returns {StartBlock} - Component.
         */
        getStartBlock: function() {
            return this._startBlock;
        },

        /**
         * Get 'End game' component.
         * @returns {EndBlock} - Component.
         */
        getEndBlock: function() {
            return this._endBlock;
        },

        /**
         * Draw component.
         */
        render: function() {
            var canvas, header, startBlock, endBlock;

            // if we not appended to parent do this.
            if (!this._rendered) {
                var parent = this.getParentEl();
                parent.appendChild(this.getEl());
                this._rendered = true;
            }

            // Render 'GameField'.
            canvas = this.getCanvas();
            canvas.render();

            // Render 'Header'.
            header = this.getHeader();
            header.render();

            // Render 'Start game'.
            startBlock = this.getStartBlock();
            startBlock.render();

            // Render 'End game'.
            endBlock = this.getEndBlock();
            endBlock.render();
        },

        /**
         * Reset game settings and rerender.
         */
        reset: function() {
            var canvas, header, startBlock, endBlock;

            // Turn off game.
            this._gameStarted = false;

            // Reset and hide 'Game field'.
            canvas = this.getCanvas();
            canvas.reset();
            canvas.setHidden(true);

            // Show 'Start game'.
            startBlock = this.getStartBlock();
            startBlock.setHidden(false);

            // Hide 'End game'.
            endBlock = this.getEndBlock();
            endBlock.setHidden(true);

            // Reset 'Header' and hide its childes.
            header = this.getHeader();
            header.reset();
            header.hideChildren();
        },

        /**
         * Start game.
         */
        start: function() {
            // сбрасываем игру.
            this.reset();
            // отрисовываем все.
            this.render();
        },

        /**
         * Окончание игры.
         */
        finish: function() {
            var canvas, header, endBlock;

            // Выключаем игру.
            this._gameStarted = false;

            // Сбрасываем игровое поле ипрячем его.
            canvas = this.getCanvas();
            canvas.setHidden(true);

            // Сбрасываем заголовок и прячем дочерние элементы.
            header = this.getHeader();
            header.hideChildren();

            // Показываем финишный блок.
            endBlock = this.getEndBlock();
            endBlock.setHidden(false);
            endBlock.setScore(header.getScore().getValue());

            // Перерисовать.
            this.render();

            // Очищаем "уши".
            clearInterval(this._timerId);
        },

        /**
         * Обработчик клика на шарик.
         * @param {Ball} ball
         * @param {Event} event
         */
        onBallDelete: function(ball, event) {
            if (this._gameStarted) {
                // получаем заголовок.
                var header = this.getHeader();

                // Если упали и шар не был "токсичен".
                if ("drop" === event ) {
                    if (ball.getType() !== "rem_life") {
                        // Минус жизнь.
                        header.addLife(-1);
                    } else {
                        header.addScore(10);
                    }
                } else {
                    // Проверяем тип шара
                    switch (ball.getType()) {
                        case "value_1": // добавляем очки.
                            header.addScore(random(1));
                            break;
                        case "value_2": // добавляем очки.
                            header.addScore(random(2));
                            break;
                        case "value_3": // добавляем очки.
                            header.addScore(random(1, 3));
                            break;
                        case "value_4": // добавляем очки.
                            header.addScore(random(2, 4));
                            break;
                        case "value_5": // добавляем очки.
                            header.addScore(random(3, 5));
                            break;
                        case "add_time": // добавляем время.
                            header.addTime(15);
                            break;
                        case "add_life": // добавляем жизнь, если жизней не 5.
                            if (!header.isLifesEqual(5)) {
                                header.addLife(1);
                            } else {
                                header.addScore(10);
                            }
                            break;
                        case "rem_life": // отбираем жизнь.
                            header.addLife(-1);
                            break;
                    }
                    // header.addScore(random(5));
                }

                if (header.isLifesEqual(0)) {
                    this.finish();
                } else {
                    this.render();
                }
            }
        },

        /**
         * Обработчик кнопки "Старт".
         */
        onStartButtonClick: function() {
            if (!this._gameStarted) {
                var canvas, header, startBlock, endBlock;

                // Запускаем игру.
                this._gameStarted = true;

                // Показываем игровое поле.
                canvas = this.getCanvas();
                canvas.setHidden(false);

                // Показываем счет и жизни.
                header = this.getHeader();
                header.showChildren();

                // Прячем стартовый блок.
                startBlock = this.getStartBlock();
                startBlock.setHidden(true);

                // Прячем финишный блок.
                endBlock = this.getEndBlock();
                endBlock.setHidden(true);

                // Запускаем таймер.
                this._timerId = setInterval(this.onTimer, 1000, this);

                // Перерисовать.
                this.render();

                // Рисуем шарики.
                canvas.createBalls();
            }
        },

        /**
         * Обработчик вызова по таймеру.
         * @param {Game} self - Игра.
         */
        onTimer: function(self) {
            var header = self.getHeader();

            // Уменьшаем счетчик.
            header.addTime(-1);

            // если счетчик = 0.
            if (header.isTimeOut()) {
                self.finish();
            }
        },

        /**
         * Обработчик клавиши рестарт.
         * @param {EndBlock} endPanel - Финишный блок.
         * @param {Event} event - Событие.
         * @param {Game} game - Игровое поле.
         */
        onRestartButtonClick: function(endBlock, event, game) {
            game.reset();
            game.render();
            game.onStartButtonClick();
        }
    };
}
/**
 * Game application
 * @type Game
 */
var game = createGame();
// Init application.
game.init();
// Start application.
game.start();