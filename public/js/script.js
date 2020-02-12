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
 * Объект конфигурации и управления текущим счетом.
 */
function createScore() {
    return {

        // Текусчий счет.
        _value: 0,

        // Флаг отрисовки счета.
        _hidden: false,

        // Сохраненный элемент счета.
        _counterEl: null,

        // ИД блока.
        _id: "stars",

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
            // Создаем блок компонента.
            this._el = document.createElement("div");
            this._el.id = this._id;

            // Создаем элемент счетчика.
            this._counterEl = document.createElement("span");
            this._counterEl.className = "counter";
            this._el.appendChild(this._counterEl);
        },

        /**
         * Получить текущий счет.
         * @return    Значение текущего счета.
         */
        getValue: function() {
            return this._value;
        },

        /**
         * Установить текущий счет.
         * @param value    Значение счета.
         */
        setValue: function(value) {
            this._value = value;
        },

        /**
         * Проверить скрытие объекта.
         * @return     Текущее значание. Если True - то скрыто.
         */
        isHidden: function() {
            return this._hidden;
        },

        /**
         * Задать скрытие объекта.
         * @param value     Флаг скрытия.
         */
        setHidden: function(value) {
            this._hidden = value;
        },

        /**
         * Получить ИД объекта.
         * @return ИД объекта.
         */
        getId: function() {
            return this._id;
        },

        /**
         * Получить ХТМЛ блок объекта.
         * @return ХТМЛ елемент.
         */
        getEl: function() {
            return this._el;
        },

        /**
         * Получить ХТМЛ блок родителя.
         * @return ХТМЛ елемент.
         */
        getParentEl: function() {
            return this._parentEl;
        },

        /**
         * Задать элемент куда будет отрисован компонент.
         * @param htmEl ХТМЛ елемент.
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

            // Отобразить текущий счет.
            this._counterEl.innerText = ("" + this._value);
        }
    };
}
/**
 * Объект конфигурации и управления блоком жизней.
 */
function createLifes() {
    return {
        // Количество жизней.
        _value: 0,

        // Флаг отрисовки.
        _hidden: false,

        // ИД блока.
        _id: "lifes",

        // ХТМЛ элемент компонента.
        _el: null,

        //  ХТМЛ элемент родительского блока.
        _parentEl: null,

        // Флаг отрисовки.
        _rendered: false,

        /**
         * Инициализация приложения.
         */
        init: function() {
            this._el = document.createElement("div");
            this._el.id = this._id;
        },

        /**
         * Получить количество жизней.
         * @return         Текущее кол-во жизней.
         */
        getValue: function() {
            return this._value;
        },

        /**
         * Инициализация приложения.
         * @param value        Количество жизней.
         */
        setValue: function(value) {
            this._value = value;
        },

        /**
         * Проверить скрытие объекта.
         * @return     Текущее значание. Если True - то скрыто.
         */
        isHidden: function() {
            return this._hidden;
        },

        /**
         * Задать скрытие объекта.
         * @param value     Флаг скрытия.
         */
        setHidden: function(value) {
            this._hidden = value;
        },

        /**
         * Получить ИД объекта.
         * @return ИД объекта.
         */
        getId: function() {
            return this._id;
        },

        /**
         * Получить ХТМЛ блок объекта.
         * @return ХТМЛ елемент.
         */
        getEl: function() {
            return this._el;
        },

        /**
         * Получить ХТМЛ блок родителя.
         * @return ХТМЛ елемент.
         */
        getParentEl: function() {
            return this._parentEl;
        },

        /**
         * Задать элемент куда будет отрисован компонент.
         * @param htmEl ХТМЛ елемент.
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

            // Очищаем блок.
            this._el.innerText = "";

            // отрисовывем текущее количество жизней.
            var counter = 0;
            while(counter < this._value) {
                var span = document.createElement("span");
                span.className = "pl";
                this._el.appendChild(span);
                counter++;
            }
        }
    };
}
/**
 * Объект конфигурации и управления таймером.
 */
function createTimer() {
    return {

        // Текущее время.
        _value: 0,

        // Флаг отрисовки таймера.
        _hidden: false,

        // Сохраненный элемент таймера.
        _counterEl: null,

        // ИД блока.
        _id: "timer",

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
            // Создаем блок компонента.
            this._el = document.createElement("div");
            this._el.id = this._id;

            // Создаем элемент таймера.
            this._counterEl = document.createElement("h2");
            this._el.appendChild(this._counterEl);
        },

        /**
         * Получить текущий счет.
         * @return    Значение текущего счета.
         */
        getValue: function() {
            return this._value;
        },

        /**
         * Установить текущий счет.
         * @param value    Значение счета.
         */
        setValue: function(value) {
            this._value = value;
        },

        /**
         * Проверить скрытие объекта.
         * @return     Текущее значание. Если True - то скрыто.
         */
        isHidden: function() {
            return this._hidden;
        },

        /**
         * Задать скрытие объекта.
         * @param value     Флаг скрытия.
         */
        setHidden: function(value) {
            this._hidden = value;
        },

        /**
         * Получить ИД объекта.
         * @return ИД объекта.
         */
        getId: function() {
            return this._id;
        },

        /**
         * Получить ХТМЛ блок объекта.
         * @return ХТМЛ елемент.
         */
        getEl: function() {
            return this._el;
        },

        /**
         * Получить ХТМЛ блок родителя.
         * @return ХТМЛ елемент.
         */
        getParentEl: function() {
            return this._parentEl;
        },

        /**
         * Задать элемент куда будет отрисован компонент.
         * @param htmEl ХТМЛ елемент.
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

            // Отобразить время.
            this._counterEl.innerText = ("Осталось: " + this._value + " сек.");
        }
    };
}
/**
 * Объект конфигурации и управления игровым приложением.
 */
function createHeader() {
    return {
        // Панель счета.
        _score: null,

        // Панель жизней.
        _lifes: null,

        // Таймер.
        _timer: null,

        // Максимальный счет.
        _maxScore: 15,

        // Флаг отрисовки шарика.
        _hidden: false,

        // ИД блока.
        _id: "header",

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

            // Получаем и инициируем счет.
            this._score = createScore();
            this.initScore();

            // Получаем и инициируем жизни.
            this._lifes = createLifes();
            this.initLifes();

            // Получаем и инициализируем таймер.
            this._timer = createTimer();
            this.initTimer();
        },

        /**
         * Инициализация счета.
         */
        initScore: function() {
            var score = this.getScore();
            score.renderTo(this.getEl());
            score.init();
        },

        /**
         * Инициализация жизней.
         */
        initLifes: function() {
            var lifes = this.getLifes();
            lifes.renderTo(this.getEl());
            lifes.init();
        },

        /**
         * Инициализация таймера.
         */
        initTimer: function() {
            var timer = this.getTimer();
            timer.renderTo(this.getEl());
            timer.init();
        },

        /**
         * Получить панель счета.
         * @returns {Score} - Панель счета.
         */
        getScore: function() {
            return this._score;
        },

        /**
         * Получить панель жизней.
         * @returns {Lifes} - Панель жизней.
         */
        getLifes: function() {
            return this._lifes;
        },

        /**
         * Получить панель жизней.
         * @returns {Timer} - Панель жизней.
         */
        getTimer: function() {
            return this._timer;
        },

        /**
         * Проверить скрытие объекта.
         * @returns {Boolean} - Текущее значание. Если True - то скрыто
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
            var score, lifes, timer;

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

            // Отрисовать счет.
            score = this.getScore();
            score.render();

            // Отрисовать жизни.
            lifes = this.getLifes();
            lifes.render();

            // Отрисовать таймер.
            timer = this.getTimer();
            timer.render();
        },

        /**
         * Сбрасывем настройки.
         */
        reset: function() {
            var score, lifes, timer;

            // Устанавливаем значение счета по умолчанию.
            score = this.getScore();
            score.setValue(0);

            // Устанавливаем значение жизней по умолчанию.
            lifes = this.getLifes();
            lifes.setValue(defaultLifes);

            // Устанавливаем таймер.
            timer = this.getTimer();
            timer.setValue(defaultTimer);
        },

        /**
         * Скрыть дочерние элементы.
         */
        hideChildren: function() {
            var score, lifes, timer;

            // Скрываем счет.
            score = this.getScore();
            score.setHidden(true);

            // Скрываем жизни.
            lifes = this.getLifes();
            lifes.setHidden(true);

            // Скріваем таймер.
            timer = this.getTimer();
            timer.setHidden(true);
        },

        /**
         * Показать дочерние элементы.
         */
        showChildren: function() {
            var score, lifes;

            // Отображаем счет.
            score = this.getScore();
            score.setHidden(false);

            // Отображаем жизни.
            lifes = this.getLifes();
            lifes.setHidden(false);

            // Отображаем таймер.
            timer = this.getTimer();
            timer.setHidden(false);
        },

        /**
         * Увеличить счет.
         * @param {Number} value - Значение.
         */
        addScore: function(value) {
            var score, scoreValue;

            // Получаем счет.
            score = this.getScore();

            // Увеличиваем значение счета.
            scoreValue = score.getValue();
            score.setValue(scoreValue + value);
        },

        /**
         * Проверяем, достигли ли максимума.
         * @return Результат проверки.
         */
        isMaxScore: function() {
            return this._score.getValue() >= this._maxScore;
        },

        /**
         * Добавить жизни.
         * @param {Number} value - Значение.
         */
        addLife: function(value) {
            var lifes, lifesValue;

            // Получаем счет.
            lifes = this.getLifes();

            // Увеличиваем значение счета.
            lifesValue = lifes.getValue();
            lifes.setValue(lifesValue + value);
        },

        /**
         * Проверка на количество жизней.
         * @param {Number} value - значение.
         * @returns {Boolean} - Результат операции.
         */
        isLifesEqual: function(value){
            return this._lifes.getValue() === value;
        },

        /**
         * Вычитаем значение из таймера.
         * @param {Number} value - Значение.
         */
        addTime: function(value) {
            var timer, timeValue;

            // Получаем таймер.
            timer = this.getTimer();

            // добавляем значение
            timeValue = timer.getValue();
            timer.setValue(timeValue + value);

            // перерисовываем.
            timer.render();
        },

        /**
         * Проверяем, закончилось ли время.
         * @returns {Boolean} - Результат проверки.
         */
        isTimeOut: function() {
            var time = this.getTimer();
            return (0 === time.getValue());
        },

        /**
         * Вывести в лог состояние счета.
         */
        logScore: function() {
            // Получаем объект счета и выводим его текущее значяение.
            var score = this.getScore();
            console.log("Текущий счет : " + score.getValue());
        }
    };
}
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
/**
 * Объект конфигурации и управления стартовым блоком.
 */
function createStartBlock() {
    return {

        // Флаг отрисовки шарика.
        _hidden: false,

        // Сохраненная кнопка.
        _buttonEl: null,

        // ИД блока.
        _id: "start-block",

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
            // Создаем блок компонента.
            this._el = document.createElement("div");
            this._el.id =  this._id;

            // Создаем кнопку
            this._buttonEl = document.createElement("button");
            this._buttonEl.id = "start-game";
            this._buttonEl.innerText = "НАЧАТЬ ИГРУ";

            // Добавляем кнопочку на компонент.
            this._el.appendChild(this._buttonEl);

            // Сохраняем ссылку на себя.
            var self = this;

            // Устанавливаем обработчик для кнопки.
            self._buttonEl.onclick = function(event) {
                self.onStartButtonClick(event);
            }
        },

        /**
         * Проверить скрытие объекта.
         * @return     Текущее значание. Если True - то скрыто.
         */
        isHidden: function() {
            return this._hidden;
        },

        /**
         * Задать скрытие объекта.
         * @param value     Флаг скрытия.
         */
        setHidden: function(value) {
            this._hidden = value;
        },

        /**
         * Получить ИД объекта.
         * @return ИД объекта.
         */
        getId: function() {
            return this._id;
        },

        /**
         * Получить ХТМЛ блок объекта.
         * @return ХТМЛ елемент.
         */
        getEl: function() {
            return this._el;
        },

        /**
         * Получить ХТМЛ блок родителя.
         * @return ХТМЛ елемент.
         */
        getParentEl: function() {
            return this._parentEl;
        },

        /**
         * Задать элемент куда будет отрисован компонент.
         * @param htmEl ХТМЛ елемент.
         */
        renderTo: function(htmlEl) {
            this._parentEl = htmlEl;
        },

        /**
         * Обработчик нажатия кнопки.
         */
        onStartButtonClick: function() {},

        /**
         * Отрисовать объект.
         */
        render: function() {
            // Не даем удалать удаленный компонент и наоборот.
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
        }
    };
}
/**
 * Объект конфигурации и управления стартовым блоком.
 * @returns {EndBlock}
 */
function createEndBlock() {
    return {

        // Флаг отрисовки шарика.
        _hidden: false,

        // Сохраненная кнопка.
        _buttonEl: null,

        // Сохраненный счет
        _score: 0,

        // Элемент отображения счета.
        _scoreEl: null,

        // ИД блока.
        _id: "end-block",

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
            // Создаем блок компонента.
            this._el = createEl("div", this.getId());

            // Создать и добавить заголовок поля.
            var h3el = createEl("h3");
            h3el.innerText = "Игра окончена!";
            this._el.appendChild(h3el);

            // Создать и добавить поле для счета.
            this._scoreEl = createEl("p");
            this._el.appendChild(this._scoreEl);

            // Создаем и добавляем кнопку рестарта.
            this._buttonEl = createEl("button");
            this._buttonEl.innerText = "НАЧАТЬ ЗАНОВО";
            this._el.appendChild(this._buttonEl);

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
         * Задать счет.
         * @param {Number} value - Счет игры.
         */
        setScore: function(value) {
            this._score = value;
        },

        /**
         * Обработчик на нажатие.
         * @param {Function} func - Обработчик.
         * @param {Object} scope - Окружение исполнения.
         */
        onButtonClick: function(func, scope) {
            var self = this;
            self._buttonEl.onclick = function(event) {
                func(self, event, scope);
            };
        },

        /**
         * Отрисовать объект.
         */
        render: function() {
            // Не даем удалать удаленный компонент и наоборот.
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

            // отрисовываем счет игры.
            this._scoreEl.innerText = "Количество очков: " + this._score;
        }
    };
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