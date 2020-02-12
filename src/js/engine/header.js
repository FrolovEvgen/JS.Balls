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