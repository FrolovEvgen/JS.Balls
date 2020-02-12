/**
 * Объект конфигурации и управления шариком.
 * @returns {Ball}
 */
function createBall() {
    return {
        // Геометрия объекта.
        _geometry: {
            x: null,
            y: null,
            width: null,
            height: null
        },

        // Флаг отрисовки шарика.
        _hidden: false,

        // Тип шарика:
        //  "value_1" - добавляет очков 0..1;
        //  "value_2" - добавляет очков 0..2;
        //  "value_3" - добавляет очков 1..3;
        //  "value_4" - добавляет очков 2..4;
        //  "value_5" - добавляет очков 3..5;
        //  "add_life" - добавляет жизнь.
        //  "rem_life" - отнимает жизнь.
        //  "add_time" - добавляет время +10.
        _type: null,

        // ИД блока.
        _id: null,

        // ХТМЛ элемент компонента.
        _el: null,

        //  ХТМЛ элемент родительского блока.
        _parentEl: null,

        // Флаг отрисовки.
        _rendered: false,

        // Флаг удаляемости.
        _deleting: false,

        // Сохраняем таймер.
        _timerId: null,

        /**
         * Инициализация объекта.
         * @param {BallConfig} config - конфигурация шарика.
         */
        init: function(config) {
            // Получаем элемент.
            this._el = createEl("div", config.id);
            this._id = config.id;

            // Добавляем стили.
            this._el.classList.add("ball");
            this._el.classList.add(config.className);
            this._el.classList.add(config.type);

            // устанавливаем цвет.
            this.setColor(config.color);

            // Устанавливаем тип шарика.
            this.setType(config.type);
        },

        /**
         * Получить ширину объекта.
         * @returns {Number} - Текущее значение ширины.
         */
        getWidth: function() {
            return this._geometry.width;
        },

        /**
         * Задать ширину объекта.
         * @param {Number} value - Новое значение ширины.
         */
        setWidth: function(value) {
            this._geometry.width = value;
        },

        /**
         * Получить высоту объекта.
         * @returns {Number} - Текущее значение высоты.
         */
        getHeight: function() {
            return this._geometry.height;
        },

        /**
         * Получить высоту объекта.
         * @param {Number} value - Новая высота.
         */
        setHeight: function(value) {
            this._geometry.height = value;
        },

        /**
         * Получить текущую позицию объекта.
         * @returns {Position} - Текущая позиция X/Y.
         */
        getPositionXY: function() {
            return {
                x: this._geometry.x,
                y: this._geometry.y
            };
        },

        /**
         * Задать позицию объекта.
         * @param {Number} x - Новая позиция X.
         * @param {Number} y - Новая позиция Y.
         */
        setPositionXY: function(x, y) {
            this._geometry.x = x;
            this._geometry.y = y;
        },

        /**
         * Получить цвет объекта.
         * @returns {String} - Текущий цвет.
         */
        getColor: function() {
            return this._color;
        },

        /**
         * Задать цвет объекта.
         * @param {String} value - Новый цвет.
         */
        setColor: function(value) {
            this._color = value;
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
         * Проверить скрытие объекта.
         * @returns {Boolean} - Текущее значание. Если True - то скрыто.
         */
        isDeleting: function() {
            return this._deleting;
        },

        /**
         * Задать скрытие объекта.
         * @param {Boolean} value - Флаг скрытия.
         */
        setDeleting: function(value) {
            this._deleting = value;
        },

        /**
         * Задать тип шарика.
         * @param {String} value - Тип шарика.
         */
        setType: function(value) {
            this._type = value;
        },

        /**
         * Получить тип шарика.
         * @returns {String} - Тип шарика.
         */
        getType: function() {
            return this._type;
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
         * Задать выполнение обработчика по таймауту.
         * @param {Function} func - Обработчик.
         * @param {Number} time - период задержки.
         * @param {Object} scope - Окружение исполнения.
         */
        setTimeout: function (func, time, scope) {
            this._timerId = setTimeout(this.onTimeout, time, func, this, scope);
        },

        /**
         * Обработчик по таймауту.
         * @param {Function} func - Обработчик.
         * @param {Ball} self - Ссылка на себя.
         * @param {Object} scope - Окружение исполнения.
         */
        onTimeout: function(func, self, scope) {
            clearTimeout(scope._timerId);
            func(self, scope);
        },

        /**
         * Обработчик на нажатие.
         * @param {Function} func - Обработчик.
         * @param {Object} scope - Окружение исполнения.
         */
        onClick: function(func, scope) {
            var self = this;
            self._el.onclick = function(event) {
                func(self, event, scope);
            };
        },

        /**
         * Обработчик на наведение мыши.
         * @param {Function} func - Обработчик.
         * @param {Object} scope - Окружение исполнения.
         */
        onMouseOver: function(func, scope) {
            // Задаем обработчик элемента на клик.
            var self = this;
            self._el.onmouseover = function(event) {
                func(self, event, scope);
            };
        },

        /**
         * Отрисовать объект.
         */
        render: function() {
            // Локальные переменные.
            var width, height, x, y, posXY, style;

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

            style = this._el.style;

            // Изменяем ширину если надо.
            width = this.getWidth();
            if (null !== width) {
                style.width = width + "px";
            }

            // Изменяем высоту если надо.
            height = this.getHeight();
            if (null !== height) {
                style.height = height + "px";
            }

            // Получаем текущую позицию.
            posXY = this.getPositionXY();

            // Изменяем положение по вертикали.
            if (null !== posXY.y && null !== height) {
                y = Math.round(posXY.y - (height / 2));
                style.top = y + "px";
            }

            // Изменяем положение по горизонтали.
            if (null !== posXY.x && null !== width) {
                x = Math.round(posXY.x - (width / 2));
                style.left = x + "px";
            }

            // Изменяем цвет.
            style.backgroundColor = this.getColor();
        },

        /**
         * Опускает шарик по высоте.
         */
        dropDown: function() {
            // Получаем текущую позицию.
            var posXY = this.getPositionXY();
            // Изменяем позицию
            this.setPositionXY(posXY.x, posXY.y + 1);
            // Рисуем.
            this.render();
        }
    };
}