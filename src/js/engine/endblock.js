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